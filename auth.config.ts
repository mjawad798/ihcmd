import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Sequelize/DB imports here, since middleware runs on
// the Edge runtime which can't load Node-only modules like mysql2. This
// only decodes/validates the JWT cookie. The full config (auth.ts) adds
// the Credentials provider and DB-backed jwt() callback, and is used by
// route handlers and Server Components instead, where fresh
// permission/role/active-status data actually gets loaded.
export const authConfig = {
    trustHost: true,
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const isActive = auth?.user?.isActive !== false;
            const onLoginPage = request.nextUrl.pathname === "/admin/login";

            if (onLoginPage) return true;
            return isLoggedIn && isActive;
        },
    },
} satisfies NextAuthConfig;
