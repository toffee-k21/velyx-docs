"use client";

import { X } from "lucide-react";
import { GenerateAPIKey } from "./GenerateAPIKey";
import { PastKeys } from "./PastKeys";

export function GenerateAPIKeyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0B0B0B] border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
                >
                    <X size={18} />
                </button>

                {/* Current generator */}
                <GenerateAPIKey />

                <div className="h-px bg-neutral-800 my-6" />

                {/* Past Keys */}
                <PastKeys />
            </div>
        </div>
    );
}
