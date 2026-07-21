import type { PermissionMap } from "@/lib/forms";

declare module "next-auth" {
    interface User {
        id: string;
        roleId: number;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            roleId: number;
            roleName: string | null;
            isActive: boolean;
            permissions: PermissionMap;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        roleId?: number;
        roleName?: string | null;
        isActive?: boolean;
        permissions?: PermissionMap;
    }
}
