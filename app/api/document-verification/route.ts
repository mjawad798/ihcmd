import { NextRequest, NextResponse } from "next/server";
import { Op, fn, col, where as sequelizeWhere } from "sequelize";
import VerificationDetail from "@/models/VerificationDetail";
import VerificationMaster from "@/models/VerificationMaster";

// Public, unauthenticated lookup for the "Document Verification" page —
// anyone with a certificate can check it against our records. Matching is
// case-insensitive on the serial number (real-world typing/OCR variance)
// but still scoped to an exact masterId + serialNumber pair, so it never
// returns anything beyond the single matching record.
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const masterId = searchParams.get("masterId");
    const serialNumber = searchParams.get("serialNumber")?.trim();

    if (!masterId || !serialNumber) {
        return NextResponse.json({ error: "Record type and serial number are required." }, { status: 400 });
    }

    const detail = await VerificationDetail.findOne({
        where: {
            [Op.and]: [
                { verificationMasterId: Number(masterId) },
                sequelizeWhere(fn("LOWER", col("serial_number")), serialNumber.toLowerCase()),
            ],
        },
        include: [{ model: VerificationMaster, as: "master", attributes: ["id", "name"] }],
    });

    if (!detail) {
        return NextResponse.json({ found: false });
    }

    return NextResponse.json({ found: true, detail });
}
