"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid username or password.");
            return;
        }

        router.push("/admin");
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-gold-500 p-8">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-navy-50 text-navy-800 mb-4">
                            <LockKeyhole className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-navy-900">IHCMD Admin</h1>
                        <p className="text-sm text-gray-500 mt-1">Sign in to manage the website</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-navy-900 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
