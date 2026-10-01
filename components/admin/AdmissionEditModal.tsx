"use client";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
    GENDERS,
    MAX_QUALIFICATIONS,
    STUDY_MODES,
    decimalOnly,
    digitsOnly,
    displayDateToIso,
    formatDate,
    maskDate,
    validateApplication,
    type FieldErrors,
    type QualificationInput,
} from "@/lib/admission";

export type EditableApplication = {
    id: number;
    applicationNo: string;
    fullName: string;
    fatherName: string;
    dateOfBirth: string;
    gender: string;
    cnic: string;
    contactNo: string;
    email: string | null;
    postalAddress: string;
    mode: string;
    program: { id: number; name: string };
    qualifications: (QualificationInput & { id: number })[];
};

export type ProgramOption = { id: number; name: string; type: string; isOpenForAdmission: boolean };

const inputCls = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 ${
        hasError ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-gold-400"
    }`;

function Field({
    label,
    error,
    children,
    className = "",
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
            {children}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}

const emptyQual: QualificationInput = {
    qualification: "",
    boardUniversity: "",
    rollNo: "",
    passingYear: "",
    totalMarks: "",
    obtainedMarks: "",
};

export default function AdmissionEditModal({
    application,
    programs,
    onClose,
    onSaved,
}: {
    application: EditableApplication;
    programs: ProgramOption[];
    onClose: () => void;
    onSaved: () => void;
}) {
    const [form, setForm] = useState({
        fullName: application.fullName,
        fatherName: application.fatherName,
        dateOfBirth: formatDate(application.dateOfBirth),
        gender: application.gender,
        cnic: application.cnic,
        contactNo: application.contactNo,
        email: application.email ?? "",
        postalAddress: application.postalAddress,
        programId: String(application.program.id),
        mode: application.mode,
    });
    const [quals, setQuals] = useState<QualificationInput[]>(
        application.qualifications.length
            ? application.qualifications.map((q) => ({
                  qualification: q.qualification,
                  boardUniversity: q.boardUniversity,
                  rollNo: q.rollNo,
                  passingYear: q.passingYear,
                  totalMarks: q.totalMarks,
                  obtainedMarks: q.obtainedMarks,
              }))
            : [{ ...emptyQual }]
    );
    const [tried, setTried] = useState(false);
    const [serverErrors, setServerErrors] = useState<FieldErrors>({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const payload = { ...form, dateOfBirth: displayDateToIso(form.dateOfBirth), qualifications: quals };
    const checked = validateApplication(payload);
    const clientErrors: FieldErrors = "errors" in checked ? checked.errors : {};
    const errors: FieldErrors = tried ? { ...serverErrors, ...clientErrors } : {};

    const set =
        (k: keyof typeof form, transform?: (v: string) => string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((f) => ({ ...f, [k]: transform ? transform(e.target.value) : e.target.value }));
            setServerErrors({});
        };

    const setQual = (i: number, k: keyof QualificationInput, v: string) =>
        setQuals((qs) => qs.map((q, idx) => (idx === i ? { ...q, [k]: v } : q)));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setTried(true);
        if (Object.keys(clientErrors).length > 0) {
            setError("Please correct the highlighted fields.");
            return;
        }

        setSaving(true);
        const res = await fetch(`/api/admissions/${application.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        setSaving(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setServerErrors(data.errors ?? {});
            setError(data.error || "Could not save changes.");
            return;
        }
        onSaved();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="font-bold text-navy-900">
                        Edit Application <span className="font-mono">{application.applicationNo}</span>
                    </h2>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5" noValidate>
                    {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Program Applied For" error={errors.programId} className="md:col-span-2">
                            <select className={inputCls(!!errors.programId)} value={form.programId} onChange={set("programId")}>
                                {programs.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                        {p.isOpenForAdmission ? "" : " (closed)"}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Full Name" error={errors.fullName}>
                            <input className={inputCls(!!errors.fullName)} value={form.fullName} onChange={set("fullName")} />
                        </Field>
                        <Field label="Father / Guardian Name" error={errors.fatherName}>
                            <input className={inputCls(!!errors.fatherName)} value={form.fatherName} onChange={set("fatherName")} />
                        </Field>
                        <Field label="Date of Birth (dd-mm-yyyy)" error={errors.dateOfBirth}>
                            <input
                                className={inputCls(!!errors.dateOfBirth)}
                                inputMode="numeric"
                                maxLength={10}
                                value={form.dateOfBirth}
                                onChange={set("dateOfBirth", maskDate)}
                            />
                        </Field>
                        <Field label="Gender" error={errors.gender}>
                            <select className={inputCls(!!errors.gender)} value={form.gender} onChange={set("gender")}>
                                <option value="">Select</option>
                                {GENDERS.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="CNIC / B-Form No. (13 digits)" error={errors.cnic}>
                            <input
                                className={inputCls(!!errors.cnic)}
                                inputMode="numeric"
                                value={form.cnic}
                                onChange={set("cnic", (v) => digitsOnly(v, 13))}
                            />
                        </Field>
                        <Field label="WhatsApp / Contact No." error={errors.contactNo}>
                            <input
                                className={inputCls(!!errors.contactNo)}
                                inputMode="numeric"
                                value={form.contactNo}
                                onChange={set("contactNo", (v) => digitsOnly(v, 11))}
                            />
                        </Field>
                        <Field label="Email (optional)" error={errors.email}>
                            <input type="email" className={inputCls(!!errors.email)} value={form.email} onChange={set("email")} />
                        </Field>
                        <Field label="Mode" error={errors.mode}>
                            <select className={inputCls(!!errors.mode)} value={form.mode} onChange={set("mode")}>
                                <option value="">Select</option>
                                {STUDY_MODES.map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Postal Address" error={errors.postalAddress} className="md:col-span-2">
                            <textarea
                                rows={2}
                                className={inputCls(!!errors.postalAddress)}
                                value={form.postalAddress}
                                onChange={set("postalAddress")}
                            />
                        </Field>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-navy-900 mb-2">Qualifications</h3>
                        {errors.qualifications && <p className="text-xs text-red-600 mb-2">{errors.qualifications}</p>}
                        <div className="space-y-3">
                            {quals.map((q, i) => {
                                const qe = (k: keyof QualificationInput) => errors[`q.${i}.${k}`];
                                return (
                                    <div key={i} className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                                            <Field label="Qualification" error={qe("qualification")} className="col-span-2">
                                                <input
                                                    className={inputCls(!!qe("qualification"))}
                                                    value={q.qualification}
                                                    onChange={(e) => setQual(i, "qualification", e.target.value)}
                                                />
                                            </Field>
                                            <Field label="Board / University" error={qe("boardUniversity")} className="col-span-2 md:col-span-4">
                                                <input
                                                    className={inputCls(!!qe("boardUniversity"))}
                                                    value={q.boardUniversity}
                                                    onChange={(e) => setQual(i, "boardUniversity", e.target.value)}
                                                />
                                            </Field>
                                            <Field label="Roll No." error={qe("rollNo")} className="col-span-2">
                                                <input
                                                    className={inputCls(!!qe("rollNo"))}
                                                    value={q.rollNo}
                                                    onChange={(e) => setQual(i, "rollNo", e.target.value)}
                                                />
                                            </Field>
                                            <Field label="Year" error={qe("passingYear")}>
                                                <input
                                                    className={inputCls(!!qe("passingYear"))}
                                                    inputMode="numeric"
                                                    value={q.passingYear}
                                                    onChange={(e) => setQual(i, "passingYear", digitsOnly(e.target.value, 4))}
                                                />
                                            </Field>
                                            <Field label="Total" error={qe("totalMarks")}>
                                                <input
                                                    className={inputCls(!!qe("totalMarks"))}
                                                    inputMode="decimal"
                                                    value={q.totalMarks}
                                                    onChange={(e) => setQual(i, "totalMarks", decimalOnly(e.target.value))}
                                                />
                                            </Field>
                                            <Field label="Obtained" error={qe("obtainedMarks")}>
                                                <div className="flex items-start gap-1">
                                                    <input
                                                        className={inputCls(!!qe("obtainedMarks"))}
                                                        inputMode="decimal"
                                                        value={q.obtainedMarks}
                                                        onChange={(e) => setQual(i, "obtainedMarks", decimalOnly(e.target.value))}
                                                    />
                                                    {quals.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setQuals((qs) => qs.filter((_, idx) => idx !== i))}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            aria-label="Remove qualification"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </Field>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {quals.length < MAX_QUALIFICATIONS && (
                            <button
                                type="button"
                                onClick={() => setQuals((qs) => [...qs, { ...emptyQual }])}
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600"
                            >
                                <Plus className="w-4 h-4" /> Add qualification
                            </button>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
