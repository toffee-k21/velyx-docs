"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface KeyEntry {
  _id: string;
  appId: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  revoked: boolean;
}

export function GenerateAPIKey() {
  const { data: session }: any = useSession();

  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [appName, setAppName] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);

  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* ---------------- Shared Prism styles ---------------- */
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

  if (!session) {
    return (
      <div className="text-red-400 text-sm">
        You must be logged in to access this page.
      </div>
    );
  }

  /* ---------------- Fetch Keys ---------------- */
  useEffect(() => {
    if (!session?.backendToken) return;

    fetch("http://localhost:5001/key/get-keys", {
      headers: {
        Authorization: `Bearer ${session.backendToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setKeys(data.keys));
  }, [session]);

  /* ---------------- Create Project ---------------- */
  const createProject = async () => {
    if (!appName.trim()) return alert("Enter project name");

    const res = await fetch("http://localhost:5001/key/create-app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendToken}`,
      },
      body: JSON.stringify({ appName }),
    });

    const data = await res.json();

    setApiKey(data.apiKey);
    setKeys((prev) => [data, ...prev]);
    setAppName("");
    setVisible(true);
  };

  /* ---------------- Revoke ---------------- */
  const revoke = async (id: string) => {
    if (!confirm("Revoke this API key?")) return;

    setKeys((prev) =>
      prev.map((k) => (k.appId === id ? { ...k, revoked: true } : k))
    );
  };

  /* ---------------- Copy ---------------- */
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

  /* ---------------- Code Examples ---------------- */
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

      {/* ---------------- HEADER ---------------- */}
      <div>
        <h1 className="text-3xl font-semibold text-white">API Keys</h1>
        <p className="text-neutral-400">
          Create projects and manage API access.
        </p>
      </div>

      {/* ---------------- NEW KEY ---------------- */}
      {apiKey && (
        <div className="rounded-xl border border-green-900/40 bg-green-950/30 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-400 font-medium">New API key created</h3>
            <span className="text-xs text-green-500">Shown only once</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-white truncate">
              {visible ? apiKey : "•".repeat(40)}
            </div>

            <button
              onClick={() => setVisible(!visible)}
              className="text-neutral-500 hover:text-white"
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <button
              onClick={() => copyKey(apiKey)}
              className="px-4 py-2 bg-green-600/10 text-green-400 border border-green-700/40 rounded-lg hover:bg-green-600/20"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <p className="text-xs text-neutral-400">
            Store this key securely. You won’t be able to view it again.
          </p>
        </div>
      )}

      {/* ---------------- CREATE PROJECT ---------------- */}
      <div className="rounded-xl border border-neutral-800 bg-[#0B0B0B] p-5 space-y-4">
        <h3 className="text-white font-medium">Create new project</h3>

        <input
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="my-chat-app"
          className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white"
        />

        <button
          onClick={createProject}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200 cursor-pointer"
        >
          Create project
        </button>
      </div>

      {/* ---------------- PROJECT LIST ---------------- */}
      <div className="space-y-3">
        <h2 className="text-white font-medium">Your projects</h2>

        {keys.length === 0 ? (
          <p className="text-neutral-500 text-sm">No projects yet.</p>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div
                key={k._id}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-black px-4 py-3 hover:border-neutral-700"
              >
                <div>
                  <p className="text-white font-medium">{k.appName}</p>
                  <p className="text-xs text-neutral-500">
                    Created {new Date(k.createdAt).toLocaleDateString()}
                  </p>
                  {k.revoked && (
                    <p className="text-xs text-red-400 mt-1">Revoked</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!k.revoked && (
                    <button
                      onClick={() => copyKey(k.apiKey, k.appId)}
                      className="text-neutral-400 hover:text-white"
                    >
                      {copiedId === k.appId ? "Copied" : <Copy size={16} />}
                    </button>
                  )}

                  <button
                    onClick={() => revoke(k.appId)}
                    className="text-neutral-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- USING API KEY (FIXED) ---------------- */}
      <div className="rounded-xl border border-neutral-800 bg-[#0D0D0D] p-6 space-y-6">
        <h2 className="text-white font-medium">Using your API key</h2>

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

      {/* ---------------- BEST PRACTICES ---------------- */}
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6 space-y-3">
        <h3 className="text-white font-medium">Best practices</h3>
        <ul className="text-neutral-300 text-sm space-y-1">
          <li>• Never expose keys in frontend code</li>
          <li>• Use separate keys for dev & prod</li>
          <li>• Rotate keys periodically</li>
          <li>• Revoke compromised keys immediately</li>
        </ul>
      </div>
    </div>
  );
}
