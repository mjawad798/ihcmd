import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// All public pages pull live content (nav menu, slider, programs, faculty,
// news, gallery, etc.) straight from the database via Server Components.
// Without this, Next.js would bake that data into static HTML at build
// time and only refresh it on the next deploy — admin edits wouldn't show
// up until then. Revalidating every 60s keeps pages fast (served from
// cache) while admin changes still appear within about a minute.
export const revalidate = 60;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
