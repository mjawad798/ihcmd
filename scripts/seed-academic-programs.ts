import "dotenv/config";
import sequelize from "../lib/sequelize";
import AcademicProgram, { AcademicProgramType } from "../models/AcademicProgram";

const programs: { type: AcademicProgramType; name: string; description: string }[] = [
    // Undergraduate Programs
    {
        type: "Undergraduate Programs",
        name: "BS Nursing (BSN)",
        description:
            "A four-year undergraduate degree that builds clinical competence and compassionate patient care skills through hospital-based training at IRM Hospital alongside a rigorous academic curriculum.",
    },
    {
        type: "Undergraduate Programs",
        name: "BS Anesthesia Technology",
        description:
            "Prepares students to assist anesthesiologists in surgical settings, covering anesthesia equipment, patient monitoring, and perioperative care through hands-on operation theatre training.",
    },
    {
        type: "Undergraduate Programs",
        name: "BS Radiology & Imaging",
        description:
            "Trains students in diagnostic imaging techniques including X-ray, CT, and MRI, combining radiologic science theory with supervised practical experience in hospital imaging departments.",
    },
    {
        type: "Undergraduate Programs",
        name: "BS Health Economics",
        description:
            "Explores the economics of healthcare systems, resource allocation, and health policy, equipping graduates to support data-driven decision-making in hospitals and health institutions.",
    },
    {
        type: "Undergraduate Programs",
        name: "BS Public Health",
        description:
            "Focuses on community health, disease prevention, and health promotion strategies, preparing graduates to design and manage public health programs at the community and institutional level.",
    },

    // Postgraduate Diplomas
    {
        type: "Postgraduate Diplomas",
        name: "PGD in Ultrasound",
        description:
            "An advanced diploma covering diagnostic ultrasound techniques and image interpretation, designed for healthcare professionals seeking specialization in sonography.",
    },
    {
        type: "Postgraduate Diplomas",
        name: "PGD in CSSD",
        description:
            "Provides specialized training in Central Sterile Services Department operations, covering sterilization protocols, infection control, and instrument management for hospital settings.",
    },
    {
        type: "Postgraduate Diplomas",
        name: "PGD in Health Care Management",
        description:
            "Builds leadership and administrative skills for managing hospitals and healthcare facilities, covering operations, quality management, and healthcare policy.",
    },
    {
        type: "Postgraduate Diplomas",
        name: "PGD in Respiratory Therapy",
        description:
            "Prepares practitioners to manage patients with breathing disorders through specialized training in ventilator management, pulmonary diagnostics, and critical care support.",
    },
    {
        type: "Postgraduate Diplomas",
        name: "PGD in Disaster Management",
        description:
            "Equips healthcare professionals with skills in emergency preparedness, disaster response coordination, and public health crisis management.",
    },

    // Certificate Programs
    {
        type: "Certificate Programs",
        name: "Health Profession Education",
        description:
            "A short certificate course designed to strengthen teaching and curriculum development skills for healthcare educators and clinical instructors.",
    },
    {
        type: "Certificate Programs",
        name: "Health Research (CHR)",
        description:
            "Introduces the fundamentals of health research methodology, biostatistics, and evidence-based practice for healthcare professionals and researchers.",
    },
    {
        type: "Certificate Programs",
        name: "Infection Prevention (IPC)",
        description:
            "Covers infection prevention and control principles essential for reducing hospital-acquired infections and maintaining safe clinical environments.",
    },
    {
        type: "Certificate Programs",
        name: "Pharmacovigilance",
        description:
            "Trains participants in monitoring drug safety, adverse event reporting, and risk management practices within clinical and pharmaceutical settings.",
    },
    {
        type: "Certificate Programs",
        name: "Operation Theatre Management",
        description:
            "Focuses on the efficient management of operation theatre workflows, sterilization standards, and surgical team coordination.",
    },

    // F.Sc Medical Technologies
    {
        type: "F.Sc Medical Technologies",
        name: "Dispensing Technology",
        description:
            "A technical program covering pharmaceutical dispensing practices, medication safety, and pharmacy support skills for entry-level healthcare roles.",
    },
    {
        type: "F.Sc Medical Technologies",
        name: "Medical Lab Technology",
        description:
            "Trains students in laboratory diagnostic techniques, sample analysis, and equipment handling required for clinical and pathology laboratories.",
    },
    {
        type: "F.Sc Medical Technologies",
        name: "Operation Theatre Technology",
        description:
            "Provides foundational training in operation theatre procedures, surgical instrument handling, and sterile technique for aspiring OT technicians.",
    },
    {
        type: "F.Sc Medical Technologies",
        name: "Physiotherapy Technology",
        description:
            "Introduces students to physical rehabilitation techniques and therapeutic exercise support, preparing them to assist physiotherapists in patient recovery.",
    },
    {
        type: "F.Sc Medical Technologies",
        name: "Cardiology & Radiology",
        description:
            "Combines foundational training in cardiac diagnostic procedures and radiologic imaging support for entry-level roles in cardiology and radiology departments.",
    },
];

async function run() {
    await sequelize.authenticate();

    const count = await AcademicProgram.count();
    if (count > 0) {
        console.log("Academic programs already seeded, skipping.");
        await sequelize.close();
        return;
    }

    await AcademicProgram.bulkCreate(programs);
    console.log(`Seeded ${programs.length} academic programs.`);

    await sequelize.close();
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
