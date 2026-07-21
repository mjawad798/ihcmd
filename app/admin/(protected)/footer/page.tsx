"use client";
import { useEffect, useState } from "react";
import { useAdminPermission } from "@/lib/useAdminPermission";

type FooterSettings = {
    description: string;
    facebookUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
    phone: string;
    email: string;
    address: string;
    mapUrl: string | null;
    developerName: string | null;
    developerEmail: string | null;
    copyrightText: string;
};

const emptyForm: FooterSettings = {
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
    phone: "",
    email: "",
    address: "",
    mapUrl: "",
    developerName: "",
    developerEmail: "",
    copyrightText: "",
};

export default function FooterAdminPage() {
    const perm = useAdminPermission("footer");
    const [form, setForm] = useState<FooterSettings>(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!perm.view) {
            setLoading(false);
            return;
        }
        (async () => {
            setLoading(true);
            const res = await fetch("/api/footer");
            if (res.ok) {
                const data = await res.json();
                setForm({
                    description: data.description ?? "",
                    facebookUrl: data.facebookUrl ?? "",
                    instagramUrl: data.instagramUrl ?? "",
                    tiktokUrl: data.tiktokUrl ?? "",
                    phone: data.phone ?? "",
                    email: data.email ?? "",
                    address: data.address ?? "",
                    mapUrl: data.mapUrl ?? "",
                    developerName: data.developerName ?? "",
                    developerEmail: data.developerEmail ?? "",
                    copyrightText: data.copyrightText ?? "",
                });
            }
            setLoading(false);
        })();
    }, [perm.view]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        setSaving(true);
        const res = await fetch("/api/footer", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setSaving(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Something went wrong.");
            return;
        }

        setSuccess(true);
    };

    const field = (key: keyof FooterSettings, value: string) => setForm({ ...form, [key]: value });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Footer</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Controls the description, social links, contact info, and credits shown in the site footer.
                </p>
            </div>

            {!perm.view ? (
                <p className="text-center text-gray-400 py-10">You do not have permission to view this page.</p>
            ) : loading ? (
                <p className="text-center text-gray-400 py-10">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl space-y-6">
                    {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
                    {success && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">Footer settings saved.</p>}

                    <div>
                        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-3">Company Description</h2>
                        <textarea
                            rows={5}
                            required
                            disabled={!perm.edit}
                            value={form.description}
                            onChange={(e) => field("description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-3">Social Links</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                <input
                                    type="url"
                                    disabled={!perm.edit}
                                    value={form.facebookUrl ?? ""}
                                    onChange={(e) => field("facebookUrl", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                                <input
                                    type="url"
                                    disabled={!perm.edit}
                                    value={form.instagramUrl ?? ""}
                                    onChange={(e) => field("instagramUrl", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
                                <input
                                    type="url"
                                    disabled={!perm.edit}
                                    value={form.tiktokUrl ?? ""}
                                    onChange={(e) => field("tiktokUrl", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Leave a URL blank to hide that icon in the footer.</p>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-3">Contact Info</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    required
                                    disabled={!perm.edit}
                                    value={form.phone}
                                    onChange={(e) => field("phone", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    disabled={!perm.edit}
                                    value={form.email}
                                    onChange={(e) => field("email", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                rows={2}
                                required
                                disabled={!perm.edit}
                                value={form.address}
                                onChange={(e) => field("address", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Map URL <span className="text-gray-400 font-normal">(Google Maps link, optional)</span>
                            </label>
                            <input
                                type="url"
                                disabled={!perm.edit}
                                value={form.mapUrl ?? ""}
                                onChange={(e) => field("mapUrl", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide mb-3">Bottom Bar</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Developer Name</label>
                                <input
                                    type="text"
                                    disabled={!perm.edit}
                                    value={form.developerName ?? ""}
                                    onChange={(e) => field("developerName", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Developer Email</label>
                                <input
                                    type="email"
                                    disabled={!perm.edit}
                                    value={form.developerEmail ?? ""}
                                    onChange={(e) => field("developerEmail", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Copyright Text <span className="text-gray-400 font-normal">(shown after © {new Date().getFullYear()})</span>
                            </label>
                            <input
                                type="text"
                                required
                                disabled={!perm.edit}
                                value={form.copyrightText}
                                onChange={(e) => field("copyrightText", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
                            />
                        </div>
                    </div>

                    {perm.edit && (
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-5 py-2 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}
