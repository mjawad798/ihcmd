"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Plus, X, ArrowLeft } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type DetailItem = {
    id: number;
    serialNumber: string;
    registrationNo: string;
    studentName: string;
    fatherName: string;
    duration: string;
};

type MasterSummary = {
    id: number;
    name: string;
};

const emptyForm = {
    serialNumber: "",
    registrationNo: "",
    studentName: "",
    fatherName: "",
    duration: "",
};

export default function VerificationDetailsAdminPage() {
    const perm = useAdminPermission("verification-detail");
    const params = useParams();
    const masterId = params.id as string;

    const [master, setMaster] = useState<MasterSummary | null>(null);
    const [details, setDetails] = useState<DetailItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        const [masterRes, detailsRes] = await Promise.all([
            fetch(`/api/verification-master/${masterId}`),
            fetch(`/api/verification-master/${masterId}/details`),
        ]);
        if (masterRes.ok) setMaster(await masterRes.json());
        if (detailsRes.ok) setDetails(await detailsRes.json());
        setLoading(false);
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [masterId]);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (detail: DetailItem) => {
        setEditingId(detail.id);
        setForm({
            serialNumber: detail.serialNumber,
            registrationNo: detail.registrationNo,
            studentName: detail.studentName,
            fatherName: detail.fatherName,
            duration: detail.duration,
        });
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        setSaving(true);
        const res = await fetch(
            editingId
                ? `/api/verification-master/${masterId}/details/${editingId}`
                : `/api/verification-master/${masterId}/details`,
            {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
        );
        setSaving(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Something went wrong.");
            return;
        }

        setShowForm(false);
        load();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this record?")) return;
        await fetch(`/api/verification-master/${masterId}/details/${id}`, { method: "DELETE" });
        load();
    };

    return (
        <div>
            <Link href="/admin/verification-master" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Record Types
            </Link>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">
                    {master ? `Records — ${master.name}` : "Records"}
                </h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Record
                    </button>
                )}
            </div>

            {!perm.view ? (
                <p className="text-center text-gray-400 py-10">You do not have permission to view this page.</p>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="text-left px-4 py-3">Serial No.</th>
                                <th className="text-left px-4 py-3">Registration No.</th>
                                <th className="text-left px-4 py-3">Student Name</th>
                                <th className="text-left px-4 py-3">Father Name</th>
                                <th className="text-left px-4 py-3">Duration</th>
                                <th className="text-right px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {!loading && details.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                        No records yet.
                                    </td>
                                </tr>
                            )}
                            {details.map((detail) => (
                                <tr key={detail.id}>
                                    <td className="px-4 py-3 font-mono text-xs text-navy-900">{detail.serialNumber}</td>
                                    <td className="px-4 py-3 text-gray-600">{detail.registrationNo}</td>
                                    <td className="px-4 py-3 font-medium text-navy-900">{detail.studentName}</td>
                                    <td className="px-4 py-3 text-gray-600">{detail.fatherName}</td>
                                    <td className="px-4 py-3 text-gray-600">{detail.duration}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {perm.edit && (
                                                <button
                                                    onClick={() => openEditForm(detail)}
                                                    className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            )}
                                            {perm.delete && (
                                                <button
                                                    onClick={() => handleDelete(detail.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Record" : "Add Record"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={form.serialNumber}
                                    onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={form.registrationNo}
                                    onChange={(e) => setForm({ ...form, registrationNo: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={300}
                                        value={form.studentName}
                                        onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Father Name</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={300}
                                        value={form.fatherName}
                                        onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration <span className="text-gray-400 font-normal">e.g. "2021 – 2023"</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={form.duration}
                                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
