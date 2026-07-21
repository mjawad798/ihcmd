"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Search } from "lucide-react";

type Master = { id: number; name: string };

type VerifiedDetail = {
    id: number;
    serialNumber: string;
    registrationNo: string;
    studentName: string;
    fatherName: string;
    duration: string;
    master: { id: number; name: string };
};

type Result = { found: true; detail: VerifiedDetail } | { found: false } | null;

export default function DocumentVerificationForm({ masters }: { masters: Master[] }) {
    const [masterId, setMasterId] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result>(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setResult(null);

        if (!masterId || !serialNumber.trim()) {
            setError("Please select a document type and enter a serial number.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `/api/document-verification?masterId=${encodeURIComponent(masterId)}&serialNumber=${encodeURIComponent(serialNumber.trim())}`
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong. Please try again.");
                return;
            }
            setResult(data);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 space-y-5">
                {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
                    <select
                        required
                        value={masterId}
                        onChange={(e) => setMasterId(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                        <option value="">Select document type</option>
                        {masters.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Serial Number</label>
                    <input
                        type="text"
                        required
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        placeholder="Enter the serial number printed on your document"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
                >
                    <Search className="w-4 h-4" />
                    {loading ? "Verifying..." : "Verify Document"}
                </button>
            </form>

            {result?.found && (
                <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-5">
                        <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                        <p className="text-green-800 font-semibold">
                            This document / certificate is verified with our record.
                        </p>
                    </div>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-gray-500">Document Type</dt>
                            <dd className="font-medium text-navy-900">{result.detail.master.name}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Serial Number</dt>
                            <dd className="font-medium text-navy-900 font-mono">{result.detail.serialNumber}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Registration No.</dt>
                            <dd className="font-medium text-navy-900">{result.detail.registrationNo}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Duration</dt>
                            <dd className="font-medium text-navy-900">{result.detail.duration}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Student Name</dt>
                            <dd className="font-medium text-navy-900">{result.detail.studentName}</dd>
                        </div>
                        <div>
                            <dt className="text-gray-500">Father Name</dt>
                            <dd className="font-medium text-navy-900">{result.detail.fatherName}</dd>
                        </div>
                    </dl>
                </div>
            )}

            {result?.found === false && (
                <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 font-semibold">
                        The provided credentials are not matching with our record.
                    </p>
                </div>
            )}
        </div>
    );
}
