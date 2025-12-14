export function WebSocketConnections() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">WebSocket Connections</h1>
        <p className="text-white/60 text-lg">
          Understanding how Velyx manages WebSocket connections at scale.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          Velyx handles all the complexity of WebSocket connection management, from initial handshake to 
          graceful disconnection. Our infrastructure automatically scales to support millions of concurrent 
          connections with minimal latency.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-white">Connection Lifecycle</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span className="text-white">Handshake</span>
                </div>
                <p className="text-white/70 text-sm ml-5">
                  Client initiates connection with API key. Velyx validates credentials and establishes 
                  a persistent WebSocket connection.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span className="text-white">Active State</span>
                </div>
                <p className="text-white/70 text-sm ml-5">
                  Connection remains open for bidirectional communication. Client can subscribe to topics, 
                  receive events, and send control messages.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span className="text-white">Heartbeat</span>
                </div>
                <p className="text-white/70 text-sm ml-5">
                  Velyx sends periodic ping frames to detect stale connections. Clients should respond 
                  with pong frames (most browsers handle this automatically).
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                  <span className="text-white">Disconnection</span>
                </div>
                <p className="text-white/70 text-sm ml-5">
                  When a connection closes, Velyx automatically removes all topic subscriptions and 
                  cleans up resources. No manual cleanup required.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Automatic Reconnection</h2>
            <p className="text-white/70">
              Network interruptions are inevitable. Implement reconnection logic in your client to handle 
              temporary disconnections gracefully:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`class VelyxClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.subscriptions = new Set();
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(
      \`wss://velyx.me/ws?apiKey=\${this.apiKey}\`
    );

    this.ws.onopen = () => {
      console.log('Connected to Velyx');
      this.reconnectAttempts = 0;
      
      // Re-subscribe to all topics
      this.subscriptions.forEach(topic => {
        this.subscribe(topic);
      });
    };

    this.ws.onclose = () => {
      console.log('Disconnected from Velyx');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      
      console.log(\`Reconnecting in \${delay}ms...\`);
      setTimeout(() => this.connect(), delay);
    }
  }

  subscribe(topic) {
    this.subscriptions.add(topic);
    this.ws.send(JSON.stringify({
      action: 'subscribe',
      topic
    }));
  }
}`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Connection Limits & Scaling</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">No connection limits</span> - Velyx scales automatically 
                  from 10 to 10 million concurrent connections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">Global distribution</span> - Connections are routed to 
                  the nearest edge location for minimal latency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">Load balancing</span> - Connections are distributed across 
                  multiple servers with automatic failover</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">Resource isolation</span> - Each API key gets dedicated 
                  resources, ensuring your traffic doesn't affect others</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Connection State Management</h2>
            <p className="text-white/70">
              Velyx maintains connection state internally, but you may want to track connection status in your application:
            </p>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`const [connectionState, setConnectionState] = useState('disconnected');

const ws = new WebSocket('wss://velyx.me/ws?apiKey=YOUR_KEY');

ws.onopen = () => {
  setConnectionState('connected');
};

ws.onclose = () => {
  setConnectionState('disconnected');
};

ws.onerror = () => {
  setConnectionState('error');
};

// Display connection status in your UI
<ConnectionIndicator status={connectionState} />`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
            <h3 className="text-white mb-3">Best Practices</h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Implement exponential backoff for reconnection attempts</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Store subscription state locally to re-subscribe after reconnection</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Show connection status in your UI for transparency</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Handle connection errors gracefully with fallback options</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Close connections when users navigate away to free resources</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
