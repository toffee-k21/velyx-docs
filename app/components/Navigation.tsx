"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { GenerateAPIKeyModal } from "./pages/GenerateAPIKeyModal";

interface NavigationProps {
  onMenuClick?: () => void;
}

export function Navigation({ onMenuClick }: NavigationProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [keyModal, setKeyModal] = useState(false);
  const [greet, setGreet] = useState("");

  const greetings = [
    "welcome back",
    "good to see you",
    "ready to go",
    "building mode",
    "let's create",
  ];

  useEffect(() => {
    setGreet(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <>
    
      <nav className="w-full border-b border-neutral-900 bg-black sticky top-0 z-40 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

          {/* LEFT SECTION — Mobile menu */}
        <div className="flex items-center gap-3">
         {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden text-neutral-400 hover:text-white transition"
            aria-label="Open navigation"
          >
            ☰
          </button>
        )}
        </div>


          {/* RIGHT SECTION — ALL NAV ELEMENTS TOGETHER */}
          <div className="flex items-center gap-6 text-sm">

            {/* GitHub */}
            <Link
              href="https://github.com/toffee-k21/velyx-docs"
              target="_blank"
              className="text-neutral-400 hover:text-white transition"
            >
              GitHub
            </Link>

            {/* API Keys */}
            {session?.user && (
              <button
                onClick={() => setKeyModal(true)}
                className="text-neutral-400 hover:text-white transition"
              >
                API Keys
              </button>
            )}

            {/* Subtle separator */}
            <span className="text-neutral-700 select-none">|</span>

            {/* Auth section */}
            {!session?.user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signIn()}
                  className="text-neutral-300 hover:text-white transition"
                >
                  Sign In
                </button>

                <button
                  onClick={() => signIn()}
                  className="px-4 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="relative flex items-center gap-3">

                {/* Greeting */}
                <div className="text-right leading-tight hidden sm:block">
                  <p className="text-sm text-neutral-300 font-medium">
                    Hi, {session.user.name}
                  </p>
                  <p className="text-xs text-neutral-500">{greet}</p>
                </div>

                {/* Avatar + Dropdown */}
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full border border-neutral-800"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-neutral-700" />
                  )}

                  <ChevronDown size={16} className="text-neutral-500" />
                </button>

                  {/* Dropdown */}
                  {open && (
                    <div
                      className="
      absolute right-0 
      top-[calc(100%+4px)]
      w-40 
      bg-neutral-900 
      border border-neutral-800 
      rounded-lg 
      shadow-lg 
      py-2 
      z-20
    "
                    >
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

      {/* API KEY MODAL */}
      <GenerateAPIKeyModal open={keyModal} onClose={() => setKeyModal(false)} />
    </>
  );
}
