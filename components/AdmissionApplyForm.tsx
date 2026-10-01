"use client";
import { useState } from "react";
import { CheckCircle2, Download, Plus, Trash2, Send } from "lucide-react";
import {
    GENDERS,
    decimalOnly,
    digitsOnly,
    displayDateToIso,
    maskDate,
    MAX_QUALIFICATIONS,
    STUDY_MODES,
    validateApplication,
    type FieldErrors,
    type QualificationInput,
} from "@/lib/admission";

type Program = { id: number; name: string; type: string };

const emptyQual: QualificationInput = {
    qualification: "",
    boardUniversity: "",
    rollNo: "",
    passingYear: "",
    totalMarks: "",
    obtainedMarks: "",
};

const inputCls = (hasError: boolean) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 ${
        hasError
            ? "border-red-400 focus:ring-red-300 focus:border-red-400"
            : "border-gray-300 focus:ring-gold-400 focus:border-gold-400"
    }`;

function Field({
    label,
    required,
    error,
    children,
    className = "",
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className} data-error={error ? "true" : undefined}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>
    );
}

function Card({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 md:px-8 py-4 bg-navy-900">
                <span className="w-7 h-7 rounded-full bg-gold-500 text-navy-900 text-sm font-bold flex items-center justify-center">
                    {n}
                </span>
                <h3 className="text-white font-bold tracking-wide uppercase text-sm">{title}</h3>
            </div>
            <div className="p-6 md:p-8">{children}</div>
        </section>
    );
}

function Choice({
    name,
    options,
    value,
    onChange,
}: {
    name: string;
    options: readonly string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((o) => (
                <label
                    key={o}
                    className={`cursor-pointer px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        value === o
                            ? "bg-navy-900 border-navy-900 text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:border-gold-400"
                    }`}
                >
                    <input
                        type="radio"
                        name={name}
                        value={o}
                        checked={value === o}
                        onChange={() => onChange(o)}
                        className="sr-only"
                    />
                    {o}
                </label>
            ))}
        </div>
    );
}

export default function AdmissionApplyForm({ sessionName, programs }: { sessionName: string; programs: Program[] }) {
    const [form, setForm] = useState({
        fullName: "",
        fatherName: "",
        dateOfBirth: "",
        gender: "",
        cnic: "",
        contactNo: "",
        email: "",
        postalAddress: "",
        programId: "",
        mode: "",
        website: "",
    });
    const [quals, setQuals] = useState<QualificationInput[]>([{ ...emptyQual }]);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false); // after first attempt, validate live
    const [serverErrors, setServerErrors] = useState<FieldErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState<{ applicationNo: string; token: string } | null>(null);

    // The form shows dd-MM-yyyy; the API works in ISO yyyy-MM-dd.
    const payload = { ...form, dateOfBirth: displayDateToIso(form.dateOfBirth), qualifications: quals };
    const checked = validateApplication(payload);
    const clientErrors: FieldErrors = "errors" in checked ? checked.errors : {};
    const errors: FieldErrors = submitted ? { ...serverErrors, ...clientErrors } : {};
    if (submitted && !agreed) errors.agreed = "You must accept the declaration.";

    const set = (k: keyof typeof form, transform?: (v: string) => string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setForm((f) => ({ ...f, [k]: transform ? transform(e.target.value) : e.target.value }));
            setServerErrors({});
        };

    const setQual = (i: number, k: keyof QualificationInput, v: string) =>
        setQuals((qs) => qs.map((q, idx) => (idx === i ? { ...q, [k]: v } : q)));

    const scrollToFirstError = () =>
        setTimeout(() => {
            document.querySelector("[data-error]")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitted(true);

        if (Object.keys(clientErrors).length > 0 || !agreed) {
            setError("Please correct the highlighted fields.");
            scrollToFirstError();
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/admissions/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setServerErrors(data.errors ?? {});
                setError(data.error || "Could not submit your application. Please try again.");
                if (data.errors) scrollToFirstError();
                else window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            setDone(data);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            setError("Something went wrong. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (done) {
        const pdfUrl = `/api/admissions/pdf?no=${encodeURIComponent(done.applicationNo)}&token=${done.token}`;
        return (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-8 md:p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-extrabold text-navy-900">Your form has been submitted</h3>
                <p className="text-gray-600 mt-3">Your form is duly submitted. Your Application ID is</p>
                <p className="mt-3 inline-block px-6 py-3 rounded-xl bg-navy-900 text-gold-400 text-2xl md:text-3xl font-mono font-bold tracking-wider">
                    {done.applicationNo}
                </p>
                <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
                    Please keep this number for future reference. Download your application form below and keep a copy.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    <a
                        href={pdfUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                    >
                        <Download className="w-4 h-4" /> Download Application Form
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {error && (
                <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
                    {error}
                </p>
            )}

            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={set("website")}
                className="hidden"
            />

            <Card n={1} title="Student Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Full Name" required error={errors.fullName}>
                        <input
                            className={inputCls(!!errors.fullName)}
                            maxLength={150}
                            value={form.fullName}
                            onChange={set("fullName")}
                        />
                    </Field>
                    <Field label="Father / Guardian Name" required error={errors.fatherName}>
                        <input
                            className={inputCls(!!errors.fatherName)}
                            maxLength={150}
                            value={form.fatherName}
                            onChange={set("fatherName")}
                        />
                    </Field>
                    <Field label="Date of Birth" required error={errors.dateOfBirth}>
                        <input
                            className={inputCls(!!errors.dateOfBirth)}
                            inputMode="numeric"
                            placeholder="dd-mm-yyyy"
                            maxLength={10}
                            value={form.dateOfBirth}
                            onChange={set("dateOfBirth", maskDate)}
                        />
                    </Field>
                    <Field label="Gender" required error={errors.gender}>
                        <Choice
                            name="gender"
                            options={GENDERS}
                            value={form.gender}
                            onChange={(v) => setForm((f) => ({ ...f, gender: v }))}
                        />
                    </Field>
                    <Field label="CNIC / B-Form No." required error={errors.cnic}>
                        <input
                            className={inputCls(!!errors.cnic)}
                            inputMode="numeric"
                            placeholder="13 digits, without dashes"
                            value={form.cnic}
                            onChange={set("cnic", (v) => digitsOnly(v, 13))}
                        />
                    </Field>
                    <Field label="WhatsApp / Contact No." required error={errors.contactNo}>
                        <input
                            className={inputCls(!!errors.contactNo)}
                            inputMode="numeric"
                            placeholder="03001234567"
                            value={form.contactNo}
                            onChange={set("contactNo", (v) => digitsOnly(v, 11))}
                        />
                    </Field>
                    <Field label="Email (optional)" error={errors.email} className="md:col-span-2">
                        <input
                            type="email"
                            className={inputCls(!!errors.email)}
                            maxLength={150}
                            value={form.email}
                            onChange={set("email")}
                        />
                    </Field>
                    <Field label="Postal Address" required error={errors.postalAddress} className="md:col-span-2">
                        <textarea
                            rows={3}
                            maxLength={500}
                            className={inputCls(!!errors.postalAddress)}
                            value={form.postalAddress}
                            onChange={set("postalAddress")}
                        />
                    </Field>
                </div>
            </Card>

            <Card n={2} title="Program Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Program Applied For" required error={errors.programId} className="md:col-span-2">
                        <select
                            className={inputCls(!!errors.programId)}
                            value={form.programId}
                            onChange={set("programId")}
                        >
                            <option value="">Select a program</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Mode" required error={errors.mode} className="md:col-span-2">
                        <Choice
                            name="mode"
                            options={STUDY_MODES}
                            value={form.mode}
                            onChange={(v) => setForm((f) => ({ ...f, mode: v }))}
                        />
                    </Field>
                </div>
            </Card>

            <Card n={3} title="Academic Information">
                <div className="space-y-4">
                    {errors.qualifications && <p className="text-xs text-red-600">{errors.qualifications}</p>}
                    {quals.map((q, i) => {
                        const qe = (k: keyof QualificationInput) => errors[`q.${i}.${k}`];
                        return (
                            <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Qualification {i + 1}
                                    </span>
                                    {quals.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setQuals((qs) => qs.filter((_, idx) => idx !== i))}
                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                            aria-label="Remove qualification"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                                    <Field label="Qualification" required error={qe("qualification")} className="col-span-2">
                                        <input
                                            className={inputCls(!!qe("qualification"))}
                                            placeholder="e.g. Matric / F.Sc"
                                            maxLength={100}
                                            value={q.qualification}
                                            onChange={(e) => setQual(i, "qualification", e.target.value)}
                                        />
                                    </Field>
                                    <Field
                                        label="Board / University"
                                        required
                                        error={qe("boardUniversity")}
                                        className="col-span-2 md:col-span-4"
                                    >
                                        <input
                                            className={inputCls(!!qe("boardUniversity"))}
                                            maxLength={150}
                                            value={q.boardUniversity}
                                            onChange={(e) => setQual(i, "boardUniversity", e.target.value)}
                                        />
                                    </Field>
                                    <Field label="Roll No." required error={qe("rollNo")} className="col-span-2">
                                        <input
                                            className={inputCls(!!qe("rollNo"))}
                                            maxLength={40}
                                            value={q.rollNo}
                                            onChange={(e) => setQual(i, "rollNo", e.target.value)}
                                        />
                                    </Field>
                                    <Field label="Year" required error={qe("passingYear")}>
                                        <input
                                            className={inputCls(!!qe("passingYear"))}
                                            inputMode="numeric"
                                            placeholder="2024"
                                            value={q.passingYear}
                                            onChange={(e) => setQual(i, "passingYear", digitsOnly(e.target.value, 4))}
                                        />
                                    </Field>
                                    <Field label="Total Marks" required error={qe("totalMarks")}>
                                        <input
                                            className={inputCls(!!qe("totalMarks"))}
                                            inputMode="decimal"
                                            value={q.totalMarks}
                                            onChange={(e) => setQual(i, "totalMarks", decimalOnly(e.target.value))}
                                        />
                                    </Field>
                                    <Field label="Obtained Marks" required error={qe("obtainedMarks")} className="col-span-2">
                                        <input
                                            className={inputCls(!!qe("obtainedMarks"))}
                                            inputMode="decimal"
                                            value={q.obtainedMarks}
                                            onChange={(e) => setQual(i, "obtainedMarks", decimalOnly(e.target.value))}
                                        />
                                    </Field>
                                </div>
                            </div>
                        );
                    })}
                    {quals.length < MAX_QUALIFICATIONS && (
                        <button
                            type="button"
                            onClick={() => setQuals((qs) => [...qs, { ...emptyQual }])}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-600"
                        >
                            <Plus className="w-4 h-4" /> Add another qualification
                        </button>
                    )}
                </div>
            </Card>

            <Card n={4} title="Declaration">
                <div data-error={errors.agreed ? "true" : undefined}>
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-1 w-4 h-4"
                        />
                        <span>
                            I declare that the information given above is correct and complete to the best of my
                            knowledge. I understand that any false information may result in cancellation of my
                            admission for {sessionName}.
                        </span>
                    </label>
                    {errors.agreed && <p className="text-xs text-red-600 mt-1">{errors.agreed}</p>}
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                    {submitting ? "Submitting..." : "Submit Application"}
                </button>
            </Card>
        </form>
    );
}
