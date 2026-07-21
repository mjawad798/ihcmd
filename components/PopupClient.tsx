"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type FlashNewsItem = {
    id: number;
    title: string;
    description: string;
};

const PopupClient = ({ flashNews }: { flashNews: FlashNewsItem | null }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!flashNews) return;
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [flashNews]);

    if (!flashNews || !isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300 border-t-4 border-gold-500"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-navy-900/5 hover:bg-navy-900/10 rounded-full text-navy-900 transition-colors z-10"
                    aria-label="Close popup"
                >
                    <X size={20} />
                </button>

                <span className="inline-block px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-4">
                    Flash News
                </span>
                <h2 className="text-2xl font-bold text-navy-900 mb-4 pr-8">{flashNews.title}</h2>
                <div
                    className="rich-content text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: flashNews.description }}
                />
            </div>
        </div>
    );
};

export default PopupClient;
