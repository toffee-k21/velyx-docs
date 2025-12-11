"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black/90 backdrop-blur-md mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Left: Logo + Desc */}
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/velyx-logo.png"
                alt="Velyx Logo"
                width={36}
                height={36}
              />
              <span className="text-lg font-semibold text-white">Velyx</span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              A lightweight, scalable real-time engine for modern applications.
              Designed with simplicity and performance at its core.
            </p>
          </div>

          {/* Right: Social */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-medium mb-1">Connect</h3>

            <a
              href="https://github.com/toffee-k21"
              target="_blank"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              GitHub
            </a>

            <a
              href="https://x.com/tfq21"
              target="_blank"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Twitter / X
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-900 my-6"></div>

        {/* Bottom note */}
        <p className="text-center text-gray-600 text-sm">
          Velyx is independently built & maintained by{" "}
          <span className="text-gray-300"><Link href="https://github.com/toffee-k21" >Taufiq Hassan (@toffee-k21)</Link></span>
        </p>
      </div>
    </footer>
  );
}
