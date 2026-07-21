// Seed values for the singleton footer settings row, taken from the content
// that used to be hardcoded in components/Footer.tsx. Used both to create
// the row the first time it's needed (API route) and as a fallback if the
// row is somehow missing when the public site renders (lib/queries.ts).
export const FOOTER_DEFAULTS = {
    description:
        "Empower your future with a world-class healthcare education that combines practical skills with in-depth knowledge. At IHCMD, we are committed to shaping competent healthcare professionals equipped to meet the challenges of modern medical practices. Your journey to excellence, innovation, and compassionate care begins here. Join us to make a difference in the healthcare industry and impact lives for the better.",
    facebookUrl: "https://www.facebook.com/IHCMDIslamabad",
    instagramUrl: "https://www.instagram.com/rejuvaaestheticsofficial/",
    tiktokUrl: "https://www.tiktok.com/@rejuva_aesthetics_",
    phone: "+92 331-3400091",
    email: "Info.ihcmns@gmail.com",
    address: "IRM-HOSPITAL, 397, Kortana, G.T Rd, Opposite Gate 4, DHA Phase II, Islamabad",
    mapUrl:
        "https://www.google.com/maps/search/?api=1&query=IRM-HOSPITAL,+397,+Kortana,+G.T+Rd,+Opposite+Gate+4,+DHA+Phase+II,+Islamabad",
    developerName: "Adnan Afridi",
    developerEmail: "adnanafridi2007@gmail.com",
    copyrightText: "IHCMD™. All Rights Reserved.",
};
