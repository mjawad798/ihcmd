import { getActiveSlides } from "@/lib/queries";
import HeroClient from "@/components/HeroClient";

const HeroSection = async () => {
    const slides = await getActiveSlides();
    return <HeroClient slides={slides} />;
};

export default HeroSection;
