import "dotenv/config";
import sequelize from "../lib/sequelize";
import "../models/Slider";
import "../models/NavItem";
import "../models/AcademicProgram";
import "../models/TeachingFaculty";
import "../models/TeachingFacultyDetail";
import "../models/Hospital";
import "../models/News";
import "../models/Gallery";
import "../models/About";
import "../models/FlashNews";
import "../models/Download";
import "../models/Role";
import "../models/Permission";
import "../models/User";
import "../models/Achievement";
import "../models/Affiliation";
import "../models/FooterSetting";
import "../models/VerificationMaster";
import "../models/VerificationDetail";
import "../models/Section";
import "../models/AdmissionSession";
import "../models/AdmissionApplication";

async function run() {
    await sequelize.authenticate();
    console.log("Database connection OK.");

    await sequelize.sync({ alter: true });
    console.log("Tables synced: sliders, nav_items, academic_programs, teaching_faculty, teaching_faculty_details, hospitals, news, gallery, about, flash_news, downloads, roles, permissions, users, achievements, affiliations, footer_settings, verification_master, verification_detail, sections, admission_sessions, admission_applications, admission_application_qualifications");

    await sequelize.close();
}

run().catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
});
