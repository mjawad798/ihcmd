"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type SessionItem = {
    id: number;
    sessionName: string;
    code: string;
    isActive: boolean;
    isOpenForAdmission: boolean;
    lastSerial: number;
};

const emptyForm = { sessionName: "", code: "", isActive: false, isOpenForAdmission: false };

export default function AdmissionSessionsAdminPage() {
    const perm = useAdminPermission("admission-sessions");
    const [items, setItems] = useState<SessionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/admission-sessions");
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (item: SessionItem) => {
        setEditingId(item.id);
        setForm({
            sessionName: item.sessionName,
            code: item.code,
            isActive: item.isActive,
            isOpenForAdmission: item.isOpenForAdmission,
        });
        setError("");
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        const res = await fetch(editingId ? `/api/admission-sessions/${editingId}` : "/api/admission-sessions", {
            method: editingId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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
        if (!confirm("Delete this session?")) return;
        const res = await fetch(`/api/admission-sessions/${id}`, { method: "DELETE" });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(data.error || "Could not delete session.");
            return;
        }
        loadItems();
    };

    const badge = (on: boolean, yes: string, no: string) => (
        <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                on ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
            }`}
        >
            {on ? yes : no}
        </span>
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Admission Sessions</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Session
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
                                    <th className="text-left px-4 py-3">Session</th>
                                    <th className="text-left px-4 py-3">Code</th>
                                    <th className="text-left px-4 py-3">Active</th>
                                    <th className="text-left px-4 py-3">Open for Admission</th>
                                    <th className="text-left px-4 py-3">Applications</th>
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
                                {!loading && items.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                            No sessions yet.
                                        </td>
                                    </tr>
                                )}
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3 font-medium text-navy-900">{item.sessionName}</td>
                                        <td className="px-4 py-3 font-mono">{item.code}</td>
                                        <td className="px-4 py-3">{badge(item.isActive, "Yes", "No")}</td>
                                        <td className="px-4 py-3">{badge(item.isOpenForAdmission, "Yes", "No")}</td>
                                        <td className="px-4 py-3">{item.lastSerial}</td>
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
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Session" : "Add Session"}</h2>
                            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Session Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.sessionName}
                                    onChange={(e) => setForm({ ...form, sessionName: e.target.value })}
                                    placeholder="e.g. Fall 2026"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Code <span className="text-gray-400 font-normal">(used in application numbers)</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={20}
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                    placeholder="e.g. F26"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                Active session (deactivates any other session)
                            </label>

                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={form.isOpenForAdmission}
                                    onChange={(e) => setForm({ ...form, isOpenForAdmission: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                Open for admission
                            </label>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
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
