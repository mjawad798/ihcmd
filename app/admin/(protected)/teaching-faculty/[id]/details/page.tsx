"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Pencil, Trash2, Plus, X, ArrowLeft } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="w-full h-40 border border-gray-300 rounded-lg bg-gray-50 animate-pulse" />,
});

type DetailItem = {
    id: number;
    title: string;
    description: string;
    displayOrder: number;
    isActive: boolean;
};

type FacultySummary = {
    id: number;
    title: string;
    name: string;
};

const emptyForm = {
    title: "",
    description: "",
    displayOrder: 1,
    isActive: true,
};

export default function FacultyDetailsAdminPage() {
    const perm = useAdminPermission("teaching-faculty-details");
    const params = useParams();
    const facultyId = params.id as string;

    const [faculty, setFaculty] = useState<FacultySummary | null>(null);
    const [details, setDetails] = useState<DetailItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        const [facultyRes, detailsRes] = await Promise.all([
            fetch(`/api/teaching-faculty/${facultyId}`),
            fetch(`/api/teaching-faculty/${facultyId}/details`),
        ]);
        if (facultyRes.ok) setFaculty(await facultyRes.json());
        if (detailsRes.ok) setDetails(await detailsRes.json());
        setLoading(false);
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facultyId]);

    const openCreateForm = () => {
        setEditingId(null);
        setForm({ ...emptyForm, displayOrder: details.length + 1 > 15 ? 15 : details.length + 1 });
        setError("");
        setShowForm(true);
    };

    const openEditForm = (detail: DetailItem) => {
        setEditingId(detail.id);
        setForm({
            title: detail.title,
            description: detail.description,
            displayOrder: detail.displayOrder,
            isActive: detail.isActive,
        });
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const descriptionText = form.description.replace(/<[^>]*>/g, "").trim();
        if (!descriptionText) {
            setError("Description is required.");
            return;
        }

        setSaving(true);
        const res = await fetch(
            editingId
                ? `/api/teaching-faculty/${facultyId}/details/${editingId}`
                : `/api/teaching-faculty/${facultyId}/details`,
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
        if (!confirm("Delete this section?")) return;
        await fetch(`/api/teaching-faculty/${facultyId}/details/${id}`, { method: "DELETE" });
        load();
    };

    return (
        <div>
            <Link href="/admin/teaching-faculty" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Teaching Faculty
            </Link>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">
                    {faculty ? `Detail Sections — ${faculty.title} ${faculty.name}` : "Detail Sections"}
                </h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        disabled={details.length >= 15}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" /> Add Section
                    </button>
                )}
            </div>

            {!perm.view ? (
                <p className="text-center text-gray-400 py-10">You do not have permission to view this page.</p>
            ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="text-left px-4 py-3">Order</th>
                            <th className="text-left px-4 py-3">Title</th>
                            <th className="text-left px-4 py-3">Active</th>
                            <th className="text-right px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && details.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                                    No sections yet.
                                </td>
                            </tr>
                        )}
                        {details.map((detail) => (
                            <tr key={detail.id}>
                                <td className="px-4 py-3 text-gray-600">{detail.displayOrder}</td>
                                <td className="px-4 py-3 font-medium text-navy-900">{detail.title}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            detail.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {detail.isActive ? "Yes" : "No"}
                                    </span>
                                </td>
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
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Section" : "Add Section"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-gray-400 font-normal">e.g. "About", "Education", "Publications"</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <RichTextEditor
                                    value={form.description}
                                    onChange={(value) => setForm({ ...form, description: value })}
                                />
                            </div>

                            <div className="flex gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Order <span className="text-gray-400 font-normal">(1–15)</span>
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={15}
                                        required
                                        value={form.displayOrder}
                                        onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>

                                <div>
                                    <span className="block text-sm font-medium text-gray-700 mb-1">Active</span>
                                    <div className="flex items-center gap-4 py-2">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="isActive"
                                                checked={form.isActive === true}
                                                onChange={() => setForm({ ...form, isActive: true })}
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="isActive"
                                                checked={form.isActive === false}
                                                onChange={() => setForm({ ...form, isActive: false })}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
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
