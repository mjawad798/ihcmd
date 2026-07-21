import "dotenv/config";
import sequelize from "../lib/sequelize";
import About from "../models/About";

async function run() {
    await sequelize.authenticate();

    const count = await About.count();
    if (count > 0) {
        console.log("About table already seeded, skipping.");
        await sequelize.close();
        return;
    }

    await About.bulkCreate([
        {
            type: "hero",
            title: "Institute of Health Care Management and Development",
            subtitle: "Empowering Healthcare Professionals Since 2019",
            description: null,
            picture: null,
            displayOrder: 1,
            isActive: true,
        },
        {
            type: "content",
            title: "Our Mission",
            subtitle: null,
            description:
                "<p>Established in 2019 with the support of Health Services Academy (HSA), a Degree Awarding Institute under the Ministry of Health, <strong>IHCMD</strong> is dedicated to enhancing healthcare management and public health education in Pakistan. As a postgraduate training institution, we conduct operational and health research, focusing on developing models to improve health sector services in Khyber Pakhtunkhwa (KP).</p>",
            picture: "/irmHospital.jpg",
            displayOrder: 1,
            isActive: true,
        },
        {
            type: "content",
            title: "Expanding Opportunities",
            subtitle: null,
            description:
                "<p>With campuses in <strong>Mardan</strong> and <strong>Islamabad</strong>, our Islamabad campus, powered by IRM Hospital, offers degree programs in BS Nursing and BS Allied Health Sciences. Our courses are essential for Continued Professional Development (CPD), empowering students and professionals with subsidized, accessible training opportunities.</p>",
            picture: null,
            displayOrder: 2,
            isActive: true,
        },
        { type: "stat", title: "2019", subtitle: "Established Year", description: null, picture: null, displayOrder: 1, isActive: true },
        { type: "stat", title: "2", subtitle: "Campuses", description: null, picture: null, displayOrder: 2, isActive: true },
        { type: "stat", title: "50+", subtitle: "Courses Offered", description: null, picture: null, displayOrder: 3, isActive: true },
        { type: "stat", title: "Thousands", subtitle: "Professionals Trained", description: null, picture: null, displayOrder: 4, isActive: true },
        {
            type: "leadership",
            title: "Dr. Zeeshan Ahmad",
            subtitle: "Managing Director, IHCMD & IHCMNS",
            description:
                "<p>Institute of Health Care Management & Development (IHCMD), a promising medical institute, began its journey in Peshawar in 2019. Today, it proudly operates two state-of-the-art campuses in Peshawar and Islamabad. This achievement is the result of the dedication and tireless efforts of my team of professionals who have devoted their best to the prosperity of IHCMD & IHCMNS.</p><p>Affiliated with prestigious universities, councils, boards, and regulatory authorities in Islamabad, IHCMD offers quality education in Generic Nursing, Allied Health Sciences, Post-Graduate Diplomas, and research. Our vision is to be the first choice among top institutions.</p><p>At IHCMD, we are committed to fulfilling the expectations of our learners. We welcome the opportunity to contribute to your future success and professional development.</p>",
            picture: "/md.jpg",
            displayOrder: 1,
            isActive: true,
        },
        {
            type: "leadership",
            title: "Khalid Ilyas Siddiqui",
            subtitle: "Director, IHCMD & IHCMNS",
            description:
                "<p>IHCMD and IHCMNS, in its journey of five years, has identified and filled gaps in Generic Nursing, Allied Health Sciences, Post-Graduate Diplomas, and Research. Our mission is to provide opportunities in areas previously unavailable to the local community. Our first endeavors in Allied Health Sciences and now Generic Nursing are addressing public needs.</p><p>We envision doubling our infrastructure, faculty, and student seats to continue our growth. Additionally, we've established a Paramedics and Generic Nursing Institute to supply trained human resources to our affiliated IRM-Hospital in Islamabad. Our Bachelor's programs offer specialization across various fields.</p><p>Thank you for your support and confidence in our mission. Our team is dedicated to maintaining the highest standards of education and healthcare excellence.</p>",
            picture: "/director.jpg",
            displayOrder: 2,
            isActive: true,
        },
    ]);

    console.log("Seeded about table.");
    await sequelize.close();
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
