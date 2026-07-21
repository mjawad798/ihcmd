"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="w-full h-40 border border-gray-300 rounded-lg bg-gray-50 animate-pulse" />,
});

const ABOUT_TYPES = ["hero", "content", "stat", "leadership"] as const;
type AboutType = (typeof ABOUT_TYPES)[number];

const TYPE_LABELS: Record<AboutType, string> = {
    hero: "Hero Banner",
    content: "Content Section",
    stat: "Stat",
    leadership: "Leadership Message",
};

const TYPE_HINTS: Record<AboutType, { title: string; subtitle: string }> = {
    hero: { title: "Main heading", subtitle: "Tagline" },
    content: { title: "Section heading (e.g. Our Mission)", subtitle: "Unused" },
    stat: { title: "Value (e.g. 2019, 50+)", subtitle: "Label (e.g. Established Year)" },
    leadership: { title: "Person's name", subtitle: "Designation" },
};

type AboutItem = {
    id: number;
    type: AboutType;
    title: string;
    subtitle: string | null;
    description: string | null;
    picture: string | null;
    displayOrder: number;
    isActive: boolean;
};

const emptyForm = {
    type: "content" as AboutType,
    title: "",
    subtitle: "",
    description: "",
    displayOrder: 0,
    isActive: true,
};

export default function AboutAdminPage() {
    const perm = useAdminPermission("about");
    const [items, setItems] = useState<AboutItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [pictureFile, setPictureFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [removePicture, setRemovePicture] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/about");
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
        setPictureFile(null);
        setPreviewUrl(null);
        setRemovePicture(false);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (item: AboutItem) => {
        setEditingId(item.id);
        setForm({
            type: item.type,
            title: item.title,
            subtitle: item.subtitle ?? "",
            description: item.description ?? "",
            displayOrder: item.displayOrder,
            isActive: item.isActive,
        });
        setPictureFile(null);
        setPreviewUrl(item.picture);
        setRemovePicture(false);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleFileSelect = (file: File | null) => {
        setPictureFile(file);
        setRemovePicture(false);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemovePicture = () => {
        setPictureFile(null);
        setPreviewUrl(null);
        setRemovePicture(true);
    };

    const showPicture = form.type === "content" || form.type === "leadership";
    const showDescription = form.type === "content" || form.type === "leadership";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const fd = new FormData();
        fd.append("type", form.type);
        fd.append("title", form.title);
        fd.append("subtitle", form.subtitle);
        fd.append("description", showDescription ? form.description : "");
        fd.append("displayOrder", String(form.displayOrder));
        fd.append("isActive", String(form.isActive));
        if (showPicture && pictureFile) fd.append("picture", pictureFile);
        if (showPicture && removePicture) fd.append("removePicture", "true");

        setSaving(true);
        const res = await fetch(editingId ? `/api/about/${editingId}` : "/api/about", {
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
        if (!confirm("Delete this section?")) return;
        await fetch(`/api/about/${id}`, { method: "DELETE" });
        loadItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">About Page</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
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
                            <th className="text-left px-4 py-3">Type</th>
                            <th className="text-left px-4 py-3">Title</th>
                            <th className="text-left px-4 py-3">Subtitle</th>
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
                                    No sections yet.
                                </td>
                            </tr>
                        )}
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-navy-50 text-navy-800">
                                        {TYPE_LABELS[item.type]}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium text-navy-900 max-w-xs truncate">{item.title}</td>
                                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.subtitle ?? "—"}</td>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    required
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value as AboutType })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                >
                                    {ABOUT_TYPES.map((t) => (
                                        <option key={t} value={t}>
                                            {TYPE_LABELS[t]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-gray-400 font-normal">({TYPE_HINTS[form.type].title})</span>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subtitle <span className="text-gray-400 font-normal">({TYPE_HINTS[form.type].subtitle})</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.subtitle}
                                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                            </div>

                            {showDescription && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <RichTextEditor
                                        value={form.description}
                                        onChange={(value) => setForm({ ...form, description: value })}
                                    />
                                </div>
                            )}

                            {showPicture && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Picture <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    {previewUrl && (
                                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-2">
                                            <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-cover" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                                            className="w-full text-sm"
                                        />
                                        {previewUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemovePicture}
                                                className="text-xs text-red-600 hover:underline flex-shrink-0"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

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
