import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// All public pages pull live content (nav menu, slider, programs, faculty,
// news, gallery, etc.) straight from the database via Server Components.
// Forced dynamic instead of ISR: on this host (cPanel + Passenger), the
// on-disk incremental cache that ISR depends on doesn't reliably persist
// across process recycles, so `revalidate`-based pages kept serving the
// exact HTML baked in at build time (including data from whatever DB was
// reachable on the machine that ran the build) instead of ever refreshing.
// Rendering fresh on every request sidesteps that entirely.
export const dynamic = "force-dynamic";

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
