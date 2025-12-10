export function BuildChat() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Build a Realtime Chat App</h1>
        <p className="text-white/60 text-lg">
          A complete step-by-step guide to building a real-time chat application with Velyx.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-8">
        <p className="text-white/80">
          This guide will walk you through creating a fully functional real-time chat application. 
          We'll cover connecting clients, subscribing to chat rooms, receiving messages, and publishing 
          from your backend.
        </p>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white text-sm">1</div>
              <h2 className="text-white">Connect Your Client</h2>
            </div>
            <p className="text-white/70 ml-11">
              First, establish a WebSocket connection from your frontend. Pass your API key as a query parameter.
            </p>
            <div className="ml-11 bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`const ws = new WebSocket("wss://velyx.io/ws?apiKey=YOUR_API_KEY");

ws.onopen = () => {
  console.log("Connected to Velyx");
};

ws.onerror = (error) => {
  console.error("Connection error:", error);
};

ws.onclose = () => {
  console.log("Disconnected from Velyx");
};`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white text-sm">2</div>
              <h2 className="text-white">Subscribe to a Chat Room</h2>
            </div>
            <p className="text-white/70 ml-11">
              Once connected, subscribe to a specific chat room topic. Users in the same room will share messages.
            </p>
            <div className="ml-11 bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`ws.onopen = () => {
  // Subscribe to chat room 42
  ws.send(JSON.stringify({
    action: "subscribe",
    topic: "chat:room-42"
  }));
  
  console.log("Subscribed to chat:room-42");
};`}</code>
              </pre>
            </div>
            <div className="ml-11 bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/70 text-sm">
                <span className="text-[#0066FF]">Topic naming:</span> Use a consistent naming pattern like 
                <code className="text-white bg-white/5 px-2 py-1 rounded mx-1">chat:room-{'{id}'}</code> 
                to organize your channels logically.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white text-sm">3</div>
              <h2 className="text-white">Receive Messages</h2>
            </div>
            <p className="text-white/70 ml-11">
              Listen for incoming messages and update your UI when new chat messages arrive.
            </p>
            <div className="ml-11 bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Handle different message types
  if (data.type === 'message') {
    console.log("New message:", data);
    
    // Update your UI
    addMessageToChat({
      user: data.user,
      message: data.message,
      timestamp: data.timestamp
    });
  }
};`}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white text-sm">4</div>
              <h2 className="text-white">Publish Messages from Backend</h2>
            </div>
            <p className="text-white/70 ml-11">
              When a user sends a message, your backend validates it and publishes to Velyx. Velyx then delivers 
              it to all subscribed clients in real-time.
            </p>
            <div className="ml-11 bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`POST https://velyx.io/publish
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "topic": "chat:room-42",
  "data": {
    "type": "message",
    "user": "alice",
    "message": "Hello world!",
    "timestamp": "2025-12-07T10:30:00Z"
  }
}`}</code>
              </pre>
            </div>
            <div className="ml-11 space-y-3">
              <p className="text-white/70 text-sm">Example using Node.js:</p>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`// Backend API endpoint
app.post('/api/chat/send', async (req, res) => {
  const { roomId, user, message } = req.body;
  
  // Validate and sanitize message
  const sanitizedMessage = sanitize(message);
  
  // Publish to Velyx
  await fetch('https://velyx.io/publish', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.VELYX_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      topic: \`chat:room-\${roomId}\`,
      data: {
        type: 'message',
        user,
        message: sanitizedMessage,
        timestamp: new Date().toISOString()
      }
    })
  });
  
  res.json({ success: true });
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-4">
          <h2 className="text-white">Complete Frontend Example</h2>
          <p className="text-white/70">
            Here's a complete React component that ties everything together:
          </p>
          <div className="bg-black border border-white/10 rounded-lg p-5">
            <pre className="text-white/80 text-sm overflow-x-auto">
              <code>{`import { useState, useEffect } from 'react';

function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Connect to Velyx
    const socket = new WebSocket(
      \`wss://velyx.io/ws?apiKey=\${process.env.VELYX_API_KEY}\`
    );

    socket.onopen = () => {
      // Subscribe to room
      socket.send(JSON.stringify({
        action: 'subscribe',
        topic: \`chat:room-\${roomId}\`
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      }
    };

    setWs(socket);

    return () => socket.close();
  }, [roomId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Send to your backend
    await fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId,
        user: userId,
        message: input
      })
    });

    setInput('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
          <h3 className="text-white mb-3">Next Steps</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Add typing indicators by publishing <code className="text-white bg-white/5 px-1 rounded">typing</code> events</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Implement user presence with subscribe/unsubscribe events</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Add read receipts and message reactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Scale to multiple rooms and private messaging</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
