export function ReconnectionGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-white">WebSocket Reconnection & Re-Subscription</h1>
        <p className="text-white/60 text-lg">
          Ensure your clients automatically recover from disconnects, container restarts, 
          and network interruptions.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Intro */}
      <div className="space-y-6">
        <p className="text-white/80">
          WebSocket connections can drop during deployments, container restarts, or temporary 
          network issues. To guarantee reliable real-time updates, your client must automatically 
          <span className="text-[#0066FF]"> reconnect</span> and 
          <span className="text-[#0066FF]"> re-subscribe</span> to all topics it was listening to.
        </p>

      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Auto Reconnect */}
      <div className="space-y-3">
        <h2 className="text-white">1. Auto-Reconnect</h2>
        <p className="text-white/70 text-sm">
          When the WebSocket disconnects for <span className="text-white">any reason</span> 
          (container restart, network drop, etc.), the client should reconnect automatically.
        </p>

        <div className="bg-black border border-white/10 rounded-lg p-5">
          <pre className="text-white/80 text-sm overflow-x-auto">
            <code>{`socket.onclose = () => {
  console.warn("Disconnected. Reconnecting...");
  setTimeout(connect, 500); // reconnect after 500ms
};`}</code>
          </pre>
        </div>

        <p className="text-white/60 text-xs">
          This allows clients to instantly recover when a container dies or the system scales.
        </p>
      </div>

      {/* Auto Re Subscribe */}
      <div className="space-y-3">
        <h2 className="text-white">2. Auto-Re-Subscribe on Reconnect</h2>
        <p className="text-white/70 text-sm">
          After reconnecting, the client must resubscribe to all topics it previously subscribed to.
        </p>

        <div className="bg-black border border-white/10 rounded-lg p-5">
          <pre className="text-white/80 text-sm overflow-x-auto">
            <code>{`socket.onopen = () => {
  for (const topic of subscribedTopics) {
    socket.send(JSON.stringify({ type: "subscribe", topic }));
  }
};`}</code>
          </pre>
        </div>

        <p className="text-white/60 text-xs">
          This restores the client's state on the new WebSocket connection.
        </p>
      </div>

      {/* How It Works */}
      <div className="space-y-3">
        <h2 className="text-white">How Both Together Handle Container Restarts</h2>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
          <ul className="space-y-2 text-white/70 text-sm">
            <li>• A WebSocket container restarts or is replaced by the load balancer</li>
            <li>• The client's WebSocket disconnects → <span className="text-white">onclose triggers</span></li>
            <li>• Client automatically establishes a new WebSocket connection</li>
            <li>• Once connected → client resubscribes to all saved topics</li>
            <li>• Real-time delivery resumes with no manual refresh</li>
          </ul>
        </div>

        <p className="text-white/60 text-xs">
          This self-healing behavior allows Velyx to scale horizontally with zero downtime for users.
        </p>
      </div>

      {/* Full Example */}
      <div className="space-y-3">
        <h2 className="text-white">Full Client Example</h2>

        <div className="bg-black border border-white/10 rounded-lg p-5">
          <pre className="text-white/80 text-sm overflow-x-auto">
            <code>{`let socket;
let subscribedTopics = new Set();

function connect() {
  socket = new WebSocket("wss://velyx.io/ws?apiKey=YOUR_KEY");

  socket.onopen = () => {
    // Re-subscribe to all previous topics
    for (const topic of subscribedTopics) {
      socket.send(JSON.stringify({ type: "subscribe", topic }));
    }
  };

  socket.onclose = () => {
    console.log("Reconnecting...");
    setTimeout(connect, 500);
  };

  socket.onerror = () => socket.close();
}

function subscribe(topic) {
  subscribedTopics.add(topic);
  socket.send(JSON.stringify({ type: "subscribe", topic }));
}

connect();`}</code>
          </pre>
        </div>

        <p className="text-white/60 text-xs">
          This example handles reconnections, resubscriptions, and container restarts automatically.
        </p>
      </div>

      {/* Final Notes */}
      <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
        <h3 className="text-white mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>• Reconnect + Resubscribe = resilient real-time experience</li>
          <li>• Required for handling container restarts & scaling events</li>
          <li>• No manual user action or page refresh needed</li>
          <li>• Works seamlessly across multiple WebSocket instances</li>
        </ul>
      </div>
    </div>
  );
}
