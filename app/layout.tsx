import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Institute of Health Care Management and Development",
  description: "The Institute of Health Care Management and Development is dedicated to advancing healthcare education and management practices. We provide comprehensive training programs, workshops, and resources to equip healthcare professionals with the skills necessary to excel in a rapidly evolving medical landscape. Our mission is to foster innovation and excellence in healthcare management, ensuring the delivery of high-quality patient care."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100" suppressHydrationWarning>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
