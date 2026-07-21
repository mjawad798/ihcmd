"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Cropper, { type Area } from "react-easy-crop";
import { Pencil, Trash2, Plus, X, FileText, ExternalLink } from "lucide-react";
import { getCroppedImageBlob } from "@/lib/cropImage";
import { useAdminPermission } from "@/lib/useAdminPermission";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
    ssr: false,
    loading: () => <div className="w-full h-40 border border-gray-300 rounded-lg bg-gray-50 animate-pulse" />,
});

const PICTURE_WIDTH = 1600;
const PICTURE_HEIGHT = 550;

type SectionItem = {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
    picture: string | null;
    description: string;
};

const emptyForm = {
    name: "",
    slug: "",
    isActive: true,
    description: "",
};

const slugify = (input: string) =>
    input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function SectionsAdminPage() {
    const perm = useAdminPermission("sections");
    const [sections, setSections] = useState<SectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [slugTouched, setSlugTouched] = useState(false);
    const [pictureFile, setPictureFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [removePicture, setRemovePicture] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Cropper state
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const loadSections = async () => {
        setLoading(true);
        const res = await fetch("/api/sections");
        const data = await res.json();
        setSections(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    useEffect(() => {
        loadSections();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setSlugTouched(false);
        setPictureFile(null);
        setPreviewUrl(null);
        setRemovePicture(false);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (section: SectionItem) => {
        setEditingId(section.id);
        setForm({
            name: section.name,
            slug: section.slug,
            isActive: section.isActive,
            description: section.description,
        });
        setSlugTouched(true);
        setPictureFile(null);
        setPreviewUrl(section.picture);
        setRemovePicture(false);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleNameChange = (name: string) => {
        setForm((prev) => ({
            ...prev,
            name,
            slug: slugTouched ? prev.slug : slugify(name),
        }));
    };

    const handleFileSelect = (file: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
            setCropSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleCropConfirm = async () => {
        if (!cropSrc || !croppedAreaPixels) return;
        const blob = await getCroppedImageBlob(cropSrc, croppedAreaPixels, PICTURE_WIDTH, PICTURE_HEIGHT);
        const file = new File([blob], "section.jpg", { type: "image/jpeg" });
        setPictureFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setRemovePicture(false);
        setCropSrc(null);
    };

    const handleRemovePicture = () => {
        setPictureFile(null);
        setPreviewUrl(null);
        setRemovePicture(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const descriptionText = form.description.replace(/<[^>]*>/g, "").trim();
        if (!descriptionText) {
            setError("Description is required.");
            return;
        }

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("slug", form.slug);
        fd.append("isActive", String(form.isActive));
        fd.append("description", form.description);
        if (pictureFile) fd.append("picture", pictureFile);
        if (removePicture) fd.append("removePicture", "true");

        setSaving(true);
        const res = await fetch(editingId ? `/api/sections/${editingId}` : "/api/sections", {
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
        loadSections();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this page? This cannot be undone.")) return;
        await fetch(`/api/sections/${id}`, { method: "DELETE" });
        loadSections();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Page Builder</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Build standalone pages (ORIC, QEC, etc.) — each is published at yoursite.com/&#123;slug&#125;.
                    </p>
                </div>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Page
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
                                <th className="text-left px-4 py-3">Picture</th>
                                <th className="text-left px-4 py-3">Name</th>
                                <th className="text-left px-4 py-3">Slug</th>
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
                            {!loading && sections.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                        No pages yet.
                                    </td>
                                </tr>
                            )}
                            {sections.map((section) => (
                                <tr key={section.id}>
                                    <td className="px-4 py-3">
                                        <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100">
                                            {section.picture ? (
                                                <Image src={section.picture} alt={section.name} fill loader={({ src }) => src} className="object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-navy-900 max-w-xs truncate">{section.name}</td>
                                    <td className="px-4 py-3">
                                        <a
                                            href={`/${section.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-gray-500 hover:text-navy-900 font-mono text-xs transition-colors"
                                        >
                                            /{section.slug} <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                section.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {section.isActive ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {perm.edit && (
                                                <button
                                                    onClick={() => openEditForm(section)}
                                                    className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            )}
                                            {perm.delete && (
                                                <button
                                                    onClick={() => handleDelete(section.id)}
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
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Page" : "Add Page"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={300}
                                    value={form.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-gray-400 font-normal">(page will be published at /{form.slug || "..."})</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    maxLength={300}
                                    value={form.slug}
                                    onChange={(e) => {
                                        setSlugTouched(true);
                                        setForm({ ...form, slug: e.target.value });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Picture <span className="text-gray-400 font-normal">(optional — {PICTURE_WIDTH}×{PICTURE_HEIGHT}, JPG/PNG)</span>
                                </label>
                                {previewUrl && (
                                    <div className="relative w-full aspect-[1600/550] rounded-lg overflow-hidden bg-gray-100 mb-2">
                                        <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-cover" />
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                                        className="flex-1 text-sm"
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
                                <p className="text-xs text-gray-400 mt-1">
                                    If no picture is set, the page shows a plain header banner instead of a slider image.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <RichTextEditor
                                    value={form.description}
                                    onChange={(value) => setForm({ ...form, description: value })}
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

            {cropSrc && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">
                                Crop Image ({PICTURE_WIDTH}×{PICTURE_HEIGHT})
                            </h2>
                            <button onClick={() => setCropSrc(null)} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative w-full h-[400px] bg-gray-900">
                            <Cropper
                                image={cropSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={PICTURE_WIDTH / PICTURE_HEIGHT}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                            />
                        </div>

                        <div className="px-6 py-4 flex items-center gap-4">
                            <span className="text-sm text-gray-600 flex-shrink-0">Zoom</span>
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex justify-end gap-3 px-6 pb-5">
                            <button
                                type="button"
                                onClick={() => setCropSrc(null)}
                                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCropConfirm}
                                disabled={!croppedAreaPixels}
                                className="px-4 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
                            >
                                Apply Crop
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
