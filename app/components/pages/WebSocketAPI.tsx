export function WebSocketAPI() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">WebSocket API</h1>
        <p className="text-white/60 text-lg">
          Complete reference for the Velyx WebSocket protocol.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-white">Connection</h2>
          <p className="text-white/70">
            Establish a WebSocket connection to Velyx by including your API key in the connection URL.
          </p>
          <div className="bg-black border border-white/10 rounded-lg p-5">
            <div className="space-y-2">
              <div className="text-white/40 text-xs">Endpoint</div>
              <code className="text-white">wss://velyx.io/ws?apiKey=YOUR_API_KEY</code>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-3">
            <div className="text-white text-sm">Query Parameters</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <code className="text-[#0066FF] mr-3">apiKey</code>
                <span className="text-white/70">Your Velyx API key (required)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Client → Server Messages</h2>
          <p className="text-white/70">
            All client-to-server messages must be valid JSON with an <code className="text-white bg-white/5 px-1 rounded">action</code> field.
          </p>

          <div className="space-y-6 mt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded">subscribe</span>
                <h3 className="text-white">Subscribe to a Topic</h3>
              </div>
              <p className="text-white/60 text-sm">
                Subscribe to receive events published to a specific topic.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "action": "subscribe",
  "topic": "chat:room-42"
}`}</code>
                </pre>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="text-white">Fields</div>
                  <ul className="space-y-1 text-white/70">
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">action</code>
                      <span>Must be "subscribe"</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">topic</code>
                      <span>The topic name to subscribe to (string, max 256 chars)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded">unsubscribe</span>
                <h3 className="text-white">Unsubscribe from a Topic</h3>
              </div>
              <p className="text-white/60 text-sm">
                Stop receiving events from a previously subscribed topic.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "action": "unsubscribe",
  "topic": "chat:room-42"
}`}</code>
                </pre>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="text-white">Fields</div>
                  <ul className="space-y-1 text-white/70">
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">action</code>
                      <span>Must be "unsubscribe"</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">topic</code>
                      <span>The topic name to unsubscribe from (string)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded">ping</span>
                <h3 className="text-white">Ping (Optional)</h3>
              </div>
              <p className="text-white/60 text-sm">
                Send a ping to verify connection is alive. Server will respond with a pong.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "action": "ping"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Server → Client Messages</h2>
          <p className="text-white/70">
            Messages sent from Velyx to your client.
          </p>

          <div className="space-y-6 mt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded">event</span>
                <h3 className="text-white">Published Event</h3>
              </div>
              <p className="text-white/60 text-sm">
                An event published to a topic you're subscribed to.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "type": "event",
  "topic": "chat:room-42",
  "data": {
    "user": "alice",
    "message": "Hello world!",
    "timestamp": "2025-12-07T10:30:00Z"
  }
}`}</code>
                </pre>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="text-white">Fields</div>
                  <ul className="space-y-1 text-white/70">
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">type</code>
                      <span>Always "event" for published events</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">topic</code>
                      <span>The topic this event was published to</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-[#0066FF] mr-2">data</code>
                      <span>The event payload (whatever was published)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded">pong</span>
                <h3 className="text-white">Pong Response</h3>
              </div>
              <p className="text-white/60 text-sm">
                Response to a ping message.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "type": "pong"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">error</span>
                <h3 className="text-white">Error Message</h3>
              </div>
              <p className="text-white/60 text-sm">
                Sent when an error occurs processing your request.
              </p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "type": "error",
  "message": "Invalid topic name",
  "code": "INVALID_TOPIC"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Error Codes</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white text-sm">Code</th>
                  <th className="text-left p-4 text-white text-sm">Description</th>
                </tr>
              </thead>
              <tbody className="text-white/70 text-sm">
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">INVALID_API_KEY</code></td>
                  <td className="p-4">The provided API key is invalid or expired</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">INVALID_ACTION</code></td>
                  <td className="p-4">The action field is missing or unknown</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">INVALID_TOPIC</code></td>
                  <td className="p-4">Topic name is invalid or too long</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">RATE_LIMIT</code></td>
                  <td className="p-4">Too many requests, slow down</td>
                </tr>
                <tr>
                  <td className="p-4"><code className="text-[#0066FF]">INTERNAL_ERROR</code></td>
                  <td className="p-4">Server error, try again later</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-white">Complete Example</h2>
          <div className="bg-black border border-white/10 rounded-lg p-5">
            <pre className="text-white/80 text-sm overflow-x-auto">
              <code>{`const ws = new WebSocket("wss://velyx.io/ws?apiKey=YOUR_API_KEY");

ws.onopen = () => {
  console.log("Connected");
  
  // Subscribe to topics
  ws.send(JSON.stringify({
    action: "subscribe",
    topic: "notifications:user-123"
  }));
  
  ws.send(JSON.stringify({
    action: "subscribe",
    topic: "chat:room-42"
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.type === "event") {
    console.log(\`Event on \${message.topic}:\`, message.data);
    // Handle the event based on topic
  } else if (message.type === "error") {
    console.error(\`Error: \${message.message}\`);
  }
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};

ws.onclose = () => {
  console.log("Disconnected");
  // Implement reconnection logic
};`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
          <h3 className="text-white mb-3">Best Practices</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Always validate JSON before sending messages</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Handle all message types (event, pong, error) in your onmessage handler</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Implement error handling and display errors to users when appropriate</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Use ping/pong to detect connection issues if needed</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Close connections properly when users navigate away</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
