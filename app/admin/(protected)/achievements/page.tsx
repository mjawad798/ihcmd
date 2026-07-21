"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";
import { ACHIEVEMENT_ICONS, ACHIEVEMENT_ICON_MAP, type AchievementIcon } from "@/lib/achievementIcons";

type AchievementItem = {
    id: number;
    icon: AchievementIcon;
    count: string;
    label: string;
    displayOrder: number;
    isActive: boolean;
};

type FormState = {
    icon: AchievementIcon;
    count: string;
    label: string;
    displayOrder: number;
    isActive: boolean;
};

const emptyForm: FormState = {
    icon: ACHIEVEMENT_ICONS[0],
    count: "",
    label: "",
    displayOrder: 0,
    isActive: true,
};

export default function AchievementsAdminPage() {
    const perm = useAdminPermission("achievements");
    const [items, setItems] = useState<AchievementItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/achievements");
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

    const openEditForm = (item: AchievementItem) => {
        setEditingId(item.id);
        setForm({
            icon: item.icon,
            count: item.count,
            label: item.label,
            displayOrder: item.displayOrder,
            isActive: item.isActive,
        });
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        setSaving(true);
        const res = await fetch(editingId ? `/api/achievements/${editingId}` : "/api/achievements", {
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
        if (!confirm("Delete this achievement? This cannot be undone.")) return;
        await fetch(`/api/achievements/${id}`, { method: "DELETE" });
        loadItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Achievements</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Shown as the stats strip on the homepage. Only active items are displayed, in order.
                    </p>
                </div>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Achievement
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
                                <th className="text-left px-4 py-3">Icon</th>
                                <th className="text-left px-4 py-3">Count</th>
                                <th className="text-left px-4 py-3">Label</th>
                                <th className="text-left px-4 py-3">Order</th>
                                <th className="text-left px-4 py-3">Active</th>
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
                                        No achievements yet.
                                    </td>
                                </tr>
                            )}
                            {items.map((item) => {
                                const Icon = ACHIEVEMENT_ICON_MAP[item.icon];
                                return (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">
                                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-navy-900 text-white">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-navy-900">{item.count}</td>
                                        <td className="px-4 py-3">{item.label}</td>
                                        <td className="px-4 py-3">{item.displayOrder}</td>
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Achievement" : "Add Achievement"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <div className="grid grid-cols-7 gap-2">
                                    {ACHIEVEMENT_ICONS.map((iconName) => {
                                        const Icon = ACHIEVEMENT_ICON_MAP[iconName];
                                        const selected = form.icon === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                title={iconName}
                                                onClick={() => setForm({ ...form, icon: iconName })}
                                                className={`aspect-square flex items-center justify-center rounded-lg border transition-colors ${
                                                    selected
                                                        ? "bg-navy-900 border-navy-900 text-white"
                                                        : "bg-white border-gray-300 text-navy-700 hover:border-navy-400"
                                                }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Count <span className="text-gray-400 font-normal">(e.g. 5000+, 100%)</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={50}
                                    value={form.count}
                                    onChange={(e) => setForm({ ...form, count: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={200}
                                    value={form.label}
                                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div className="flex gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={form.displayOrder}
                                        onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
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
