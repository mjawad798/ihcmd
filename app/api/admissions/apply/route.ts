import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "sequelize";
import sequelize from "@/lib/sequelize";
import AdmissionSession from "@/models/AdmissionSession";
import AcademicProgram from "@/models/AcademicProgram";
import AdmissionApplication, { AdmissionQualification } from "@/models/AdmissionApplication";
import { LEVEL_BY_PROGRAM_TYPE, validateApplication } from "@/lib/admission";
import { applicationToken } from "@/lib/admissionToken";

// Best-effort per-IP throttle (in-memory, per server process): enough to blunt
// casual form spam; the unique (session, CNIC) key is the real duplicate guard.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

class ApplyError extends Error {
    constructor(message: string, public status: number) {
        super(message);
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: real users never fill this hidden field.
    if (body.website) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const result = validateApplication(body);
    if ("errors" in result) {
        return NextResponse.json(
            { error: "Please correct the highlighted fields.", errors: result.errors },
            { status: 400 }
        );
    }
    const input = result.data;

    try {
        const application = await sequelize.transaction(async (transaction) => {
            // Lock the active session row so serial numbers can't collide.
            const session = await AdmissionSession.findOne({
                where: { isActive: true },
                transaction,
                lock: Transaction.LOCK.UPDATE,
            });
            if (!session || !session.isOpenForAdmission) {
                throw new ApplyError("Admissions are currently closed.", 409);
            }

            const program = await AcademicProgram.findOne({
                where: { id: input.programId, isOpenForAdmission: true },
                transaction,
            });
            if (!program) throw new ApplyError("The selected program is not open for admission.", 400);

            const duplicate = await AdmissionApplication.findOne({
                where: { sessionId: session.id, cnic: input.cnic },
                transaction,
            });
            if (duplicate) {
                throw new ApplyError(
                    `An application with this CNIC / B-Form No. already exists for ${session.sessionName} (Application No. ${duplicate.applicationNo}).`,
                    409
                );
            }

            const serial = session.lastSerial + 1;
            await session.update({ lastSerial: serial }, { transaction });
            const applicationNo = `IHCMNS-${session.code}-${String(serial).padStart(4, "0")}`;

            const { qualifications, ...fields } = input;
            const created = await AdmissionApplication.create(
                {
                    ...fields,
                    email: fields.email || null,
                    programLevel: LEVEL_BY_PROGRAM_TYPE[program.type] ?? "Other",
                    applicationNo,
                    sessionId: session.id,
                },
                { transaction }
            );
            await AdmissionQualification.bulkCreate(
                qualifications.map((q) => ({ ...q, applicationId: created.id })),
                { transaction }
            );
            return created;
        });

        return NextResponse.json(
            {
                applicationNo: application.applicationNo,
                token: applicationToken(application.applicationNo),
            },
            { status: 201 }
        );
    } catch (err) {
        if (err instanceof ApplyError) return NextResponse.json({ error: err.message }, { status: err.status });
        console.error("Admission apply failed:", err);
        return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 });
    }
}
