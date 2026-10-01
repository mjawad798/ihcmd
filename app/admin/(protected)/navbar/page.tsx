"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type NavItemRow = {
    id: number;
    title: string;
    type: "direct" | "submenu";
    placement: "main" | "topbar";
    link: string | null;
    parentId: number | null;
    displayOrder: number;
    parent?: { id: number; title: string } | null;
};

const emptyForm = {
    title: "",
    type: "direct" as "direct" | "submenu",
    placement: "main" as "main" | "topbar",
    link: "",
    parentId: "" as number | "",
    displayOrder: 0,
};

export default function NavbarAdminPage() {
    const perm = useAdminPermission("navbar");
    const [items, setItems] = useState<NavItemRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/navbar");
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const parentOptions = items.filter(
        (item) => item.type === "direct" && item.placement === "main" && item.id !== editingId
    );

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (item: NavItemRow) => {
        setEditingId(item.id);
        setForm({
            title: item.title,
            type: item.type,
            placement: item.placement ?? "main",
            link: item.link ?? "",
            parentId: item.parentId ?? "",
            displayOrder: item.displayOrder,
        });
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.type === "submenu" && !form.parentId) {
            setError("Please select a parent for this submenu item.");
            return;
        }

        setSaving(true);
        const res = await fetch(editingId ? `/api/navbar/${editingId}` : "/api/navbar", {
            method: editingId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: form.title,
                type: form.type,
                placement: form.placement,
                link: form.link || null,
                parentId: form.type === "submenu" ? Number(form.parentId) : null,
                displayOrder: form.displayOrder,
            }),
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
        if (!confirm("Delete this navigation item?")) return;
        const res = await fetch(`/api/navbar/${id}`, { method: "DELETE" });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            alert(data.error || "Could not delete this item.");
            return;
        }
        loadItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Navbar</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Item
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
                            <th className="text-left px-4 py-3">Title</th>
                            <th className="text-left px-4 py-3">Type</th>
                            <th className="text-left px-4 py-3">Placement</th>
                            <th className="text-left px-4 py-3">Parent</th>
                            <th className="text-left px-4 py-3">Link</th>
                            <th className="text-left px-4 py-3">Order</th>
                            <th className="text-right px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {!loading && items.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                                    No navigation items yet.
                                </td>
                            </tr>
                        )}
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 font-medium text-navy-900">{item.title}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.type === "direct" ? "bg-navy-50 text-navy-800" : "bg-gold-50 text-gold-700"
                                        }`}
                                    >
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.placement === "topbar" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {item.placement === "topbar" ? "top bar" : "main nav"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">{item.parent?.title ?? "—"}</td>
                                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.link ?? "—"}</td>
                                <td className="px-4 py-3">{item.displayOrder}</td>
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Nav Item" : "Add Nav Item"}</h2>
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
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-1">Placement</span>
                                <div className="flex items-center gap-4 py-1">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="placement"
                                            checked={form.placement === "main"}
                                            onChange={() => setForm({ ...form, placement: "main" })}
                                        />
                                        Main navigation
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="placement"
                                            checked={form.placement === "topbar"}
                                            onChange={() => setForm({ ...form, placement: "topbar", type: "direct", parentId: "" })}
                                        />
                                        Top bar (right of header)
                                    </label>
                                </div>
                            </div>

                            {form.placement === "main" && (
                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-1">Type</span>
                                <div className="flex items-center gap-4 py-1">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={form.type === "direct"}
                                            onChange={() => setForm({ ...form, type: "direct", parentId: "" })}
                                        />
                                        Direct (link or dropdown button)
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={form.type === "submenu"}
                                            onChange={() => setForm({ ...form, type: "submenu" })}
                                        />
                                        Submenu
                                    </label>
                                </div>
                            </div>
                            )}

                            {form.placement === "main" && form.type === "submenu" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                                    <select
                                        required
                                        value={form.parentId}
                                        onChange={(e) => setForm({ ...form, parentId: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    >
                                        <option value="">Select parent...</option>
                                        {parentOptions.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link <span className="text-gray-400 font-normal">(leave empty for a dropdown button with no link)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="/about or https://..."
                                    value={form.link}
                                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    value={form.displayOrder}
                                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
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
