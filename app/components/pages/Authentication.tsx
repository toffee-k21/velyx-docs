"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Authentication() {
  const wsCode = `const ws = new WebSocket("wss://velyx.me/ws?appId=YOUR_APP_ID");`;

  const wsSubscribeCode = `ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "subscribe",
    topic: "room:1"
  }));
};`;

  const httpCode = `POST https://velyx.me/publish
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "topic": "room:1",
  "payload": { "message": "Hello" }
}`;

  // Shared style config (responsive + safe)
  const codeStyle: any = {
    background: "transparent",
    margin: 0,
    padding: "0",
    fontSize: "13px",
    lineHeight: "1.6",
  };

  const codeTagProps = {
    style: {
      background: "transparent",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      whiteSpace: "pre",
    },
  };

  return (
    <div className="space-y-12 w-full max-w-3xl mx-auto px-4 sm:px-0">
      {/* ---- Heading ---- */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Authentication
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Velyx uses two values: a public <b>App ID</b> for WebSocket connections
          and a secret <b>API Key</b> for publishing events.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---- Intro ---- */}
      <div className="space-y-8">
        <p className="text-neutral-300 leading-relaxed">
          Every Velyx project has:
          <br />
          <span className="text-white">• App ID (public)</span> — safe to use in frontend for WebSocket connections
          <br />
          <span className="text-white">• API Key (secret)</span> — used only on backend to publish events via HTTP
        </p>

        {/* WebSocket Authentication */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white text-xl font-medium mb-3">
              WebSocket Authentication (Frontend)
            </h2>

            <p className="text-neutral-400 mb-4">
              Connect using your <span className="text-white">App ID</span>. This is safe to expose in the browser:
            </p>

            <div className="bg-black border border-neutral-800 rounded-lg p-4 sm:p-5 overflow-x-auto">
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLines={false}
                wrapLongLines={false}
                customStyle={codeStyle}
                codeTagProps={codeTagProps}
              >
                {wsCode}
              </SyntaxHighlighter>
            </div>

            <p className="text-neutral-400 mt-4 mb-3">
              Then subscribe to a topic :
            </p>

            <div className="bg-black border border-neutral-800 rounded-lg p-4 sm:p-5 overflow-x-auto">
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                wrapLines={false}
                wrapLongLines={false}
                customStyle={codeStyle}
                codeTagProps={codeTagProps}
              >
                {wsSubscribeCode}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* HTTP Auth */}
          <div>
            <h2 className="text-white text-xl font-medium mb-3">
              HTTP Authentication (Backend)
            </h2>

            <p className="text-neutral-400 mb-4">
              To publish events, send your{" "}
              <span className="text-white">API Key</span> in the{" "}
              <code className="text-white bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                x-api-key
              </code>{" "}
              header:
            </p>

            <div className="bg-black border border-neutral-800 rounded-lg p-4 sm:p-5 overflow-x-auto">
              <SyntaxHighlighter
                language="http"
                style={oneDark}
                wrapLines={false}
                wrapLongLines={false}
                customStyle={codeStyle}
                codeTagProps={codeTagProps}
              >
                {httpCode}
              </SyntaxHighlighter>
            </div>

            <p className="text-neutral-500 text-sm mt-3">
              ⚠️ Don’t use API keys in frontend apps. Anyone can copy them from browser DevTools.
            </p>
          </div>
        </div>

        {/* ---- Security Best Practices ---- */}
        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-4">
          <h3 className="text-white text-lg font-medium">
            Security Best Practices
          </h3>

          <ul className="space-y-2 text-neutral-300">
            {[
              "App ID is public — safe for WebSocket connections in frontend",
              "API Key is secret — use only in backend (server, API routes, workers)",
              "Rotate API keys if leaked or compromised",
              // "Monitor usage for unusual traffic",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Authentication Flow ---- */}
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6">
          <h3 className="text-white text-lg font-medium mb-4">
            Authentication Flow
          </h3>

          <ol className="space-y-3 text-neutral-300">
            {[
              "Frontend connects using App ID (public)",
              "Frontend subscribes to topics",
              "Backend publishes using API Key (secret) via HTTP",
              "Velyx delivers events to all subscribed clients instantly",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-neutral-500">{i + 1}.</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ---- Next Section ---- */}
        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-5">
          <p className="text-neutral-300">
            <span className="text-white underline underline-offset-2 cursor-pointer">
              Generate API Key
            </span>{" "}
            to create your first project and get your App ID + API Key.
          </p>
        </div>
      </div>
    </div>
  );
}
