"use client";
import { useSession } from "next-auth/react";
import type { FormKey } from "@/lib/forms";
import { getFormPermission } from "@/lib/permissions.client";


// Client-side counterpart to requireApiPermission — drives which
// Add/Edit/Delete controls a page shows. This is UX only: the actual
// security boundary is the server-side check in each API route, since
// hiding a button here doesn't stop a direct API call.
export function useAdminPermission(formKey: FormKey) {
    const { data: session } = useSession();
    return getFormPermission(session?.user?.permissions, formKey);
}
