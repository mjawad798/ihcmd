import { createHmac, timingSafeEqual } from "crypto";

// Download token for the application PDF: proves the caller just submitted the
// application (or holds the token), without putting the CNIC in a URL.
export function applicationToken(applicationNo: string): string {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET is not configured.");
    return createHmac("sha256", secret).update(`admission:${applicationNo}`).digest("hex").slice(0, 32);
}

export function isValidApplicationToken(applicationNo: string, token: string): boolean {
    const expected = Buffer.from(applicationToken(applicationNo));
    const given = Buffer.from(token);
    return expected.length === given.length && timingSafeEqual(expected, given);
}
