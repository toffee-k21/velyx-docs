export function Authentication() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Authentication</h1>
        <p className="text-white/60 text-lg">
          Secure your Velyx integration with API key authentication.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          Velyx uses API keys to authenticate all requests. Each API key is unique to your account and 
          should be treated with the same security as a password.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-white mb-4">WebSocket Authentication</h2>
            <p className="text-white/70 mb-4">
              Pass your API key as a query parameter when establishing WebSocket connections:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`const ws = new WebSocket("wss://velyx.io/ws?apiKey=YOUR_API_KEY");`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h2 className="text-white mb-4">HTTP Authentication</h2>
            <p className="text-white/70 mb-4">
              For HTTP publish requests, include your API key in the <code className="text-[#0066FF] bg-white/5 px-2 py-1 rounded">x-api-key</code> header:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`POST https://velyx.io/publish
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "topic": "chat:room-1",
  "data": { "message": "Hello" }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 space-y-3">
          <h3 className="text-amber-200">Security Best Practices</h3>
          <ul className="space-y-2 text-amber-100/80">
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">•</span>
              <span>Never expose API keys in client-side code or public repositories</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">•</span>
              <span>Use environment variables to store keys in your backend services</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">•</span>
              <span>Rotate keys periodically and after any suspected compromise</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">•</span>
              <span>Only WebSocket connections from frontend are allowed; HTTP publish must be server-side</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mr-3">•</span>
              <span>Monitor your API usage for any unusual patterns</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-white mb-3">Authentication Flow</h3>
          <ol className="space-y-3 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">1.</span>
              <span>Client connects to Velyx with API key</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">2.</span>
              <span>Velyx validates the key and establishes the connection</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">3.</span>
              <span>Client can now subscribe to topics and receive events</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">4.</span>
              <span>Backend publishes events using the same API key via HTTP</span>
            </li>
          </ol>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-5">
          <p className="text-white/80">
            <span className="text-[#0066FF]">Next:</span> Visit the <span className="text-white">Generate API Key</span> page 
            to create your first API key and start building.
          </p>
        </div>
      </div>
    </div>
  );
}
