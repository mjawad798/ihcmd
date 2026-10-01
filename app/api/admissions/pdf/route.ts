import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import AdmissionApplication, { AdmissionQualification } from "@/models/AdmissionApplication";
import AdmissionSession from "@/models/AdmissionSession";
import AcademicProgram from "@/models/AcademicProgram";
import { INSTITUTE_NAME, formatCnic, formatDate, normalizeCnic } from "@/lib/admission";
import { isValidApplicationToken } from "@/lib/admissionToken";
import { requireApiPermission } from "@/lib/permissions";

// Public download of a submitted application. Authorised either by the token
// issued at submission time, or by application number + CNIC (so applicants
// who closed the page can fetch it again). Never returns anyone else's form.
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const no = searchParams.get("no")?.trim() ?? "";
    const token = searchParams.get("token") ?? "";
    const cnic = normalizeCnic(searchParams.get("cnic") ?? "");

    const application = no
        ? await AdmissionApplication.findOne({
              where: { applicationNo: no },
              include: [
                  { model: AdmissionQualification, as: "qualifications" },
                  { model: AdmissionSession, as: "session" },
                  { model: AcademicProgram, as: "program" },
              ],
          })
        : null;

    // Staff with view permission on admissions may download any application.
    const isStaff = application ? !(await requireApiPermission("admissions", "view")).error : false;
    const authorised =
        application &&
        (isStaff || (token && isValidApplicationToken(no, token)) || (cnic && cnic === application.cnic));
    if (!application || !authorised) {
        return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    const session = application.get("session") as AdmissionSession;
    const program = application.get("program") as AcademicProgram;
    const quals = (application.get("qualifications") as AdmissionQualification[]) ?? [];

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const page = pdf.addPage([595.28, 841.89]);
    const navy = rgb(0.06, 0.15, 0.3);
    const grey = rgb(0.45, 0.45, 0.45);
    const M = 40;
    const W = 595.28 - M * 2;
    let y = 841.89 - 45;

    // Standard PDF fonts only cover Latin-1; replace anything else.
    const safe = (t: string) => t.replace(/[^\x20-\x7E\xA0-\xFF]/g, "?");

    const text = (p: PDFPage, t: string, x: number, yy: number, size: number, f: PDFFont, color = rgb(0, 0, 0)) =>
        p.drawText(safe(t), { x, y: yy, size, font: f, color });

    const centered = (t: string, size: number, f: PDFFont, color = navy) => {
        const w = f.widthOfTextAtSize(safe(t), size);
        text(page, t, (595.28 - w) / 2, y, size, f, color);
        y -= size + 6;
    };

    const wrap = (t: string, f: PDFFont, size: number, maxW: number): string[] => {
        const lines: string[] = [];
        for (const para of safe(t).split(/\r?\n/)) {
            let line = "";
            for (const word of para.split(/\s+/)) {
                const next = line ? `${line} ${word}` : word;
                if (f.widthOfTextAtSize(next, size) > maxW && line) {
                    lines.push(line);
                    line = word;
                } else line = next;
            }
            lines.push(line);
        }
        return lines;
    };

    const section = (title: string) => {
        y -= 10;
        page.drawRectangle({ x: M, y: y - 4, width: W, height: 18, color: navy });
        text(page, title, M + 8, y + 1, 10.5, bold, rgb(1, 1, 1));
        y -= 24;
    };

    const row = (pairs: [string, string][]) => {
        const colW = W / pairs.length;
        let rowH = 0;
        pairs.forEach(([label, value], i) => {
            const x = M + i * colW;
            text(page, label, x, y, 8, font, grey);
            const lines = wrap(value || "-", bold, 10, colW - 12);
            lines.forEach((l, li) => text(page, l, x, y - 13 - li * 12, 10, bold));
            rowH = Math.max(rowH, 13 + lines.length * 12);
        });
        y -= rowH + 6;
    };

    centered(INSTITUTE_NAME, 12, bold);
    centered("Student Admission Form", 15, bold);
    centered(`Session: ${session.sessionName}`, 10, font, grey);
    y -= 22; // keep the application-number box clear of the session line

    page.drawRectangle({ x: M, y: y - 8, width: W, height: 30, borderColor: navy, borderWidth: 1 });
    text(page, "Application No.", M + 10, y + 6, 8, font, grey);
    text(page, application.applicationNo, M + 10, y - 5, 13, bold, navy);
    const submitted = `Submitted: ${formatDate(application.createdAt.toISOString())}`;
    text(page, submitted, M + W - 10 - font.widthOfTextAtSize(submitted, 9), y - 1, 9, font, grey);
    y -= 34;

    section("1. STUDENT INFORMATION");
    row([["Full Name", application.fullName], ["Father / Guardian Name", application.fatherName]]);
    row([["Date of Birth", formatDate(application.dateOfBirth)], ["Gender", application.gender], ["CNIC / B-Form No.", formatCnic(application.cnic)]]);
    row([["WhatsApp / Contact No.", application.contactNo], ["Email", application.email ?? ""]]);
    row([["Postal Address", application.postalAddress]]);

    section("2. PROGRAM INFORMATION");
    row([["Program Applied For", program?.name ?? "-"]]);
    row([["Program Level", application.programLevel], ["Mode", application.mode]]);

    section("3. ACADEMIC INFORMATION");
    const cols: [string, number][] = [["Qualification", 0.17], ["Board / University", 0.27], ["Roll No.", 0.14], ["Year", 0.1], ["Total", 0.14], ["Obtained", 0.18]];
    let x = M;
    cols.forEach(([h, f]) => {
        text(page, h, x + 3, y, 8.5, bold, grey);
        x += W * f;
    });
    y -= 6;
    page.drawLine({ start: { x: M, y }, end: { x: M + W, y }, thickness: 0.7, color: navy });
    y -= 13;
    for (const q of quals) {
        const vals = [q.qualification, q.boardUniversity, q.rollNo, q.passingYear, q.totalMarks, q.obtainedMarks];
        let rowH = 12;
        x = M;
        vals.forEach((v, i) => {
            const lines = wrap(v, font, 9, W * cols[i][1] - 6);
            lines.forEach((l, li) => text(page, l, x + 3, y - li * 11, 9, font));
            rowH = Math.max(rowH, lines.length * 11 + 2);
            x += W * cols[i][1];
        });
        y -= rowH + 2;
    }

    section("DECLARATION");
    wrap(
        "I declare that the information given above is correct and complete to the best of my knowledge. I understand that any false information may result in cancellation of my admission.",
        font, 9.5, W
    ).forEach((l) => {
        text(page, l, M, y, 9.5, font);
        y -= 12;
    });
    y -= 34;
    page.drawLine({ start: { x: M, y }, end: { x: M + 160, y }, thickness: 0.6, color: grey });
    page.drawLine({ start: { x: M + W - 120, y }, end: { x: M + W, y }, thickness: 0.6, color: grey });
    text(page, "Applicant's Signature", M, y - 11, 8, font, grey);
    text(page, "Date", M + W - 120, y - 11, 8, font, grey);

    const bytes = await pdf.save();
    return new NextResponse(Buffer.from(bytes), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${application.applicationNo}.pdf"`,
            "Cache-Control": "no-store",
        },
    });
}
