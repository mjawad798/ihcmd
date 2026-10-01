"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type HospitalItem = {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
    displayOrder: number;
};

const emptyForm = {
    name: "",
    isActive: true,
    displayOrder: 0,
};

export default function HospitalsAdminPage() {
    const perm = useAdminPermission("hospitals");
    const [hospitals, setHospitals] = useState<HospitalItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadHospitals = async () => {
        setLoading(true);
        const res = await fetch("/api/hospitals");
        const data = await res.json();
        setHospitals(data);
        setLoading(false);
    };

    useEffect(() => {
        loadHospitals();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setForm(emptyForm);
        setLogoFile(null);
        setPreviewUrl(null);
        setError("");
        setShowForm(true);
    };

    const openEditForm = (hospital: HospitalItem) => {
        setEditingId(hospital.id);
        setForm({
            name: hospital.name,
            isActive: hospital.isActive,
            displayOrder: hospital.displayOrder,
        });
        setLogoFile(null);
        setPreviewUrl(hospital.logo);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const handleFileSelect = (file: File | null) => {
        setLogoFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!editingId && !logoFile) {
            setError("Please select a logo image.");
            return;
        }

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("isActive", String(form.isActive));
        fd.append("displayOrder", String(form.displayOrder));
        if (logoFile) fd.append("logo", logoFile);

        setSaving(true);
        const res = await fetch(editingId ? `/api/hospitals/${editingId}` : "/api/hospitals", {
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
        loadHospitals();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this hospital? This cannot be undone.")) return;
        await fetch(`/api/hospitals/${id}`, { method: "DELETE" });
        loadHospitals();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Hospitals on Panel</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Hospital
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
                            <th className="text-left px-4 py-3">Logo</th>
                            <th className="text-left px-4 py-3">Name</th>
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
                        {!loading && hospitals.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                                    No hospitals yet.
                                </td>
                            </tr>
                        )}
                        {hospitals.map((hospital) => (
                            <tr key={hospital.id}>
                                <td className="px-4 py-3">
                                    <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
                                        <Image src={hospital.logo} alt={hospital.name} fill loader={({ src }) => src} className="object-contain" />
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-navy-900 max-w-xs truncate">{hospital.name}</td>
                                <td className="px-4 py-3">{hospital.displayOrder}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            hospital.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {hospital.isActive ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        {perm.edit && (
                                            <button
                                                onClick={() => openEditForm(hospital)}
                                                className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {perm.delete && (
                                            <button
                                                onClick={() => handleDelete(hospital.id)}
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
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Hospital" : "Add Hospital"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                                {previewUrl && (
                                    <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100 mb-2">
                                        <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-contain" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
                                    className="w-full text-sm"
                                />
                                {editingId && <p className="text-xs text-gray-400 mt-1">Leave empty to keep the current logo.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
