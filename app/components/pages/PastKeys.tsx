"use client";

import { useEffect, useState } from "react";
import { Copy, Trash2 } from "lucide-react";

interface KeyEntry {
  id: string;
  apiKey: string;
  createdAt: string;
  revoked: boolean;
  appName: string;
}

export function PastKeys() {
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => setKeys(data.keys));
  }, []);

  const copy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

  return (
    <div className="space-y-4">

      <h3 className="text-white text-lg font-medium">Your API Keys</h3>

      {keys.length === 0 ? (
        <p className="text-neutral-500 text-sm">
          No API keys found. Create one below.
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

                <span className="font-mono text-sm text-neutral-300">
                  {k.apiKey}
                </span>

                <span className="text-neutral-500 text-xs">
                  Created: {new Date(k.createdAt).toLocaleString()}
                </span>

                {k.revoked && (
                  <span className="text-red-400 text-xs mt-1">Revoked</span>
                )}
              </div>

              {!k.revoked && (
                <div className="flex items-center gap-3">
                  {/* COPY */}
                  <button
                    onClick={() => copy(k.apiKey, k.id)}
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {copiedId === k.id ? "Copied!" : <Copy size={16} />}
                  </button>

                  {/* REVOKE */}
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
  );
}
