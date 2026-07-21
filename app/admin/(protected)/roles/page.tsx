"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdminPermission } from "@/lib/useAdminPermission";
import { FORMS, FORM_KEYS, PERMISSION_ACTIONS, type FormKey, type PermissionAction } from "@/lib/forms";

type PermissionMatrix = Record<FormKey, { add: boolean; view: boolean; edit: boolean; delete: boolean }>;

type RolePermissionRow = {
    formName: FormKey;
    canAdd: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
};

type RoleItem = {
    id: number;
    name: string;
    permissions?: RolePermissionRow[];
};

const emptyMatrix = (): PermissionMatrix =>
    Object.fromEntries(FORM_KEYS.map((key) => [key, { add: false, view: false, edit: false, delete: false }])) as PermissionMatrix;

const actionLabels: Record<PermissionAction, string> = { add: "Add", view: "View", edit: "Edit", delete: "Delete" };

export default function RolesAdminPage() {
    const perm = useAdminPermission("roles");
    const [roles, setRoles] = useState<RoleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [matrix, setMatrix] = useState<PermissionMatrix>(emptyMatrix());
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadRoles = async () => {
        setLoading(true);
        const res = await fetch("/api/roles");
        const data = await res.json();
        setRoles(Array.isArray(data) ? data : []);
        setLoading(false);
    };

    useEffect(() => {
        loadRoles();
    }, []);

    const openCreateForm = () => {
        setEditingId(null);
        setName("");
        setMatrix(emptyMatrix());
        setError("");
        setShowForm(true);
    };

    const openEditForm = (role: RoleItem) => {
        setEditingId(role.id);
        setName(role.name);
        const next = emptyMatrix();
        for (const row of role.permissions ?? []) {
            next[row.formName] = { add: row.canAdd, view: row.canView, edit: row.canEdit, delete: row.canDelete };
        }
        setMatrix(next);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    const toggle = (formKey: FormKey, action: PermissionAction) => {
        setMatrix((prev) => ({
            ...prev,
            [formKey]: { ...prev[formKey], [action]: !prev[formKey][action] },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Role name is required.");
            return;
        }

        setSaving(true);
        const res = await fetch(editingId ? `/api/roles/${editingId}` : "/api/roles", {
            method: editingId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, permissions: matrix }),
        });
        setSaving(false);

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Something went wrong.");
            return;
        }

        setShowForm(false);
        loadRoles();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this role? Users assigned to it will be affected. This cannot be undone.")) return;
        await fetch(`/api/roles/${id}`, { method: "DELETE" });
        loadRoles();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy-900">Roles &amp; Permissions</h1>
                {perm.add && (
                    <button
                        onClick={openCreateForm}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Role
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
                                <th className="text-left px-4 py-3">Role</th>
                                <th className="text-right px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-6 text-center text-gray-400">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {!loading && roles.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-4 py-6 text-center text-gray-400">
                                        No roles yet.
                                    </td>
                                </tr>
                            )}
                            {roles.map((role) => (
                                <tr key={role.id}>
                                    <td className="px-4 py-3 font-medium text-navy-900">{role.name}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {perm.edit && (
                                                <button
                                                    onClick={() => openEditForm(role)}
                                                    className="p-2 text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            )}
                                            {perm.delete && (
                                                <button
                                                    onClick={() => handleDelete(role.id)}
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="font-bold text-navy-900">{editingId ? "Edit Role" : "Add Role"}</h2>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                            <tr>
                                                <th className="text-left px-4 py-2">Form</th>
                                                {PERMISSION_ACTIONS.map((action) => (
                                                    <th key={action} className="text-center px-4 py-2">
                                                        {actionLabels[action]}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {FORMS.map((f) => (
                                                <tr key={f.key}>
                                                    <td className="px-4 py-2 text-navy-900">{f.label}</td>
                                                    {PERMISSION_ACTIONS.map((action) => (
                                                        <td key={action} className="text-center px-4 py-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={matrix[f.key][action]}
                                                                onChange={() => toggle(f.key, action)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
