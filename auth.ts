import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import User from "@/models/User";
import Role from "@/models/Role";
import Permission from "@/models/Permission";
import type { PermissionMap, FormKey } from "@/lib/forms";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const username = credentials?.username as string | undefined;
                const password = credentials?.password as string | undefined;
                if (!username || !password) return null;

                const user = await User.findOne({ where: { username } });
                if (!user || !user.isActive) return null;

                const valid = await bcrypt.compare(password, user.password);
                if (!valid) return null;

                return { id: String(user.id), name: user.username, roleId: user.roleId };
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user }) {
            // On sign-in `user` is populated by authorize(); on every other
            // request we re-derive role/permissions/active-status fresh
            // from the DB, so permission or role changes — and an admin
            // deactivating a user — take effect immediately without
            // requiring that user to log out and back in.
            const userId = user ? Number(user.id) : token.id ? Number(token.id) : null;
            if (!userId) return token;

            const dbUser = await User.findByPk(userId, {
                include: [{ model: Role, as: "role", include: [{ model: Permission, as: "permissions" }] }],
            });

            if (!dbUser || !dbUser.isActive) {
                token.isActive = false;
                return token;
            }

            const role = dbUser.get("role") as (Role & { permissions?: Permission[] }) | null;
            const permissions: PermissionMap = {};
            (role?.permissions ?? []).forEach((p) => {
                permissions[p.formName as FormKey] = {
                    add: p.canAdd,
                    view: p.canView,
                    edit: p.canEdit,
                    delete: p.canDelete,
                };
            });

            token.id = String(dbUser.id);
            token.name = dbUser.username;
            token.roleId = dbUser.roleId;
            token.roleName = role?.name ?? null;
            token.isActive = true;
            token.permissions = permissions;
            return token;
        },
        async session({ session, token }) {
            session.user.id = (token.id as string) ?? "";
            session.user.name = (token.name as string) ?? "";
            session.user.roleId = (token.roleId as number) ?? 0;
            session.user.roleName = (token.roleName as string | null) ?? null;
            session.user.isActive = token.isActive !== false;
            session.user.permissions = (token.permissions as PermissionMap) ?? {};
            return session;
        },
    },
});
