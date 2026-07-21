// Pure, dependency-free permission helpers safe to import from Client
// Components. Kept separate from permissions.ts, which pulls in @/auth
// (Sequelize/Node-only) and would otherwise get bundled into the browser.
import type { FormKey, PermissionAction, PermissionMap } from "@/lib/forms";
import { NO_PERMISSION } from "@/lib/forms";

export function getFormPermission(permissions: PermissionMap | undefined, formKey: FormKey) {
    return permissions?.[formKey] ?? NO_PERMISSION;
}

export function hasPermission(
    permissions: PermissionMap | undefined,
    formKey: FormKey,
    action: PermissionAction
): boolean {
    return getFormPermission(permissions, formKey)[action] === true;
}
