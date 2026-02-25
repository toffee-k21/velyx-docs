"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Introduction() {
  const frontendCode = `const ws = new WebSocket("wss://velyx.me/ws?appId=YOUR_APP_ID");

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "subscribe",
    topic: "notifications:user-123"
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};`;

  const backendCode = `POST https://velyx.me/publish
x-api-key: YOUR_API_KEY

{
  "topic": "notifications:user-123",
  "payload": { "message": "Your order has shipped!" }
}`;

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
    <div className="max-w-3xl space-y-16">

      {/* HERO */}
      <div className="space-y-6 pt-4">
        <div className="inline-block px-3 py-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
          Real-time Infrastructure
        </div>

        <h1 className="text-4xl font-semibold text-white leading-tight tracking-tight">
          <span className="text-emerald-500">Velyx</span> — Real-time delivery made simple
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Add live updates, notifications, chat, and dashboards to your app —
          without building or scaling WebSocket servers.
        </p>

        <p className="text-neutral-500">
          Send events. We deliver them instantly.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* WHAT IT DOES */}
      <div className="space-y-8">
        <h2 className="text-xl font-medium text-white">
          What Velyx Handles
        </h2>

        <div className="bg-[#111111] border border-neutral-800 rounded-xl p-8">
          <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-neutral-300">
            {[
              "Manages live WebSocket connections",
              "Routes messages to the right users",
              "Instant message delivery",
              "Handles thousands of users",
              "Automatic scaling",
              "Reliable connection health",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-emerald-500 mt-1">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TWO STEPS */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-white">
          How It Works
        </h2>

        <p className="text-neutral-400">
          Just two simple steps.
        </p>
      </div>

      {/* BACKEND */}
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-medium text-lg">
            1️⃣ Backend — Publish an Event
          </h3>
          <p className="text-neutral-400">
            When something changes, send it to Velyx.
          </p>
        </div>

        <div className="bg-black border border-neutral-800 rounded-xl p-6">
          <SyntaxHighlighter
            language="http"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {backendCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* FRONTEND */}
      <div className="space-y-4">
        <div>
          <h3 className="text-white font-medium text-lg">
            2️⃣ Frontend — Listen for Updates
          </h3>
          <p className="text-neutral-400">
            Connect once and receive updates in real time.
          </p>
        </div>

        <div className="bg-black border border-neutral-800 rounded-xl p-6">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {frontendCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* USE CASES */}
      <div className="space-y-6">
        <h3 className="text-white text-lg font-medium">
          Perfect For
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-neutral-300">
          {[
            "Notifications",
            "Live chat",
            "Dashboards",
            "Multiplayer apps",
            "Live tracking",
            "Collaboration tools",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#0D0D0D] border border-neutral-800 rounded-lg px-4 py-3 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-8 border-t border-neutral-800 text-neutral-400">
        Real-time infrastructure shouldn’t slow you down.
        <span className="text-emerald-500">
          {" "}Build features. We handle delivery.
        </span>
      </div>

    </div>
  );
}