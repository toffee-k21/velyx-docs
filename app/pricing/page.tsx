"use client";

import Link from "next/link";
import Image from "next/image";

export default function Pricing() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">

      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">

        {/* Back Button */}
        <Link
          href="/"
          className="text-gray-400 hover:text-white text-sm transition flex items-center gap-2"
        >
          ← Back
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/velyx-logo.png"
            alt="velyx"
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold">Velyx</span>
        </div>

        {/* Placeholder for spacing */}
        <div className="w-12"></div>
      </div>

      {/* Center Pricing Card */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className=" border border-neutral-800 rounded-2xl p-14 shadow-xl shadow-black/40 backdrop-blur-md text-center max-w-2xl w-full">

          {/* Title */}
          <h1 className="text-4xl font-semibold mb-5 tracking-tight">
            Pricing
          </h1>

          {/* Highlighted FREE Badge */}
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-green-600/20 border border-green-600 text-green-400 font-semibold text-lg shadow-sm shadow-green-900/40">
            FREE 
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Velyx is completely free while in <span className="text-white font-medium">Beta</span>.
            No paywalls, no limits — just pure real-time infrastructure.
          </p>

          <p className="text-gray-500 text-sm mt-8">
            Start building without friction.  
            Pricing will be announced after the Beta phase.
          </p>

        </div>
      </div>

    </div>
  );
}
