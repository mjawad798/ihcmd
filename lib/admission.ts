export const PROGRAM_LEVELS = ["Certificate", "Diploma", "BS", "Other"] as const;
export const STUDY_MODES = ["On-Campus", "Online", "Hybrid"] as const;
export const GENDERS = ["Male", "Female"] as const;

export const INSTITUTE_NAME = "INSTITUTE OF HEALTH CARE MANAGEMENT & NURSING SCIENCES (IHCMNS)";
export const MAX_QUALIFICATIONS = 8;

// Program Level is not asked on the form; it is derived from the program's type.
export const LEVEL_BY_PROGRAM_TYPE: Record<string, (typeof PROGRAM_LEVELS)[number]> = {
    "Undergraduate Programs": "BS",
    "Postgraduate Diplomas": "Diploma",
    "Certificate Programs": "Certificate",
    "F.Sc Medical Technologies": "Other",
};

export type QualificationInput = {
    qualification: string;
    boardUniversity: string;
    rollNo: string;
    passingYear: string;
    totalMarks: string;
    obtainedMarks: string;
};

export type ApplicationInput = {
    programId: number;
    fullName: string;
    fatherName: string;
    dateOfBirth: string;
    gender: (typeof GENDERS)[number];
    cnic: string;
    contactNo: string;
    email: string; // optional; "" when not given
    postalAddress: string;
    mode: (typeof STUDY_MODES)[number];
    qualifications: QualificationInput[];
};

// Field-level errors. Top-level keys match the form field names; qualification
// rows use "q.<index>.<field>".
export type FieldErrors = Record<string, string>;

export const normalizeCnic = (v: string) => v.replace(/\D/g, "");
export const formatCnic = (digits: string) =>
    digits.length === 13 ? `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}` : digits;

// yyyy-MM-dd (or an ISO timestamp) -> dd-MM-yyyy
export const formatDate = (iso: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : iso;
};

// dd-MM-yyyy -> yyyy-MM-dd. Anything that isn't a complete date is returned
// unchanged so validation reports it as invalid (or required when empty).
export const displayDateToIso = (v: string) => {
    const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(v.trim());
    return m ? `${m[3]}-${m[2]}-${m[1]}` : v.trim();
};

export const digitsOnly = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);
// Types digits and inserts the hyphens: 11112000 -> 11-11-2000
export const maskDate = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return [d.slice(0, 2), d.slice(2, 4), d.slice(4)].filter(Boolean).join("-");
};
export const decimalOnly = (v: string) => v.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 8);

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const NUMBER_RE = /^\d+(\.\d+)?$/;

// Used by both the browser (inline feedback) and the API (the real check).
// Returns the cleaned input, or a map of field errors.
export function validateApplication(
    raw: Record<string, unknown>
): { data: ApplicationInput } | { errors: FieldErrors } {
    const data: ApplicationInput = {
        programId: Number(raw.programId),
        fullName: str(raw.fullName, 150).replace(/\s+/g, " "),
        fatherName: str(raw.fatherName, 150).replace(/\s+/g, " "),
        dateOfBirth: str(raw.dateOfBirth, 10),
        gender: str(raw.gender, 10) as ApplicationInput["gender"],
        cnic: str(raw.cnic, 20),
        contactNo: str(raw.contactNo, 20),
        email: str(raw.email, 150).toLowerCase(),
        postalAddress: str(raw.postalAddress, 500),
        mode: str(raw.mode, 20) as ApplicationInput["mode"],
        qualifications: [],
    };
    const errors: FieldErrors = {};

    if (!Number.isInteger(data.programId) || data.programId <= 0) errors.programId = "Please select a program.";

    if (!data.fullName) errors.fullName = "Full name is required.";
    else if (data.fullName.length < 3) errors.fullName = "Please enter your full name.";

    if (!data.fatherName) errors.fatherName = "Father / guardian name is required.";
    else if (data.fatherName.length < 3) errors.fatherName = "Please enter the father / guardian name.";

    const dob = new Date(data.dateOfBirth);
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
    else if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.dateOfBirth) ||
        isNaN(dob.getTime()) ||
        dob.toISOString().slice(0, 10) !== data.dateOfBirth || // rejects e.g. 31-02-2000
        dob >= new Date() ||
        dob.getFullYear() < 1950
    ) {
        errors.dateOfBirth = "Please enter a valid date of birth.";
    }

    if (!(GENDERS as readonly string[]).includes(data.gender)) errors.gender = "Please select a gender.";

    if (!data.cnic) errors.cnic = "CNIC / B-Form No. is required.";
    else if (!/^\d{13}$/.test(data.cnic)) {
        errors.cnic = "CNIC / B-Form No. must be exactly 13 digits (numbers only, no dashes).";
    }

    if (!data.contactNo) errors.contactNo = "Contact number is required.";
    else if (!/^\d+$/.test(data.contactNo)) errors.contactNo = "Contact number must contain digits only.";
    else if (!/^03\d{9}$/.test(data.contactNo)) {
        errors.contactNo = "Enter an 11-digit mobile number starting with 03, e.g. 03001234567.";
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!data.postalAddress) errors.postalAddress = "Postal address is required.";
    else if (data.postalAddress.length < 10) errors.postalAddress = "Please enter your complete postal address.";

    if (!(STUDY_MODES as readonly string[]).includes(data.mode)) errors.mode = "Please select a mode of study.";

    const rows = (Array.isArray(raw.qualifications)
        ? raw.qualifications.slice(0, MAX_QUALIFICATIONS)
        : []) as Record<string, unknown>[];
    if (rows.length === 0) errors.qualifications = "Please add at least one qualification.";

    rows.forEach((r, i) => {
        const q: QualificationInput = {
            qualification: str(r.qualification, 100),
            boardUniversity: str(r.boardUniversity, 150),
            rollNo: str(r.rollNo, 40),
            passingYear: str(r.passingYear, 10),
            totalMarks: str(r.totalMarks, 10),
            obtainedMarks: str(r.obtainedMarks, 10),
        };
        const err = (k: keyof QualificationInput, msg: string) => (errors[`q.${i}.${k}`] = msg);

        (Object.keys(q) as (keyof QualificationInput)[]).forEach((k) => {
            if (!q[k]) err(k, "Required.");
        });

        if (q.passingYear) {
            const y = Number(q.passingYear);
            if (!/^\d{4}$/.test(q.passingYear) || y < 1950 || y > new Date().getFullYear()) err("passingYear", "Invalid year.");
        }
        if (q.totalMarks) {
            if (!NUMBER_RE.test(q.totalMarks)) err("totalMarks", "Numbers only.");
            else if (Number(q.totalMarks) <= 0) err("totalMarks", "Must be above 0.");
        }
        if (q.obtainedMarks) {
            if (!NUMBER_RE.test(q.obtainedMarks)) err("obtainedMarks", "Numbers only.");
            else if (!errors[`q.${i}.totalMarks`] && q.totalMarks && Number(q.obtainedMarks) > Number(q.totalMarks)) {
                err("obtainedMarks", "Cannot exceed total.");
            }
        }
        data.qualifications.push(q);
    });

    return Object.keys(errors).length ? { errors } : { data };
}
