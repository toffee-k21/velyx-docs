"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";

export function Navigation() {
  const { data: session } = useSession();
  const [greet, setGreet] = useState("");
  const [open, setOpen] = useState(false);

  const messages = [
    "great to see you 👋",
    "welcome back 🚀",
    "hope you're building something awesome ⚡",
    "you're doing amazing ✨",
    "keep creating magic 🌙",
    "glad to have you here 🤝",
  ];

  useEffect(() => {
    setGreet(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <nav className="w-full border-b border-neutral-900 bg-black sticky top-0 z-50 mb-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Left spacing to center navbar items */}
        <div className="flex-1" />

        {/* Right section */}
        <div className="flex items-center gap-5">

          {/* GitHub CTA */}
          <Link
            href="https://github.com/toffee-k21/velyx"
            target="_blank"
            className="
              hidden sm:flex items-center gap-2
              px-3 py-2 rounded-md bg-neutral-900
              text-neutral-300 border border-neutral-800
              hover:bg-neutral-800 hover:border-neutral-700 
              transition
            "
          >
            <Github size={18} />
            <span className="text-sm">GitHub</span>
          </Link>

          {/* If NOT logged in */}
          {!session?.user && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-md bg-neutral-900 text-neutral-200 border border-neutral-800 hover:bg-neutral-800 transition"
              >
                Sign In
              </button>

              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-neutral-200 transition"
              >
                Create Account
              </button>
            </div>
          )}

          {/* If logged in */}
          {session?.user && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-900 transition"
              >
                {/* Greeting */}
                <div className="text-right leading-tight">
                  <p className="text-sm text-neutral-500">Hi, {session.user.name}</p>
                  <p className="text-sm text-neutral-300 font-medium">{greet}</p>
                </div>

                {/* Avatar */}
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="profile"
                    width={38}
                    height={38}
                    className="rounded-full border border-neutral-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-700" />
                )}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 z-20">

                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/pricing"
                    className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                  >
                    Pricing
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
