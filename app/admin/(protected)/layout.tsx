import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSessionProvider from "@/components/admin/AdminSessionProvider";
import AdminShell from "@/components/admin/AdminShell";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // Defense in depth: middleware already redirects unauthenticated/
    // deactivated users before this ever renders, but this layout doesn't
    // rely on that alone.
    if (!session?.user || session.user.isActive === false) {
        redirect("/admin/login");
    }

    return (
        <AdminSessionProvider session={session}>
            <AdminShell>{children}</AdminShell>
        </AdminSessionProvider>
    );
}
