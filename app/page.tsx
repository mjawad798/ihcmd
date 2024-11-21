import AboutUs from "@/components/AboutUs";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";

export default function Home() {

  return (
    <main className="overflow-x-hidden max-w-[100vw]">
      <Hero/>
      <AboutUs/>
      <Programs/>
      <ContactForm/>
    </main>
  );
}
