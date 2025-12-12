"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface KeyEntry {
  id: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  revoked: boolean;
}

export function GenerateAPIKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [appName, setAppName] = useState("");
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-red-400 text-sm">
        You must be logged in to access this page.
      </div>
    );
  }

  // Fetch previous keys
  useEffect(() => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => setKeys(data.keys));
  }, []);

  // Create new project + API key
  const createProject = async () => {
    if (!appName.trim()) {
      alert("Please enter an app name.");
      return;
    }

    const generatedKey = "vx_" + crypto.randomUUID().replace(/-/g, "");
    setApiKey(generatedKey);
    setVisible(true);

    const res = await fetch("/api/keys/create", {
      method: "POST",
      body: JSON.stringify({
        apiKey: generatedKey,
        appName,
      }),
    });

    const data = await res.json();
    setKeys((prev) => [data.key, ...prev]);

    setAppName(""); // clear input
  };

  const revoke = async (id: string) => {
    if (!confirm("Revoke this API key?")) return;

    await fetch("/api/keys/revoke", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, revoked: true } : k))
    );
  };

  const copyKey = (key: string, id?: string) => {
    navigator.clipboard.writeText(key);

    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Code example style
  const codeStyle = { background: "transparent", margin: 0, padding: 0 };
  const codeTagProps = { style: { background: "transparent" } };

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
          API Keys
        </h1>
        <p className="text-neutral-400 text-lg">
          Create projects and generate API keys.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---------------------------------------------- */}
      {/* PAST KEYS */}
      {/* ---------------------------------------------- */}
      <div className="space-y-4">
        <h2 className="text-white text-lg font-medium">Your Projects</h2>

        {keys.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            You haven't created any projects yet.
          </p>
        ) : (
          <div className="space-y-3">
            {keys.map((k) => (
              <div
                key={k.id}
                className="bg-black border border-neutral-800 rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-white font-medium">{k.appName}</span>
                  <span className="font-mono text-sm text-neutral-300">{k.apiKey}</span>
                  <span className="text-neutral-500 text-xs">
                    Created: {new Date(k.createdAt).toLocaleString()}
                  </span>
                  {k.revoked && (
                    <span className="text-red-400 text-xs mt-1">Revoked</span>
                  )}
                </div>

                {!k.revoked && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => copyKey(k.apiKey, k.id)}
                      className="text-neutral-400 hover:text-white transition"
                    >
                      {copiedId === k.id ? "Copied!" : <Copy size={16} />}
                    </button>

                    <button
                      onClick={() => revoke(k.id)}
                      className="text-red-300 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---------------------------------------------- */}
      {/* CREATE PROJECT + GENERATE KEY */}
      {/* ---------------------------------------------- */}
      <div className="space-y-4">
        <label className="text-sm text-neutral-400">Project Name</label>

        <input
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="My Chat App"
          className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-lg text-white"
        />

        <button
          onClick={createProject}
          className="px-6 py-3 bg-black border border-neutral-800 rounded-lg text-white hover:bg-neutral-900 transition"
        >
          Create Project & Generate API Key
        </button>
      </div>

      {/* ---------------------------------------------- */}
      {/* SHOW NEWLY GENERATED KEY */}
      {/* ---------------------------------------------- */}
      {apiKey && (
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm text-neutral-400">New API Key</label>

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

              <button
                onClick={() => copyKey(apiKey)}
                className="px-4 py-3 bg-black border border-neutral-800 rounded-lg hover:bg-neutral-900 flex items-center gap-2 transition"
              >
                <Copy size={16} className="text-neutral-300" />
                <span className="text-neutral-300 text-sm">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------- */}
      {/* USING KEY */}
      {/* ---------------------------------------------- */}
      <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 space-y-6">
        <h2 className="text-white text-lg font-medium">Using Your API Key</h2>

        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={codeStyle}
          codeTagProps={codeTagProps}
        >
          {wsCode}
        </SyntaxHighlighter>

        <SyntaxHighlighter
          language="http"
          style={oneDark}
          customStyle={codeStyle}
          codeTagProps={codeTagProps}
        >
          {httpCode}
        </SyntaxHighlighter>
      </div>

      {/* ---------------------------------------------- */}
      {/* BEST PRACTICES */}
      {/* ---------------------------------------------- */}
      <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-3">
        <h3 className="text-white text-lg font-medium">Best Practices</h3>

        <ul className="space-y-2 text-neutral-300">
          <li>Store API keys securely.</li>
          <li>Use different keys for dev / prod.</li>
          <li>Rotate keys regularly.</li>
          <li>Revoke compromised keys immediately.</li>
        </ul>
      </div>
    </div>
  );
}
