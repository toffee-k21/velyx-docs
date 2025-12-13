"use client";

import Link from "next/link";
import { Navigation } from "../components/Navigation";
import { Github } from "lucide-react";

export default function Pricing() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* Navigation */}
      <Navigation />

      {/* Back */}
      <div className="max-w-6xl mx-auto w-full px-6 mt-4">
        <Link
          href="/"
          className="text-neutral-400 hover:text-white text-sm transition"
        >
          ← Back
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">

          {/* Page label (separate, subtle) */}
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
            Pricing
          </p>

          {/* Price */}
          <h1 className="text-6xl font-semibold tracking-tight mb-6">
            Free
          </h1>

          {/* Message */}
          <p className="text-neutral-300 leading-relaxed max-w-md mx-auto mb-4">
            Velyx is currently in active development.
            The focus is on building a solid real-time foundation
            without plans, tiers, or restrictions.
          </p>

          <p className="text-neutral-400 text-sm max-w-md mx-auto mb-10">
            If you’re using Velyx at this stage, you’re early — and your
            feedback directly shapes the product.
          </p>

          {/* Minimal engagement field */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <input
              type="text"
              placeholder="What are you building with Velyx?"
              className="w-full max-w-sm bg-transparent border-b border-neutral-700 px-2 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition"
            />
            <p className="text-xs text-neutral-500">
              Optional — helps guide development
            </p>
          </div>

          {/* Support link */}
          <a
            href="https://github.com/toffee-k21/velyx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition"
          >
            <Github size={16} />
            <span>Follow development on GitHub</span>
          </a>

        </div>
      </div>
    </div>
  );
}
