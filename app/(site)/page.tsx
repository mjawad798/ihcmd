import type { Metadata } from "next";
import AboutUs from "@/components/AboutUs";
// import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import Programs from "@/components/Programs";
import Popup from "@/components/Popup";
import MessageSection from "@/components/MessageSection";
import Achievements from "@/components/Achievements";
import HospitalsOnPanel from "@/components/HospitalsOnPanel";
import Affiliations from "@/components/Affiliations";
import GalleryPreview from "@/components/GalleryPreview";

export const metadata: Metadata = {
  title: { absolute: "Institute of Health Care Management and Development | IHCMD" },
  description:
    "IHCMD Islamabad offers undergraduate degrees, postgraduate diplomas, and certificate programs in nursing, anesthesia technology, radiology, public health, and more — with hands-on training at IRM Hospital.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Institute of Health Care Management and Development",
    description:
      "IHCMD Islamabad offers undergraduate degrees, postgraduate diplomas, and certificate programs in healthcare, with hands-on training at IRM Hospital.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="overflow-x-hidden max-w-[100vw]">
      <Popup />
      <Hero />
      <NewsTicker />
      <AboutUs />
      <MessageSection />
      <Achievements />
      <Programs />
      <GalleryPreview />
      <HospitalsOnPanel />
      <Affiliations />
      {/* <ContactForm /> */}
    </main>
  );
}
