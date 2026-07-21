import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Institute of Health Care Management and Development",
    template: "%s | IHCMD",
  },
  description:
    "The Institute of Health Care Management and Development is dedicated to advancing healthcare education and management practices. We provide comprehensive training programs, workshops, and resources to equip healthcare professionals with the skills necessary to excel in a rapidly evolving medical landscape. Our mission is to foster innovation and excellence in healthcare management, ensuring the delivery of high-quality patient care.",
  openGraph: {
    siteName: "IHCMD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
