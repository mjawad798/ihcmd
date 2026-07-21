"use client";
import { useEffect, useState } from "react";
import { FileText, Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type DownloadItem = {
    id: number;
    title: string;
    file: string;
    showInDownloads: boolean;
    isActive: boolean;
};

const emptyForm = {
    title: "",
    showInDownloads: true,
    isActive: true,
};

const ACCEPT = ".jpg,.jpeg,.png,.pdf";

export default function DownloadsAdminPage() {
    const perm = useAdminPermission("downloads");
    const [items, setItems] = useState<DownloadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [file, setFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/downloads");
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFile(null);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (item: DownloadItem) => {
        setEditingId(item.id);
        setForm({
            title: item.title,
            showInDownloads: item.showInDownloads,
            isActive: item.isActive,
        });
        setFile(null);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!editingId && !file) {
            setError("Please select a file.");
            return;
        }

        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("showInDownloads", String(form.showInDownloads));
        fd.append("isActive", String(form.isActive));
        if (file) fd.append("file", file);

        setSaving(true);
        const res = await fetch(editingId ? `/api/downloads/${editingId}` : "/api/downloads", {
            method: editingId ? "PUT" : "POST",
            body: fd,
        });
        setSaving(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Something went wrong.");
            return;
        }

        setShowForm(false);
        loadItems();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this download? This cannot be undone.")) return;
        await fetch(`/api/downloads/${id}`, { method: "DELETE" });
        loadItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Downloads</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Download
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
                            <th className="text-left px-4 py-3">File</th>
                            <th className="text-left px-4 py-3">Title</th>
                            <th className="text-left px-4 py-3">Show in Downloads</th>
                            <th className="text-left px-4 py-3">Active</th>
                            <th className="text-right px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && items.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    No downloads yet.
                                </td>
                            </tr>
                        )}
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3">
                                    <a
                                        href={item.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-navy-700 hover:text-gold-600 transition-colors"
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span className="text-xs uppercase">{item.file.split(".").pop()}</span>
                                    </a>
                                </td>
                                <td className="px-4 py-3 font-medium text-navy-900 max-w-xs truncate">{item.title}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.showInDownloads ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {item.showInDownloads ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {item.isActive ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        {perm.edit && (
                                            <button
                                                onClick={() => openEditForm(item)}
                                                className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {perm.delete && (
                                            <button
                                                onClick={() => handleDelete(item.id)}
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Download" : "Add Download"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={300}
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    File <span className="text-gray-400 font-normal">(jpg, jpeg, png, or pdf)</span>
                                </label>
                                <input
                                    type="file"
                                    accept={ACCEPT}
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="w-full text-sm"
                                />
                                {editingId && <p className="text-xs text-gray-400 mt-1">Leave empty to keep the current file.</p>}
                            </div>

                            <div className="flex gap-8">
                                <div>
                                    <span className="block text-sm font-medium text-gray-700 mb-1">Show in Downloads</span>
                                    <div className="flex items-center gap-4 py-2">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="showInDownloads"
                                                checked={form.showInDownloads === true}
                                                onChange={() => setForm({ ...form, showInDownloads: true })}
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="showInDownloads"
                                                checked={form.showInDownloads === false}
                                                onChange={() => setForm({ ...form, showInDownloads: false })}
                                            />
                                            No
                                        </label>
                                    </div>
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
