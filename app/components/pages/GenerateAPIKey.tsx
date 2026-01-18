"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface KeyEntry {
  _id: string;
  appId: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  deleted: boolean;
}

export function GenerateAPIKey() {
  const { data: session }: any = useSession();

  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [appName, setAppName] = useState("");

  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [newAppId, setNewAppId] = useState<string | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const serverUrl = process.env.NEXT_PUBLIC_VELYXSERVER_URL;

  const copyText = async (value: string, id: string) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      alert("Copy failed. Please copy manually.");
    }
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
    if (!session?.backendToken || !serverUrl) return;

    fetch(`${serverUrl}/key/get-keys`, {
      headers: {
        Authorization: `Bearer ${session.backendToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setKeys(data.keys || []))
      .catch(() => {});
  }, [session, serverUrl]);

  /* ---------------- Create Project ---------------- */
  const createProject = async () => {
    if (!appName.trim()) return alert("Enter project name");
    if (!serverUrl) return alert("Missing NEXT_PUBLIC_VELYXSERVER_URL");

    const res = await fetch(`${serverUrl}/key/create-app`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendToken}`,
      },
      body: JSON.stringify({ appName }),
    });

    const data = await res.json();

    setNewApiKey(data.apiKey);
    setNewAppId(data.appId);
    setKeys((prev) => [data, ...prev]);
    setAppName("");
  };

  /* ---------------- Delete Key ---------------- */
  const deleteKey = async (apiKey: string) => {
    if (!confirm("Delete this API key permanently?")) return;
    if (!serverUrl) return alert("Missing NEXT_PUBLIC_VELYXSERVER_URL");

    const res = await fetch(`${serverUrl}/key/delete/${apiKey}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.backendToken}`,
      },
    });

    if (!res.ok) {
      alert("Failed to delete API key");
      return;
    }

    setKeys((prev) => prev.filter((k) => k.apiKey !== apiKey));
  };

  /* ---------------- Code Examples ---------------- */

  const selectedApiKey = newApiKey || "YOUR_API_KEY";
  const selectedAppId = newAppId || "YOUR_APP_ID";

  const wsSubscribeCode = useMemo(() => {
    return `const ws = new WebSocket("wss://velyx.me/ws?appId=${selectedAppId}");

ws.onopen = () => ws.send(JSON.stringify({
  type: "subscribe",
  topic: "${selectedAppId}:chat:room-1"
}));`;
  }, [selectedAppId]);

  const httpPublishCode = useMemo(() => {
    return `POST https://velyx.me/publish
x-api-key: ${selectedApiKey}
Content-Type: application/json

{
  "topic": "${selectedAppId}:chat:room-1",
  "payload": { "message": "Hello!" }
}`;
  }, [selectedApiKey, selectedAppId]);

  return (
    <div className="space-y-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">Keys</h1>
        <p className="text-neutral-400">
          Create projects and manage API access.
        </p>
      </div>

      {/* New Key Created */}
      {newApiKey && newAppId && (
        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-5 space-y-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-emerald-400 font-medium">
              Project created successfully
            </h3>
            <span className="text-xs text-emerald-500">
              Copy and save these values
            </span>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <p className="text-xs text-neutral-400">
              API Key <span className="text-neutral-500">(Publish)</span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
              <div className="w-full sm:flex-1 min-w-0 bg-black border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-white truncate">
                {newApiKey}
              </div>

              <button
                onClick={() => copyText(newApiKey, "newApiKey")}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600/10 text-emerald-400 border border-emerald-700/40 rounded-lg hover:bg-emerald-600/20"
              >
                {copiedId === "newApiKey" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* App ID */}
          <div className="space-y-2">
            <p className="text-xs text-neutral-400">
              App ID <span className="text-neutral-500">(Namespace)</span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
              <div className="w-full sm:flex-1 min-w-0 bg-black border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-white truncate">
                {newAppId}
              </div>

              <button
                onClick={() => copyText(newAppId, "newAppId")}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600/10 text-emerald-400 border border-emerald-700/40 rounded-lg hover:bg-emerald-600/20"
              >
                {copiedId === "newAppId" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Use <span className="text-white">API Key</span> for HTTP publish and{" "}
            <span className="text-white">App ID</span> inside topic names.
          </p>
        </div>
      )}

      {/* Create Project */}
      <div className="rounded-xl border border-neutral-800 bg-[#0B0B0B] p-5 space-y-4 overflow-hidden">
        <h3 className="text-white font-medium">Create new project</h3>

        <input
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="my-chat-app"
          className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white"
        />

        <button
          onClick={createProject}
          className="w-full sm:w-auto rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
        >
          Create project
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        <h2 className="text-white font-medium">Your projects</h2>

        {keys.length === 0 ? (
          <p className="text-neutral-500 text-sm">No projects yet.</p>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div
                key={k._id}
                className="rounded-lg border border-neutral-800 bg-black px-4 py-3 hover:border-neutral-700 overflow-hidden"
              >
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">{k.appName}</p>
                    <p className="text-xs text-neutral-500">
                      Created {new Date(k.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {!k.deleted && (
                    <button
                      onClick={() => deleteKey(k.apiKey)}
                      className="text-neutral-500 hover:text-red-400 shrink-0"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {k.deleted ? (
                  <p className="text-xs text-red-400 mt-2">deleted</p>
                ) : (
                  <div className="mt-3 grid gap-3">
                    {/* API Key */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-400">
                        API Key{" "}
                        <span className="text-neutral-500">(Publish)</span>
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                        <div className="w-full sm:flex-1 min-w-0 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 font-mono text-xs text-white truncate">
                          {k.apiKey}
                        </div>

                        <button
                          onClick={() => copyText(k.apiKey, `api-${k._id}`)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 text-neutral-400 hover:text-white border border-neutral-800 bg-neutral-950 rounded-md px-3 py-2 shrink-0"
                        >
                          {copiedId === `api-${k._id}` ? "Copied" : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* App ID */}
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-400">
                        App ID{" "}
                        <span className="text-neutral-500">(Namespace)</span>
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                        <div className="w-full sm:flex-1 min-w-0 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 font-mono text-xs text-white truncate">
                          {k.appId}
                        </div>

                        <button
                          onClick={() => copyText(k.appId, `app-${k._id}`)}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 text-neutral-400 hover:text-white border border-neutral-800 bg-neutral-950 rounded-md px-3 py-2 shrink-0"
                        >
                          {copiedId === `app-${k._id}` ? "Copied" : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to use these keys */}
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6 space-y-5 overflow-hidden">
        <div className="space-y-2">
          <h3 className="text-white font-medium">How to use</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Use <span className="text-white">API Key</span> to publish events and{" "}
            <span className="text-white">App ID</span> to namespace topics.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-white text-sm font-medium">WebSocket Subscribe</h4>
          <CodeBlock language="javascript">{wsSubscribeCode}</CodeBlock>
        </div>

        <div className="space-y-3">
          <h4 className="text-white text-sm font-medium">HTTP Publish</h4>
          <CodeBlock language="http">{httpPublishCode}</CodeBlock>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
        <h3 className="text-white font-medium mb-3">Best Practices</h3>
        <ul className="space-y-2 text-neutral-300 text-sm">
          <li>• Use separate keys for dev & prod</li>
          <li>• Rotate keys periodically</li>
          <li>• Revoke compromised keys immediately</li>
          <li>• Prefer publishing from backend in production</li>
        </ul>
      </div>
    </div>
  );
}

/* ================== Code Block Helper ================== */

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="bg-black border border-neutral-800 rounded-lg p-4 sm:p-5 overflow-x-auto max-w-full">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLines={false}
        wrapLongLines={false}
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: 0,
          fontSize: "12.5px",
          lineHeight: "1.6",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            whiteSpace: "pre",
          },
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
