"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <nav className="w-full border-b border-neutral-900 bg-black backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-32">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3">  
          <span className="text-lg font-semibold tracking-wide text-white">
            
          </span>
        </Link>

        {/* Right: Auth */}
        <div className="flex items-center gap-4">

          {/* If NOT signed in */}
          {!session?.user && (
            <div className="flex items-center gap-3">

              {/* Sign In button */}
              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-lg bg-neutral-800/70 text-gray-200 hover:bg-neutral-700 transition shadow-sm shadow-black/20"
              >
                Sign In
              </button>

              {/* Create Account button */}
              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition shadow-md"
              >
                Create Account
              </button>
            </div>
          )}

          {/* If signed in */}
          {session?.user && (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-900 rounded-lg transition"
              >
                {/* Greeting */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Hi, {session.user.name}</p>
                  <p className="text-sm text-gray-300 font-medium">{greet}</p>
                </div>

                {/* Profile Image */}
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full ring-1 ring-neutral-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500" />
                )}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 z-20">

                  <Link
                    href="/pricing"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800 rounded transition"
                  >
                    Pricing
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800 rounded transition"
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
