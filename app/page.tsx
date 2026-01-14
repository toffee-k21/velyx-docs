"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Footer from "./components/pages/Footer";
import { Navigation } from "./components/Navigation";

export default function LandingPage() {
  const YOUTUBE_VIDEO_ID = "ParOnAPcAVY"; // <-- replace

  const publishExample = `POST /publish
x-api-key: YOUR_KEY

{ "topic":"chat:42", "payload":{ "msg":"hello" } }`;

  const wsExample = `const ws = new WebSocket("wss://velyx.me/ws?apiKey=KEY");

ws.onopen = () => ws.send(JSON.stringify({
  type: "subscribe",
  topic: "chat:42"
}));`;

  const codeStyle: any = {
    background: "transparent",
    margin: 0,
    padding: 0,
    fontSize: "13.5px",
    lineHeight: "1.7",
    overflowX: "auto",
  };

  const codeTagProps = {
    style: {
      background: "transparent",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      whiteSpace: "pre",
    },
  };

  return (
    <>
    <Navigation />
    <main className="relative w-full bg-black">
      {/* Subtle glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-14">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs
              bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              real-time infrastructure
            </div>

            <h1 className="text-white text-5xl font-semibold tracking-tight leading-[1.1]">
              Build real-time apps
              <br />
              <span className="text-neutral-300">without managing WebSockets</span>
            </h1>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
              Velyx routes events to topics and delivers instantly to all connected
              subscribers. You publish. Clients receive.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                bg-white text-black font-medium hover:bg-neutral-200 transition"
              >
                Getting Started <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="https://github.com/toffee-k21/velyx-docs"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                border border-neutral-800 bg-black/40 text-white hover:bg-white/5 transition"
              >
                <Github className="w-4 h-4" />
                Contribute
              </Link>
            </div>

            {/* Minimal points */}
            <div className="pt-2 text-neutral-300 text-sm space-y-2">
              <div>• Topic based routing</div>
              <div>• HTTP publish + WebSocket subscribe</div>
              <div>• Designed for scale + simplicity</div>
            </div>
          </div>

          {/* Right: YouTube Demo Card */}
          <div className="space-y-4">
            <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                <div className="text-white font-medium">Demo</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-neutral-800">
                  YouTube
                </span>
              </div>

              <div className="p-4">
                {/* Responsive iframe */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                    title="Velyx Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-neutral-500 text-xs mt-3 leading-relaxed">
                  Quick walkthrough of publish → route → deliver in real-time.
                </p>
              </div>
            </div>

            <div className="text-neutral-500 text-sm">
              Want the full API?{" "}
              <Link
                href="/docs"
                className="text-white hover:underline underline-offset-4"
              >
                Read the docs →
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-neutral-900" />

        {/* Short code preview */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MiniCodeCard
            title="Publish"
            badge="HTTP"
            code={publishExample}
            lang="http"
            codeStyle={codeStyle}
            codeTagProps={codeTagProps}
          />

          <MiniCodeCard
            title="Subscribe"
            badge="WebSocket"
            code={wsExample}
            lang="javascript"
            codeStyle={codeStyle}
            codeTagProps={codeTagProps}
          />
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

/* ================== Helper ================== */

function MiniCodeCard({
  title,
  badge,
  code,
  lang,
  codeStyle,
  codeTagProps,
}: {
  title: string;
  badge: string;
  code: string;
  lang: string;
  codeStyle: any;
  codeTagProps: any;
}) {
  return (
    <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-white font-medium">{title}</div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-neutral-800">
          {badge}
        </span>
      </div>

      <div className="p-5">
        <SyntaxHighlighter
          language={lang}
          style={oneDark}
          wrapLines
          wrapLongLines
          customStyle={codeStyle}
          codeTagProps={codeTagProps}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
