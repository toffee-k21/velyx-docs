export function Introduction() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white text-2xl mb-6">Velyx — Infrastructure for Realtime Experiences</h1>
        <p className="text-white/60 text-lg">
          The modern real-time delivery layer for high-performance applications.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          Velyx is a fully managed real-time infrastructure that handles all the complexity of WebSocket connections, 
          message routing, fan-out, and horizontal scaling. Built for developers who need bulletproof real-time 
          functionality without the operational overhead.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-white">What Velyx Handles</h2>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>WebSocket connection management and lifecycle</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Topic-based routing and subscription mapping</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Horizontal scaling and load distribution</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Message fan-out to thousands of subscribers</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Built-in heartbeats and connection health monitoring</span>
            </li>
            {/* <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Global edge distribution for minimal latency</span>
            </li> */}
          </ul>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6 space-y-3">
          <h3 className="text-white">Your Responsibility: Just Two Things</h3>
          <div className="space-y-4 text-white/80">
            <div>
              <span className="text-[#0066FF]">1. Backend:</span> Send events to Velyx when something happens
            </div>
            <div>
              <span className="text-[#0066FF]">2. Frontend:</span> Update your UI when events arrive
            </div>
          </div>
        </div>

        <p className="text-white/80">
          No more managing WebSocket servers, dealing with connection pools, or worrying about scaling. 
          Velyx provides a simple publish-subscribe model that just works, from 10 to 10 million concurrent connections.
        </p>
      </div>

      <div className="pt-8">
        <h2 className="text-white mb-4 text-2xl">Quick Example</h2>
        <div className="bg-black border border-white/10 rounded-lg p-5 space-y-3">
          <div className="text-white/40 text-sm">Frontend - Connect and subscribe</div>
          <pre className="text-white/80 text-sm overflow-x-auto">
            <code>{`const ws = new WebSocket("wss://velyx.io/ws?apiKey=YOUR_KEY");
ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    topic: "notifications:user-123"
  }));
};`}</code>
          </pre>
        </div>

        <div className="bg-black border border-white/10 rounded-lg p-5 space-y-3 mt-4">
          <div className="text-white/40 text-sm">Backend - Publish an event</div>
          <pre className="text-white/80 text-sm overflow-x-auto">
            <code>{`POST https://velyx.io/publish
x-api-key: YOUR_API_KEY

{
  "topic": "notifications:user-123",
  "data": { "message": "Your order has shipped!" }
}`}</code>
          </pre>
        </div>
      </div>

      <div className="pt-4 text-white/50 text-sm">
        Continue to <span className="text-[#0066FF]">Getting Started → Authentication</span> to begin building with Velyx.
      </div>
    </div>
  );
}
