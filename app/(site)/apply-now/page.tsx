import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Lock } from "lucide-react";
import { getAdmissionContext } from "@/lib/queries";
import AdmissionApplyForm from "@/components/AdmissionApplyForm";

// Session/program availability changes in the admin panel; never cache it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply Now",
  description: "Apply online for admission at the Institute of Health Care Management & Nursing Sciences.",
  alternates: { canonical: "/apply-now" },
};

export default async function ApplyNowPage() {
  const { session, programs } = await getAdmissionContext();

  return (
    <main>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-900 font-medium">Apply Now</span>
        </div>
      </div>

      <div className="bg-navy-900 py-16">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">
            {session ? `Admissions ${session.sessionName}` : "Admissions"}
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Student Admission Form</h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Fill in the form below to apply. You will receive an application number and can download a copy of your form.
          </p>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {session && programs.length > 0 ? (
            <AdmissionApplyForm sessionName={session.sessionName} programs={programs} />
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
              <Lock className="w-10 h-10 text-gold-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy-900">Admissions are currently closed</h3>
              <p className="text-gray-500 mt-2">
                There is no program open for admission at the moment. Please check back later or follow our news for announcements.
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-5 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
