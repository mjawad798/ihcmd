import { NextRequest, NextResponse } from "next/server";
import FooterSetting, { FOOTER_SETTINGS_ID } from "@/models/FooterSetting";
import { requireApiPermission } from "@/lib/permissions";
import { FOOTER_DEFAULTS } from "@/lib/footerDefaults";

// Singleton resource: one row (id fixed at FOOTER_SETTINGS_ID), created on
// first access with the site's previous hardcoded values as defaults.
export async function GET() {
    const { error } = await requireApiPermission("footer", "view");
    if (error) return error;

    const [settings] = await FooterSetting.findOrCreate({
        where: { id: FOOTER_SETTINGS_ID },
        defaults: { id: FOOTER_SETTINGS_ID, ...FOOTER_DEFAULTS },
    });

    return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
    const { error } = await requireApiPermission("footer", "edit");
    if (error) return error;

    const body = await request.json();
    const { description, facebookUrl, instagramUrl, tiktokUrl, phone, email, address, mapUrl, developerName, developerEmail, copyrightText } =
        body;

    if (!description || !phone || !email || !address || !copyrightText) {
        return NextResponse.json(
            { error: "Description, phone, email, address and copyright text are required." },
            { status: 400 }
        );
    }

    const [settings] = await FooterSetting.findOrCreate({
        where: { id: FOOTER_SETTINGS_ID },
        defaults: { id: FOOTER_SETTINGS_ID, ...FOOTER_DEFAULTS },
    });

    await settings.update({
        description,
        facebookUrl: facebookUrl || null,
        instagramUrl: instagramUrl || null,
        tiktokUrl: tiktokUrl || null,
        phone,
        email,
        address,
        mapUrl: mapUrl || null,
        developerName: developerName || null,
        developerEmail: developerEmail || null,
        copyrightText,
    });

    return NextResponse.json(settings);
}
