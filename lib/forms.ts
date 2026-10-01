// Central registry of every admin-managed "form" (resource). Permissions
// are granted per role, per form, per action (add/view/edit/delete) — this
// list drives the role/permission admin UI, the permission-check helpers,
// and keeps every place that references a form key in sync.
export const FORMS = [
    { key: "slider", label: "Slider" },
    { key: "achievements", label: "Achievements" },
    { key: "affiliations", label: "Affiliations" },
    { key: "footer", label: "Footer" },
    { key: "verification-master", label: "Document Verification — Master" },
    { key: "verification-detail", label: "Document Verification — Details" },
    { key: "sections", label: "Page Builder (Sections)" },
    { key: "navbar", label: "Navbar" },
    { key: "about", label: "About Page" },
    { key: "academic-programs", label: "Academic Programs" },
    { key: "teaching-faculty", label: "Teaching Faculty" },
    { key: "teaching-faculty-details", label: "Teaching Faculty Details" },
    { key: "hospitals", label: "Hospitals on Panel" },
    { key: "news", label: "News" },
    { key: "gallery", label: "Gallery" },
    { key: "flash-news", label: "Flash News" },
    { key: "downloads", label: "Downloads" },
    { key: "admission-sessions", label: "Admission Sessions" },
    { key: "admissions", label: "Admission Applications" },
    { key: "users", label: "Users" },
    { key: "roles", label: "Roles & Permissions" },
] as const;

export type FormKey = (typeof FORMS)[number]["key"];
export const FORM_KEYS = FORMS.map((f) => f.key) as FormKey[];

export type PermissionAction = "add" | "view" | "edit" | "delete";
export const PERMISSION_ACTIONS: PermissionAction[] = ["add", "view", "edit", "delete"];

export type FormPermission = { add: boolean; view: boolean; edit: boolean; delete: boolean };
export type PermissionMap = Partial<Record<FormKey, FormPermission>>;

export const NO_PERMISSION: FormPermission = { add: false, view: false, edit: false, delete: false };
