import { Code2, Package } from 'lucide-react';

export function SDKs() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">SDKs</h1>
        <p className="text-white/60 text-lg">
          Official SDKs and libraries for integrating Velyx into your applications.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="flex flex-col items-center justify-center py-16 space-y-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0066FF]/20 to-[#0066FF]/5 border border-[#0066FF]/30 flex items-center justify-center">
          <Package className="w-10 h-10 text-[#0066FF]" />
        </div>

        <div className="text-center space-y-3 max-w-xl">
          <h2 className="text-white">Coming Soon</h2>
          <p className="text-white/60">
            We're working on official SDKs for popular languages and frameworks to make integration 
            even easier. While you wait, the WebSocket and HTTP APIs are simple to use directly.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-white">JavaScript/TypeScript</h3>
            </div>
            <p className="text-white/60 text-sm">
              Full-featured client with automatic reconnection, TypeScript types, and React hooks.
            </p>
            <div className="bg-black border border-white/10 rounded px-3 py-2">
              <code className="text-white/40 text-xs">@velyx/client</code>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-white">Python</h3>
            </div>
            <p className="text-white/60 text-sm">
              Async-first Python client with support for Django, Flask, and FastAPI integrations.
            </p>
            <div className="bg-black border border-white/10 rounded px-3 py-2">
              <code className="text-white/40 text-xs">velyx-python</code>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-white">Go</h3>
            </div>
            <p className="text-white/60 text-sm">
              High-performance Go client with goroutine-safe operations and context support.
            </p>
            <div className="bg-black border border-white/10 rounded px-3 py-2">
              <code className="text-white/40 text-xs">github.com/velyx/go-velyx</code>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-white">Ruby</h3>
            </div>
            <p className="text-white/60 text-sm">
              Elegant Ruby gem with Rails integration and ActiveSupport instrumentation.
            </p>
            <div className="bg-black border border-white/10 rounded px-3 py-2">
              <code className="text-white/40 text-xs">gem install velyx</code>
            </div>
          </div>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6 max-w-2xl mt-8">
          <h3 className="text-white mb-3">In the Meantime</h3>
          <p className="text-white/70 mb-4">
            The Velyx APIs are designed to be simple and language-agnostic. You can integrate today using:
          </p>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Native WebSocket support in your language (available in virtually all modern languages)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Any HTTP client library for publishing events</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Our comprehensive API documentation and examples</span>
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <a 
            href="mailto:sdk-early-access@velyx.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg transition-colors duration-200"
          >
            Request Early Access
          </a>
        </div>
      </div>
    </div>
  );
}
