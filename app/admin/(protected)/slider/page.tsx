"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { getCroppedImageBlob } from "@/lib/cropImage";
import { useAdminPermission } from "@/lib/useAdminPermission";

const SLIDE_WIDTH = 1600;
const SLIDE_HEIGHT = 550;

type SliderItem = {
    id: number;
    image: string;
    heading: string;
    description: string | null;
    isActive: boolean;
    displayOrder: number;
};

const emptyForm = {
    heading: "",
    description: "",
    isActive: true,
    displayOrder: 0,
};

export default function SliderAdminPage() {
    const perm = useAdminPermission("slider");
    const [sliders, setSliders] = useState<SliderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Cropper state
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const loadSliders = async () => {
        setLoading(true);
        const res = await fetch("/api/slider");
        const data = await res.json();
        setSliders(data);
        setLoading(false);
    };

    useEffect(() => {
        loadSliders();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setImageFile(null);
        setPreviewUrl(null);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (slider: SliderItem) => {
        setEditingId(slider.id);
        setForm({
            heading: slider.heading,
            description: slider.description ?? "",
            isActive: slider.isActive,
            displayOrder: slider.displayOrder,
        });
        setImageFile(null);
        setPreviewUrl(slider.image);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

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
        const blob = await getCroppedImageBlob(cropSrc, croppedAreaPixels, SLIDE_WIDTH, SLIDE_HEIGHT);
        const file = new File([blob], "slide.jpg", { type: "image/jpeg" });
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setCropSrc(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!editingId && !imageFile) {
            setError("Please select an image.");
            return;
        }

        const fd = new FormData();
        fd.append("heading", form.heading);
        fd.append("description", form.description);
        fd.append("isActive", String(form.isActive));
        fd.append("displayOrder", String(form.displayOrder));
        if (imageFile) fd.append("image", imageFile);

        setSaving(true);
        const res = await fetch(editingId ? `/api/slider/${editingId}` : "/api/slider", {
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
        loadSliders();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this slider image? This cannot be undone.")) return;
        await fetch(`/api/slider/${id}`, { method: "DELETE" });
        loadSliders();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Slider</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Slide
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
                            <th className="text-left px-4 py-3">Image</th>
                            <th className="text-left px-4 py-3">Heading</th>
                            <th className="text-left px-4 py-3">Order</th>
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
                        {!loading && sliders.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    No slider images yet.
                                </td>
                            </tr>
                        )}
                        {sliders.map((slider) => (
                            <tr key={slider.id}>
                                <td className="px-4 py-3">
                                    <div className="relative w-20 h-12 rounded overflow-hidden bg-gray-100">
                                        <Image src={slider.image} alt={slider.heading} fill loader={({ src }) => src} className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-navy-900 max-w-xs truncate">{slider.heading}</td>
                                <td className="px-4 py-3">{slider.displayOrder}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            slider.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {slider.isActive ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        {perm.edit && (
                                            <button
                                                onClick={() => openEditForm(slider)}
                                                className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {perm.delete && (
                                            <button
                                                onClick={() => handleDelete(slider.id)}
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
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Slide" : "Add Slide"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image <span className="text-gray-400 font-normal">({SLIDE_WIDTH}×{SLIDE_HEIGHT})</span>
                                </label>
                                {previewUrl && (
                                    <div className="relative w-full aspect-[1600/550] rounded-lg overflow-hidden bg-gray-100 mb-2">
                                        <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                                    className="w-full text-sm"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    {editingId
                                        ? "Selecting a new image will let you crop it to the slider's aspect ratio; leave empty to keep the current image."
                                        : `You'll be able to crop the image to ${SLIDE_WIDTH}×${SLIDE_HEIGHT} after selecting it.`}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                <input
                                    type="text"
                                    required
                                    value={form.heading}
                                    onChange={(e) => setForm({ ...form, heading: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
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

            {cropSrc && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">
                                Crop Image ({SLIDE_WIDTH}×{SLIDE_HEIGHT})
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
                                aspect={SLIDE_WIDTH / SLIDE_HEIGHT}
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
