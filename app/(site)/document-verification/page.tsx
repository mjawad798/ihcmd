import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getVerificationMasters } from "@/lib/queries";
import DocumentVerificationForm from "@/components/DocumentVerificationForm";

export const metadata: Metadata = {
  title: "Document Verification",
  description: "Verify the authenticity of a certificate or document issued by IHCMD using its serial number.",
  alternates: { canonical: "/document-verification" },
};

export default async function DocumentVerificationPage() {
  const masters = await getVerificationMasters();

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-900 font-medium">Document Verification</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-navy-900 py-16">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">Authenticity Check</h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Document Verification</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Select the document type and enter its serial number to verify it against our official records.
          </p>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* Form + Result */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="max-w-2xl mx-auto">
          <DocumentVerificationForm masters={masters} />
        </div>
      </div>
    </main>
  );
}
