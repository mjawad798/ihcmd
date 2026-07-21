import { getLatestFlashNews } from "@/lib/queries";
import PopupClient from "@/components/PopupClient";

const Popup = async () => {
    const flashNews = await getLatestFlashNews();
    return <PopupClient flashNews={flashNews} />;
};

export default Popup;
