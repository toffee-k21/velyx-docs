"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Introduction() {
  const frontendCode = `const ws = new WebSocket("wss://velyx.me/ws?apiKey=YOUR_KEY");
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "subscribe",
    topic: "notifications:user-123"
  }));
};`;

  const backendCode = `POST https://velyx.me/publish
x-api-key: YOUR_API_KEY

{
  "topic": "notifications:user-123",
  "payload": { "message": "Your order has shipped!" }
}`;

  /* Reusable shared style */
  const codeStyle:any = {
    background: "transparent",
    margin: 0,
    padding: "0",
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
    <div className="space-y-12 max-w-3xl">

      {/* ---- Title ---- */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          <span className="text-emerald-500/90">Velyx</span> is a fully managed real-time delivery layer
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed">
          It lets you build real-time applications without managing WebSocket infrastructure.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-800" />

      {/* ---- Description ---- */}
      <div className="space-y-8">

        <p className="text-neutral-300 leading-relaxed">
          Velyx is a fully managed real-time infrastructure that handles all the
          complexity of WebSocket connections, message routing, fan-out, and
          horizontal scaling.
        </p>

        {/* What Velyx Handles */}
        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-4">
          <h2 className="text-white text-lg font-medium">What Velyx Handles</h2>

          <ul className="space-y-2 text-neutral-300">
            {[
              "WebSocket connection management and lifecycle",
              "Topic-based routing and subscription mapping",
              "Horizontal scaling and load distribution",
              "Message fan-out to thousands of subscribers",
              "Built-in heartbeats and connection health monitoring",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Responsibilities */}
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 space-y-4">
          <h3 className="text-white text-lg font-medium">
            Your Responsibility: Just Two Things
          </h3>

          <div className="space-y-3 text-neutral-300">
            <div>
              <span className="text-neutral-200 font-medium">1. Backend:</span>{" "}
              Send events to Velyx when something happens
            </div>
            <div>
              <span className="text-neutral-200 font-medium">2. Frontend:</span>{" "}
              Update your UI when events arrive
            </div>
          </div>
        </div>

        <p className="text-neutral-300 leading-relaxed">
          No more managing WebSocket servers or scaling concerns.<span className="text-emerald-500"> Velyx </span>just works.
        </p>
      </div>

      {/* ---- Code Examples ---- */}
      <div className="pt-6 space-y-8">

        {/* Frontend Example */}
        <div className="bg-black border border-neutral-800 rounded-lg p-5 space-y-3">
          <div className="text-neutral-500 text-sm">Frontend – Connect and subscribe</div>

          <div className="rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={codeStyle}
              codeTagProps={codeTagProps}
            >
              {frontendCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Backend Example */}
        <div className="bg-black border border-neutral-800 rounded-lg p-5 space-y-3">
          <div className="text-neutral-500 text-sm">Backend – Publish an event</div>

          <div className="rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="http"
              style={oneDark}
              wrapLines={true}
              wrapLongLines={true}
              customStyle={codeStyle}
              codeTagProps={codeTagProps}
            >
              {backendCode}
            </SyntaxHighlighter>
          </div>
        </div>

      </div>

      {/* Footer */}
      {/* <div className="pt-4 text-neutral-500 text-sm">
        Continue to{" "}
        <span className="text-white underline-offset-2 hover:underline cursor-pointer">
          Getting Started → Authentication
        </span>.
      </div> */}
    </div>
  );
}
