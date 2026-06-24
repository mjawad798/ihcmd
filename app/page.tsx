import AboutUs from "@/components/AboutUs";
// import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Popup from "@/components/Popup";

export default function Home() {
  return (
    <main className="overflow-x-hidden max-w-[100vw]">
      <Popup />
      <Hero />
      <AboutUs />
      <Programs />
      {/* <ContactForm /> */}
    </main>
  );
}
