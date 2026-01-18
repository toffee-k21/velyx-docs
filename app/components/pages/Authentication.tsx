"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Authentication() {
  const wsCode = `const ws = new WebSocket("wss://velyx.me/ws?appId=YOUR_APP_ID");`;

  const httpCode = `POST https://velyx.me/publish
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "topic": "chat:room-1",
  "data": { "message": "Hello" }
}`;

  // Shared style config
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

      {/* ---- Heading ---- */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Authentication</h1>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Secure your Velyx integration with API key authentication.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---- Intro ---- */}
      <div className="space-y-8">
        <p className="text-neutral-300 leading-relaxed">
          Velyx uses API keys to authenticate all requests. Each API key is unique to your account
          and should be treated with the same security as a password.
        </p>

        {/* WebSocket Authentication */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white text-xl font-medium mb-3">WebSocket Authentication</h2>

            <p className="text-neutral-400 mb-4">
              Pass your API key as a query parameter when establishing WebSocket connections:
            </p>

            <div className="bg-black border border-neutral-800 rounded-lg p-5">
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="javascript"
                  style={oneDark}
                  wrapLines
                  wrapLongLines
                  customStyle={codeStyle}
                  codeTagProps={codeTagProps}
                >
                  {wsCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* HTTP Auth */}
          <div>
            <h2 className="text-white text-xl font-medium mb-3">HTTP Authentication</h2>

            <p className="text-neutral-400 mb-4">
              For HTTP publish requests, include your API key in the{" "}
              <code className="text-white bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                x-api-key
              </code>{" "}
              header:
            </p>

            <div className="bg-black border border-neutral-800 rounded-lg p-5">
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="http"
                  style={oneDark}
                  wrapLines
                  wrapLongLines
                  customStyle={codeStyle}
                  codeTagProps={codeTagProps}
                >
                  {httpCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Security Best Practices ---- */}
        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-4">
          <h3 className="text-white text-lg font-medium">Security Best Practices</h3>

          <ul className="space-y-2 text-neutral-300">
            {[
              "Never expose API keys in client-side code or public repositories",
              "Use environment variables to store keys in your backend services",
              "Rotate keys periodically and after any suspected compromise",
              "Only WebSocket connections from frontend are allowed; HTTP publish must be server-side",
              "Monitor your API usage for any unusual patterns",
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
          <h3 className="text-white text-lg font-medium mb-4">Authentication Flow</h3>

          <ol className="space-y-3 text-neutral-300">
            {[
              "Client connects to Velyx with API key",
              "Velyx validates the key and establishes the connection",
              "Client can now subscribe to topics and receive events",
              "Backend publishes events using the same API key via HTTP",
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
            {/* <span className="text-white font-medium">Next:</span> Visit the{" "} */}
            <span className="text-white underline underline-offset-2 cursor-pointer">
              Generate API Key
            </span>{" "}
            page to create your first API key and start building.
          </p>
        </div>
      </div>
    </div>
  );
}
