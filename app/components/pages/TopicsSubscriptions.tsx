export function TopicsSubscriptions() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Topics & Subscriptions</h1>
        <p className="text-white/60 text-lg">
          Learn how Velyx routes messages using topics and subscription patterns.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          Topics are the foundation of Velyx's pub/sub model. They define channels through which events flow, 
          allowing you to organize real-time communication in a logical, scalable way.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-white">What is a Topic?</h2>
            <p className="text-white/70">
              A topic is a named channel that clients can subscribe to. When your backend publishes an event 
              to a topic, Velyx instantly delivers that event to all currently subscribed clients.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-[#0066FF] text-sm mb-1">Example Topics</div>
                  <ul className="space-y-2 text-white/70 font-mono text-sm">
                    <li className="flex items-start">
                      <span className="text-white/40 mr-3">•</span>
                      <span>chat:room-42</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white/40 mr-3">•</span>
                      <span>notifications:user-123</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white/40 mr-3">•</span>
                      <span>game:match-abc-xyz</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white/40 mr-3">•</span>
                      <span>stock:prices:AAPL</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white/40 mr-3">•</span>
                      <span>dashboard:analytics:realtime</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Topic Naming Conventions</h2>
            <p className="text-white/70">
              Use descriptive, hierarchical names with colons as separators. This makes your event architecture 
              self-documenting and easier to manage.
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`// Pattern: <feature>:<resource>:<identifier>

// Good topic names
"chat:room-42"
"notifications:user-alice"
"game:lobby-premium"
"orders:status:ord_123456"

// Avoid
"room42"              // Not descriptive
"user-alice-notif"    // Inconsistent format
"CHAT_ROOM_42"        // Use lowercase with colons`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Subscribing to Topics</h2>
            <p className="text-white/70">
              Clients subscribe to topics via WebSocket by sending a subscribe action. Multiple subscriptions 
              are supported on a single connection.
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`// Subscribe to a single topic
ws.send(JSON.stringify({
  action: "subscribe",
  topic: "chat:room-42"
}));

// Subscribe to multiple topics
const topics = [
  "chat:room-42",
  "notifications:user-alice",
  "presence:online"
];

topics.forEach(topic => {
  ws.send(JSON.stringify({
    action: "subscribe",
    topic
  }));
});`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Unsubscribing from Topics</h2>
            <p className="text-white/70">
              When a client no longer needs events from a topic, unsubscribe to reduce unnecessary traffic:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`ws.send(JSON.stringify({
  action: "unsubscribe",
  topic: "chat:room-42"
}));

// All subscriptions are automatically removed when the connection closes`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Subscription Mapping & Fan-out</h2>
            <p className="text-white/70">
              Velyx maintains an internal subscription map that tracks which connections are subscribed to 
              which topics. When you publish an event, Velyx performs instant fan-out to all subscribers.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-white">How Fan-out Works</div>
                  <ol className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start">
                      <span className="text-[#0066FF] mr-3">1.</span>
                      <span>Backend publishes event to topic <code className="text-white bg-white/5 px-1 rounded">chat:room-42</code></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066FF] mr-3">2.</span>
                      <span>Velyx looks up all connections subscribed to that topic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066FF] mr-3">3.</span>
                      <span>Event is instantly delivered to all matching connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#0066FF] mr-3">4.</span>
                      <span>Each client receives the exact same event payload</span>
                    </li>
                  </ol>
                </div>
                <div className="bg-black border border-white/10 rounded-lg p-4 mt-4">
                  <div className="text-white/60 text-sm">
                    Velyx can fan-out a single event to millions of subscribers in under 100ms, 
                    with automatic scaling and load distribution.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Topic Isolation & Security</h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
              <ul className="space-y-2 text-amber-100/90">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3">•</span>
                  <span>Topics are scoped to your API key - complete isolation between accounts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3">•</span>
                  <span>Any client with your API key can subscribe to any topic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3">•</span>
                  <span>Implement authorization in your backend before publishing sensitive events</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3">•</span>
                  <span>Use topic naming to logically separate data (e.g., user IDs, room IDs)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Dynamic Subscriptions</h2>
            <p className="text-white/70">
              Clients can subscribe and unsubscribe dynamically as users navigate your application:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`// React example: Subscribe when entering a chat room
useEffect(() => {
  const topic = \`chat:room-\${roomId}\`;
  
  ws.send(JSON.stringify({
    action: "subscribe",
    topic
  }));
  
  // Unsubscribe when leaving
  return () => {
    ws.send(JSON.stringify({
      action: "unsubscribe",
      topic
    }));
  };
}, [roomId]);`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
            <h3 className="text-white mb-3">Best Practices</h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Use consistent, hierarchical naming for topics</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Include identifiers in topic names (user IDs, room IDs, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Unsubscribe from topics when no longer needed to reduce traffic</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Validate user permissions in your backend before publishing</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Keep topic names under 256 characters for optimal performance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
