import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Edge-compatible: only decodes/validates the session cookie via the
// lightweight config (no DB access). This is the first gate — a fast
// reject for anyone with no/expired/deactivated session. The authoritative,
// DB-fresh permission checks happen per-form in the actual page and API
// route handlers via the full config in auth.ts.
const { auth } = NextAuth(authConfig);

export default auth(() => {});

export const config = {
    matcher: ["/admin/:path*"],
};
