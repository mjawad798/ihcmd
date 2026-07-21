"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, ListTree, UserRound } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type FacultyItem = {
    id: number;
    title: string;
    slug: string;
    name: string;
    designation: string;
    qualification: string;
    researchInterest: string;
    picture: string | null;
    email: string | null;
    linkedIn: string | null;
    researchGate: string | null;
    details?: { id: number }[];
};

const emptyForm = {
    title: "",
    slug: "",
    name: "",
    designation: "",
    qualification: "",
    researchInterest: "",
    email: "",
    linkedIn: "",
    researchGate: "",
};

const slugify = (input: string) =>
    input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function TeachingFacultyAdminPage() {
    const perm = useAdminPermission("teaching-faculty");
    const [faculty, setFaculty] = useState<FacultyItem[]>([]);
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

    const loadFaculty = async () => {
        setLoading(true);
        const res = await fetch("/api/teaching-faculty");
        const data = await res.json();
        setFaculty(data);
        setLoading(false);
    };

    useEffect(() => {
        loadFaculty();
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

    const openEditForm = (member: FacultyItem) => {
        setEditingId(member.id);
        setForm({
            title: member.title,
            slug: member.slug,
            name: member.name,
            designation: member.designation,
            qualification: member.qualification,
            researchInterest: member.researchInterest,
            email: member.email ?? "",
            linkedIn: member.linkedIn ?? "",
            researchGate: member.researchGate ?? "",
        });
        setSlugTouched(true);
        setPictureFile(null);
        setPreviewUrl(member.picture);
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

    const handlePictureSelect = (file: File | null) => {
        setPictureFile(file);
        setRemovePicture(false);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemovePicture = () => {
        setPictureFile(null);
        setPreviewUrl(null);
        setRemovePicture(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const fd = new FormData();
        Object.entries(form).forEach(([key, value]) => fd.append(key, value));
        if (pictureFile) fd.append("picture", pictureFile);
        if (removePicture) fd.append("removePicture", "true");

        setSaving(true);
        const res = await fetch(editingId ? `/api/teaching-faculty/${editingId}` : "/api/teaching-faculty", {
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
        loadFaculty();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this faculty member? Their detail sections will be deleted too.")) return;
        await fetch(`/api/teaching-faculty/${id}`, { method: "DELETE" });
        loadFaculty();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Teaching Faculty</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Faculty Member
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
                            <th className="text-left px-4 py-3">Designation</th>
                            <th className="text-left px-4 py-3">Slug</th>
                            <th className="text-left px-4 py-3">Details</th>
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
                        {!loading && faculty.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                    No faculty members yet.
                                </td>
                            </tr>
                        )}
                        {faculty.map((member) => (
                            <tr key={member.id}>
                                <td className="px-4 py-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                        {member.picture ? (
                                            <Image src={member.picture} alt={member.name} fill loader={({ src }) => src} className="object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                <UserRound className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-navy-900">
                                    {member.title} {member.name}
                                </td>
                                <td className="px-4 py-3 text-gray-600">{member.designation}</td>
                                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{member.slug}</td>
                                <td className="px-4 py-3 text-gray-600">{member.details?.length ?? 0}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/teaching-faculty/${member.id}/details`}
                                            className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                            title="Manage details"
                                        >
                                            <ListTree className="w-4 h-4" />
                                        </Link>
                                        {perm.edit && (
                                            <button
                                                onClick={() => openEditForm(member)}
                                                className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        )}
                                        {perm.delete && (
                                            <button
                                                onClick={() => handleDelete(member.id)}
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Faculty Member" : "Add Faculty Member"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Picture <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                        {previewUrl ? (
                                            <Image src={previewUrl} alt="Preview" fill loader={({ src }) => src} className="object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                <UserRound className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handlePictureSelect(e.target.files?.[0] ?? null)}
                                            className="w-full text-sm"
                                        />
                                        {previewUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemovePicture}
                                                className="text-xs text-red-600 hover:underline mt-1"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-gray-400 font-normal">(max 10 chars)</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={10}
                                        placeholder="Dr., Prof., Mr."
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug <span className="text-gray-400 font-normal">(used in the profile URL, must be unique)</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.slug}
                                    onChange={(e) => {
                                        setSlugTouched(true);
                                        setForm({ ...form, slug: e.target.value });
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.designation}
                                        onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.qualification}
                                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Research Interest</label>
                                <textarea
                                    rows={2}
                                    required
                                    maxLength={300}
                                    value={form.researchInterest}
                                    onChange={(e) => setForm({ ...form, researchInterest: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={form.linkedIn}
                                        onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ResearchGate <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={form.researchGate}
                                        onChange={(e) => setForm({ ...form, researchGate: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                    />
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
