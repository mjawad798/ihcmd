"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type GalleryItem = {
    id: number;
    caption: string;
    picture: string;
    isActive: boolean;
};

const emptyForm = {
    caption: "",
    isActive: true,
};

export default function GalleryAdminPage() {
    const perm = useAdminPermission("gallery");
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [pictureFile, setPictureFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadItems = async () => {
        setLoading(true);
        const res = await fetch("/api/gallery");
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
        setError("");
        setShowForm(true);
    };

    const openEditForm = (item: GalleryItem) => {
        setEditingId(item.id);
        setForm({ caption: item.caption, isActive: item.isActive });
        setPictureFile(null);
        setPreviewUrl(item.picture);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleFileSelect = (file: File | null) => {
        setPictureFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!editingId && !pictureFile) {
            setError("Please select a picture.");
            return;
        }

        const fd = new FormData();
        fd.append("caption", form.caption);
        fd.append("isActive", String(form.isActive));
        if (pictureFile) fd.append("picture", pictureFile);

        setSaving(true);
        const res = await fetch(editingId ? `/api/gallery/${editingId}` : "/api/gallery", {
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
        if (!confirm("Delete this picture? This cannot be undone.")) return;
        await fetch(`/api/gallery/${id}`, { method: "DELETE" });
        loadItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Gallery</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Picture
                    </button>
                )}
            </div>

            {!perm.view ? (
                <p className="text-center text-gray-400 py-10">You do not have permission to view this page.</p>
            ) : (
            <>
            {loading && <p className="text-center text-gray-400 py-16">Loading...</p>}
            {!loading && items.length === 0 && <p className="text-center text-gray-400 py-16">No gallery pictures yet.</p>}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                        <div className="relative w-full aspect-square bg-gray-100">
                            <Image src={item.picture} alt={item.caption} fill loader={({ src }) => src} className="object-cover" />
                            <span
                                className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                                    item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                }`}
                            >
                                {item.isActive ? "Active" : "Inactive"}
                            </span>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                {perm.edit && (
                                    <button
                                        onClick={() => openEditForm(item)}
                                        className="p-2 bg-white text-navy-700 rounded-lg hover:bg-gold-50 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                )}
                                {perm.delete && (
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="px-3 py-2 text-xs text-gray-600 truncate">{item.caption}</p>
                    </div>
                ))}
            </div>
            </>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Picture" : "Add Picture"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Picture</label>
                                {previewUrl && (
                                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-2">
                                        <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                                    className="w-full text-sm"
                                />
                                {editingId && <p className="text-xs text-gray-400 mt-1">Leave empty to keep the current picture.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                                <textarea
                                    rows={3}
                                    required
                                    maxLength={400}
                                    value={form.caption}
                                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
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
