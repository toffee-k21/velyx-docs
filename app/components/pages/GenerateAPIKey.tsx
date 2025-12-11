"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, RefreshCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function GenerateAPIKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-red-400 text-sm">
        You must be logged in to access this page.
      </div>
    );
  }

  // Helpers
  const generateKey = () => {
    const key =
      "vx_" +
      Array.from({ length: 32 }, () =>
        Math.random().toString(36)[2] || "0"
      ).join("");

    setApiKey(key);
    setVisible(true);
  };

  const regenerate = () => {
    if (confirm("Regenerate key? The old key will immediately stop working.")) {
      generateKey();
    }
  };

  const revoke = () => {
    if (confirm("Revoke this API key? This cannot be undone.")) {
      setApiKey(null);
      setVisible(false);
    }
  };

  const copy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Code blocks (same style as Introduction)
  const codeStyle = {
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

  const wsCode = `const ws = new WebSocket(
  "wss://velyx.io/ws?apiKey=${apiKey || "YOUR_API_KEY"}"
);`;

  const httpCode = `POST https://velyx.io/publish
x-api-key: ${apiKey || "YOUR_API_KEY"}
Content-Type: application/json

{
  "topic": "your-topic",
  "data": { "message": "Hello!" }
}`;

  return (
    <div className="space-y-12 max-w-3xl">

      {/* TITLE */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Generate API Key
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Create and manage your Velyx API keys.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* WARNING CARD */}
      <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6">
        <p className="text-neutral-300 text-sm leading-relaxed">
          <span className="text-white font-medium">Important:</span>{" "}
          Never expose or commit your API key publicly.
          Always store it securely using environment variables.
        </p>
      </div>

      {/* KEY GENERATOR */}
      {!apiKey ? (
        <div className="space-y-4">
          <button
            onClick={generateKey}
            className="px-6 py-3 bg-black border border-neutral-800 rounded-lg text-white hover:bg-neutral-900 transition"
          >
            Generate New API Key
          </button>

          <p className="text-neutral-400 text-sm">
            Click to create your API key.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* KEY DISPLAY */}
          <div className="space-y-3">
            <label className="text-sm text-neutral-400">Your API Key</label>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-white flex items-center justify-between">
                {visible ? apiKey : "•".repeat(36)}

                <button
                  onClick={() => setVisible(!visible)}
                  className="text-neutral-500 hover:text-white transition"
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* COPY BUTTON */}
              <button
                onClick={copy}
                className="px-4 py-3 bg-black border border-neutral-800 rounded-lg hover:bg-neutral-900 flex items-center gap-2 transition"
              >
                <Copy size={16} className="text-neutral-300" />
                <span className="text-neutral-300 text-sm">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={regenerate}
              className="px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg hover:bg-neutral-900 flex items-center gap-2 transition"
            >
              <RefreshCw size={16} /> Regenerate
            </button>

            <button
              onClick={revoke}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/20 flex items-center gap-2 transition"
            >
              <Trash2 size={16} /> Revoke
            </button>
          </div>
        </div>
      )}

      {/* ---- USING THE KEY ---- */}
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 space-y-6">
        <h2 className="text-white text-lg font-medium">Using Your API Key</h2>

        {/* WebSocket */}
        <div className="space-y-2">
          <p className="text-neutral-400 text-sm">WebSocket Connection</p>

          <div className="rounded-md overflow-hidden">
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

        {/* HTTP Publish */}
        <div className="space-y-2">
          <p className="text-neutral-400 text-sm">HTTP Publish Request</p>

          <div className="rounded-md overflow-hidden">
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

      {/* BEST PRACTICES CARD */}
      <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-3">
        <h3 className="text-white text-lg font-medium">Best Practices</h3>

        <ul className="space-y-2 text-neutral-300">
          {[
            "Store API keys in environment variables.",
            "Use different keys for development, staging, and production.",
            "Rotate keys regularly.",
            "Revoke compromised keys immediately.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="text-neutral-500 mt-[3px]">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
