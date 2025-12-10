import { useState } from 'react';
import { Lock, Eye, EyeOff, Copy, RefreshCw, Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export function GenerateAPIKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session) {
    alert("not authorized !")
    return;
  }

  const generateKey = () => {
    const key = 'vx_' + Array.from({ length: 32 }, () => 
      Math.random().toString(36)[2] || '0'
    ).join('');
    setApiKey(key);
    setIsVisible(true);
  };

  const regenerateKey = () => {
    if (confirm('Are you sure you want to regenerate your API key? The old key will stop working immediately.')) {
      generateKey();
    }
  };

  const revokeKey = () => {
    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      setApiKey(null);
      setIsVisible(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Generate API Key</h1>
        <p className="text-white/60 text-lg">
          Create and manage your Velyx API keys.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
          <p className="text-amber-100/90">
            <span className="text-amber-200">Important:</span> Treat your API key like a password. 
            Never share it publicly or commit it to version control. Store it securely in environment variables.
          </p>
        </div>

        {!apiKey ? (
          <div className="space-y-4">
            <button
              onClick={generateKey}
              className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg transition-colors duration-200"
            >
              Generate New API Key
            </button>
            <p className="text-white/60 text-sm">
              Click to create your first API key. You can regenerate or revoke it at any time.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-white/80 text-sm">Your API Key</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white flex items-center justify-between">
                  <span>{isVisible ? apiKey : '•'.repeat(40)}</span>
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={regenerateKey}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
              <button
                onClick={revokeKey}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Revoke</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-white">Using Your API Key</h2>
          
          <div className="space-y-3">
            <h3 className="text-white/80">WebSocket Connection</h3>
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <pre className="text-white/70 text-sm overflow-x-auto">
                <code>{`const ws = new WebSocket(
  "wss://velyx.io/ws?apiKey=${apiKey || 'YOUR_API_KEY'}"
);`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white/80">HTTP Publish Request</h3>
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <pre className="text-white/70 text-sm overflow-x-auto">
                <code>{`POST https://velyx.io/publish
x-api-key: ${apiKey || 'YOUR_API_KEY'}
Content-Type: application/json

{
  "topic": "your-topic",
  "data": { "message": "Hello!" }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-5">
          <h3 className="text-white mb-3">Best Practices</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Store API keys in environment variables, never hardcode them</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Use different keys for development, staging, and production</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Rotate keys regularly as part of your security practices</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Revoke compromised keys immediately and generate new ones</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
