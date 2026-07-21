import "dotenv/config";
import bcrypt from "bcryptjs";
import sequelize from "../lib/sequelize";
import Role from "../models/Role";
import Permission from "../models/Permission";
import User from "../models/User";
import "../models/Permission"; // registers associations
import { FORM_KEYS } from "../lib/forms";

const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

async function run() {
    await sequelize.authenticate();

    let role = await Role.findOne({ where: { name: "Super Admin" } });
    if (!role) {
        role = await Role.create({ name: "Super Admin" });
        await Permission.bulkCreate(
            FORM_KEYS.map((formName) => ({
                roleId: role!.id,
                formName,
                canAdd: true,
                canView: true,
                canEdit: true,
                canDelete: true,
            }))
        );
        console.log("Created 'Super Admin' role with full permissions on every form.");
    } else {
        console.log("'Super Admin' role already exists, skipping.");
    }

    const existingUser = await User.findOne({ where: { username: ADMIN_USERNAME } });
    if (existingUser) {
        console.log(`User "${ADMIN_USERNAME}" already exists, skipping.`);
    } else {
        const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await User.create({
            username: ADMIN_USERNAME,
            password: hash,
            roleId: role.id,
            isActive: true,
        });
        console.log(`Created admin user "${ADMIN_USERNAME}" with role "Super Admin".`);
        console.log(`Password: ${ADMIN_PASSWORD} (change this after first login, or set SEED_ADMIN_PASSWORD before seeding)`);
    }

    await sequelize.close();
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
