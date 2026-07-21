import "dotenv/config";
import sequelize from "../lib/sequelize";
import Role from "../models/Role";
import Permission from "../models/Permission";
import "../models/Permission"; // registers associations
import { FORM_KEYS } from "../lib/forms";

// Run after adding a new key to FORM_KEYS (lib/forms.ts) — existing roles
// have no permission row for it yet, which reads as "no access" everywhere.
// "Super Admin" gets full access to match its existing rows on every other
// form; any other role is backfilled with no access (least privilege),
// left for an admin to grant explicitly via /admin/roles.
async function run() {
    await sequelize.authenticate();

    const roles = await Role.findAll({ include: [{ model: Permission, as: "permissions" }] });

    for (const role of roles) {
        const existing = new Set((role.get("permissions") as Permission[] | undefined)?.map((p) => p.formName));
        const missing = FORM_KEYS.filter((key) => !existing.has(key));
        if (missing.length === 0) continue;

        const grantFull = role.name === "Super Admin";
        await Permission.bulkCreate(
            missing.map((formName) => ({
                roleId: role.id,
                formName,
                canAdd: grantFull,
                canView: grantFull,
                canEdit: grantFull,
                canDelete: grantFull,
            }))
        );
        console.log(`Role "${role.name}": backfilled [${missing.join(", ")}] (${grantFull ? "full access" : "no access"}).`);
    }

    await sequelize.close();
}

run().catch((err) => {
    console.error("Backfill failed:", err);
    process.exit(1);
});
