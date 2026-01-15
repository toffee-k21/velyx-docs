"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  const [apiKey, setApiKey] = useState<string | null>(null);

  const [visibleNewKey, setVisibleNewKey] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* ---------------- Helpers ---------------- */

  const maskKey = (key: string) =>
    "•".repeat(Math.min(key.length, 40));

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    console.log(process.env.NEXT_PUBLIC_VELYXSERVER_URL);

    fetch(`${process.env.NEXT_PUBLIC_VELYXSERVER_URL}/key/get-keys`, {
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_VELYXSERVER_URL}/key/create-app`, {
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
    setVisibleNewKey(true);
  };

  /* ---------------- delete ---------------- */

  const deleteKey = async (apiKey: string) => {
    if (!confirm("Delete this API key permanently?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_VELYXSERVER_URL}/key/delete/${apiKey}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.backendToken}`,
        },
      }
    );

    if (!res.ok) {
      alert("Failed to delete API key");
      return;
    }

    setKeys((prev) =>
      prev.filter((k) => k.apiKey !== apiKey)
    );
  };

  /* ---------------- Code Examples ---------------- */

  const wsCode = `const ws = new WebSocket(
  "wss://velyx.me/ws?apiKey=${apiKey || "YOUR_API_KEY"}"
);`;

  const httpCode = `POST https://velyx.me/publish
x-api-key: ${apiKey || "YOUR_API_KEY"}
Content-Type: application/json

{
  "topic": "your-topic",
  "data": { "message": "Hello!" }
}`;

  /* ---------------- Render ---------------- */

  return (
    <div className="space-y-12 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-white">API Keys</h1>
        <p className="text-neutral-400">
          Create projects and manage API access.
        </p>
      </div>

      {/* New Key */}
      {apiKey && (
        <div className="rounded-xl border border-green-900/40 bg-green-950/30 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-400 font-medium">
              New API key created
            </h3>
            <span className="text-xs text-green-500">
              Shown only once
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 bg-black border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-white truncate">
              {visibleNewKey ? apiKey : maskKey(apiKey)}
            </div>

            <button
              onClick={() => setVisibleNewKey(!visibleNewKey)}
              className="text-neutral-500 hover:text-white"
            >
              {visibleNewKey ? <EyeOff size={18} /> : <Eye size={18} />}
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

      {/* Create Project */}
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
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
        >
          Create project
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        <h2 className="text-white font-medium">Your projects</h2>

        {keys?.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No projects yet.
          </p>
        ) : (
          <div className="space-y-2">
            {keys?.map((k) => (
              <div
                key={k._id}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-black px-4 py-3 hover:border-neutral-700"
              >
                <div>
                  <p className="text-white font-medium">
                    {k.appName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Created{" "}
                    {new Date(k.createdAt).toLocaleDateString()}
                  </p>
                  {k.deleted && (
                    <p className="text-xs text-red-400 mt-1">
                      deleted
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {!k.deleted && (
                    <>
                      <div className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1 font-mono text-xs text-white max-w-[320px] truncate">
                        {visibleKeys[k.appId]
                          ? k.apiKey
                          : maskKey(k.apiKey)}
                      </div>

                      <button
                        onClick={() =>
                          toggleVisibility(k.appId)
                        }
                        className="text-neutral-500 hover:text-white"
                      >
                        {visibleKeys[k.appId] ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          copyKey(k.apiKey, k.appId)
                        }
                        className="text-neutral-400 hover:text-white"
                      >
                        {copiedId === k.appId ? (
                          "Copied"
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => deleteKey(k.apiKey)}
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

      {/* Best Practices */}
      <div className="rounded-xl border border-neutral-800 bg-[#111111] p-6 space-y-3">
        <h3 className="text-white font-medium">
          Best practices
        </h3>
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
