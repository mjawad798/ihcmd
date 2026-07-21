import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, FileText, Image as ImageIcon, Download as DownloadIcon } from "lucide-react";
import { getPublicDownloads } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download curriculum documents and other files published by IHCMD.",
  alternates: { canonical: "/download" },
};

export default async function DownloadPage() {
  const downloads = await getPublicDownloads();

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="w-full px-6 lg:px-12 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-navy-900 font-medium">Downloads</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-navy-900 py-16">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-3">Resources</h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Downloads</h1>
          <p className="text-white/70 mt-4 text-lg">Curriculum documents and other published files</p>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-6 rounded-full" />
        </div>
      </div>

      {/* List */}
      <div className="w-full px-6 lg:px-12 py-16">
        {downloads.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No downloads available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {downloads.map((item) => {
              const isImage = /\.(jpe?g|png)$/i.test(item.file);
              const Icon = isImage ? ImageIcon : FileText;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gold-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-navy-50 text-navy-800">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-navy-900 truncate">{item.title}</h4>
                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
