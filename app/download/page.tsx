import React from "react";
import { Toaster } from "sonner";

const notesData = [
  {
    title: "CHPE Curriculum",
    file: "/pdf/CHPE-Curriculam.pdf", // Replace with actual file path
  },
  {
    title: "PG Diploma in Ultrasound",
    file: "/pdf/PG-Diploma-in-Ultrasound.pdf",
  },
  {
    title: "PGD RT Curriculum",
    file: "/pdf/PGD-RT-Curriculam.pdf",
  },
  {
    title: "CHR Curriculum",
    file: "/pdf/CHR-Curriculam.pdf",
  },
  {
    title: "Clinical Pharmacy Curriculum",
    file: "/pdf/Clinical-Pharmacy-Curriculam.pdf",
  },
  {
    title: "CSSD Curriculum",
    file: "/pdf/CSSD-Curriculam.pdf",
  },
  {
    title: "Health Care Hospital M Curriculum",
    file: "/pdf/Health-Care-Hospital-M-Curriculam.pdf",
  },
  {
    title: "PG DDM Curriculum",
    file: "/pdf/PG-DDM-Curriculam.pdf",
  },
  {
    title: "PGD PH",
    file: "/pdf/PGD-PH.pdf",
  },
  {
    title: "PGD PM",
    file: "/pdf/PGD-PM.pdf",
  },
  {
    title: "PG DDU 01 Year",
    file: "/pdf/PG-DDU-01-Year.pdf",
  },
  {
    title: "Infection Prevention and Control (IPC) Course Content",
    file: "/pdf/Infection-Prevention-and-Control-IPC-Course-Content.pdf",
  },
  {
    title: "PDD Food Safety and Control",
    file: "/pdf/PDD-FoodSsfety-and-Control-.pdf",
  },
];

const DownloadPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Download Educational Notes
        </h1>

        <p className="text-lg text-gray-700 mb-8 text-center">
          Access and download PDF notes. Simply click on the note title to download the file.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notesData.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-900 mb-2">{note.title}</h2>
              <p className="text-gray-600 mb-4">Click the button below to download the PDF file.</p>
              <a
                href={note.file}
                download
                className="bg-blue-700 text-white py-2 px-4 rounded-full inline-block text-center hover:bg-blue-800 transition"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/contact"
            className="text-indigo-700 hover:text-indigo-900 font-semibold underline"
          >
            For further inquiries, contact us
          </a>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default DownloadPage;
