import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { FormKey, PermissionAction } from "@/lib/forms";
import { hasPermission } from "@/lib/permissions.client";

export { getFormPermission, hasPermission } from "@/lib/permissions.client";

/**
 * Server-side guard for API routes. Call at the top of every mutating (and
 * view-only, where the data isn't otherwise public) handler. Returns the
 * active session on success, or a ready-to-return 401/403 NextResponse.
 * This is the backend half of permission enforcement — the frontend hiding
 * buttons is a UX nicety, not a security boundary, so every admin API
 * route must call this regardless of what the UI already checked.
 */
export async function requireApiPermission(formKey: FormKey, action: PermissionAction) {
    const session = await auth();

    if (!session?.user || session.user.isActive === false) {
        return {
            session: null,
            error: NextResponse.json({ error: "Not authenticated." }, { status: 401 }),
        } as const;
    }

    if (!hasPermission(session.user.permissions, formKey, action)) {
        return {
            session: null,
            error: NextResponse.json({ error: "You do not have permission to perform this action." }, { status: 403 }),
        } as const;
    }

    return { session, error: null } as const;
}
