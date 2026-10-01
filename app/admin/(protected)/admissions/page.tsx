"use client";
import { useEffect, useMemo, useState } from "react";
import { Download, Eye, FileDown, Pencil, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";
import { formatCnic, formatDate } from "@/lib/admission";
import AdmissionEditModal, { type ProgramOption } from "@/components/admin/AdmissionEditModal";

type Qualification = {
    id: number;
    qualification: string;
    boardUniversity: string;
    rollNo: string;
    passingYear: string;
    totalMarks: string;
    obtainedMarks: string;
};

type Application = {
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
    programLevel: string;
    mode: string;
    status: string;
    createdAt: string;
    session: { id: number; sessionName: string };
    program: { id: number; name: string };
    qualifications: Qualification[];
};

type SessionOption = { id: number; sessionName: string };

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

export default function AdmissionsAdminPage() {
    const perm = useAdminPermission("admissions");
    const [items, setItems] = useState<Application[]>([]);
    const [sessions, setSessions] = useState<SessionOption[]>([]);
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const [sessionId, setSessionId] = useState("");
    const [programId, setProgramId] = useState("");
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Application | null>(null);
    const [editing, setEditing] = useState<Application | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        // Sessions list needs the sessions permission; the filter simply stays empty without it.
        fetch("/api/admission-sessions")
            .then((r) => (r.ok ? r.json() : []))
            .then((d) => setSessions(Array.isArray(d) ? d : []))
            .catch(() => {});
        fetch("/api/admissions/programs")
            .then((r) => (r.ok ? r.json() : []))
            .then((d) => setPrograms(Array.isArray(d) ? d : []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!perm.view) return;
        setLoading(true);
        const params = new URLSearchParams();
        if (sessionId) params.set("sessionId", sessionId);
        if (programId) params.set("programId", programId);
        if (query) params.set("q", query);
        fetch(`/api/admissions?${params}`)
            .then((r) => r.json())
            .then((d) => setItems(Array.isArray(d) ? d : []))
            .finally(() => setLoading(false));
    }, [sessionId, programId, query, perm.view, reloadKey]);

    const exportCsv = useMemo(
        () => () => {
            const head = [
                "Application No", "Session", "Program", "Level", "Mode", "Full Name", "Father/Guardian",
                "DOB", "Gender", "CNIC", "Contact", "Email", "Address", "Qualifications", "Status", "Submitted",
            ];
            const rows = items.map((a) => [
                a.applicationNo, a.session?.sessionName, a.program?.name, a.programLevel, a.mode,
                a.fullName, a.fatherName, formatDate(a.dateOfBirth), a.gender, formatCnic(a.cnic), a.contactNo, a.email ?? "",
                a.postalAddress.replace(/\s*\n\s*/g, ", "),
                a.qualifications
                    .map((q) => `${q.qualification} (${q.boardUniversity}, ${q.passingYear}, ${q.obtainedMarks}/${q.totalMarks})`)
                    .join("; "),
                a.status, formatDate(a.createdAt),
            ]);
            const csv = [head, ...rows].map((r) => r.map((c) => csvCell(c ?? "")).join(",")).join("\r\n");
            const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "admission-applications.csv";
            link.click();
            URL.revokeObjectURL(url);
        },
        [items]
    );

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Admission Applications</h1>
                {perm.view && (
                    <button
                        onClick={exportCsv}
                        disabled={items.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                    >
                        <FileDown className="w-4 h-4" /> Export CSV
                    </button>
                )}
            </div>

            {!perm.view ? (
                <p className="text-center text-gray-400 py-10">You do not have permission to view this page.</p>
            ) : (
                <>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setQuery(search.trim());
                        }}
                        className="flex flex-wrap gap-3 mb-4"
                    >
                        <select
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="">All sessions</option>
                            {sessions.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.sessionName}
                                </option>
                            ))}
                        </select>
                        <select
                            value={programId}
                            onChange={(e) => setProgramId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm max-w-xs"
                        >
                            <option value="">All programs</option>
                            {programs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, CNIC or application no."
                            className="flex-1 min-w-[220px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                        />
                        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-gray-100 rounded-lg hover:bg-gray-200">
                            Search
                        </button>
                    </form>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="text-left px-4 py-3">Application No</th>
                                        <th className="text-left px-4 py-3">Name</th>
                                        <th className="text-left px-4 py-3">CNIC</th>
                                        <th className="text-left px-4 py-3">Program</th>
                                        <th className="text-left px-4 py-3">Session</th>
                                        <th className="text-left px-4 py-3">Submitted</th>
                                        <th className="text-right px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-6 text-center text-gray-400">Loading...</td>
                                        </tr>
                                    )}
                                    {!loading && items.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-6 text-center text-gray-400">No applications found.</td>
                                        </tr>
                                    )}
                                    {items.map((a) => (
                                        <tr key={a.id}>
                                            <td className="px-4 py-3 font-mono">{a.applicationNo}</td>
                                            <td className="px-4 py-3 font-medium text-navy-900">{a.fullName}</td>
                                            <td className="px-4 py-3">{formatCnic(a.cnic)}</td>
                                            <td className="px-4 py-3 max-w-xs truncate">{a.program?.name}</td>
                                            <td className="px-4 py-3">{a.session?.sessionName}</td>
                                            <td className="px-4 py-3">{formatDate(a.createdAt)}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelected(a)}
                                                        className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {perm.edit && (
                                                        <button
                                                            onClick={() => setEditing(a)}
                                                            className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <a
                                                        href={`/api/admissions/pdf?no=${encodeURIComponent(a.applicationNo)}`}
                                                        className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg"
                                                        title="Download PDF"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {editing && (
                <AdmissionEditModal
                    application={editing}
                    programs={programs}
                    onClose={() => setEditing(null)}
                    onSaved={() => {
                        setEditing(null);
                        setReloadKey((k) => k + 1);
                    }}
                />
            )}

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{selected.applicationNo}</h2>
                            <button onClick={() => setSelected(null)} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-5 text-sm">
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    ["Full Name", selected.fullName],
                                    ["Father / Guardian", selected.fatherName],
                                    ["Date of Birth", formatDate(selected.dateOfBirth)],
                                    ["Gender", selected.gender],
                                    ["CNIC / B-Form", formatCnic(selected.cnic)],
                                    ["Contact", selected.contactNo],
                                    ["Email", selected.email || "-"],
                                    ["Session", selected.session?.sessionName],
                                    ["Program", selected.program?.name],
                                    ["Level / Mode", `${selected.programLevel} / ${selected.mode}`],
                                ].map(([k, v]) => (
                                    <div key={k}>
                                        <dt className="text-gray-500">{k}</dt>
                                        <dd className="font-medium text-navy-900">{v}</dd>
                                    </div>
                                ))}
                                <div className="sm:col-span-2">
                                    <dt className="text-gray-500">Postal Address</dt>
                                    <dd className="font-medium text-navy-900 whitespace-pre-line">{selected.postalAddress}</dd>
                                </div>
                            </dl>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border border-gray-200">
                                    <thead className="bg-gray-50 text-gray-500 uppercase">
                                        <tr>
                                            {["Qualification", "Board / University", "Roll No", "Year", "Total", "Obtained"].map((h) => (
                                                <th key={h} className="text-left px-3 py-2">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {selected.qualifications.map((q) => (
                                            <tr key={q.id}>
                                                <td className="px-3 py-2">{q.qualification}</td>
                                                <td className="px-3 py-2">{q.boardUniversity}</td>
                                                <td className="px-3 py-2">{q.rollNo}</td>
                                                <td className="px-3 py-2">{q.passingYear}</td>
                                                <td className="px-3 py-2">{q.totalMarks}</td>
                                                <td className="px-3 py-2">{q.obtainedMarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
