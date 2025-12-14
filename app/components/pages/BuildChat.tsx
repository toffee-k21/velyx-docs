"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function BuildChat() {
  /* --- SHARED CODE STYLE --- */
  const codeStyle = {
    background: "transparent",
    margin: 0,
    padding: "0",
    fontSize: "13.5px",
    lineHeight: "1.7",
  };

  const codeTagProps = {
    style: {
      background: "transparent",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      whiteSpace: "pre",
    },
  };

  /* --- CODE BLOCKS --- */
  const connectCode = `const ws = new WebSocket("wss://velyx.me/ws?apiKey=YOUR_API_KEY");

ws.onopen = () => {
  console.log("Connected to Velyx");
};

ws.onerror = (error) => {
  console.error("Connection error:", error);
};

ws.onclose = () => {
  console.log("Disconnected from Velyx");
};`;

  const subscribeCode = `ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    topic: "chat:room-42"
  }));

  console.log("Subscribed to chat:room-42");
};`;

  const receiveCode = `ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "message") {
    addMessageToChat({
      user: data.user,
      message: data.message,
      timestamp: data.timestamp
    });
  }
};`;

  const publishCode = `POST https://velyx.me/publish
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
}`;

  const backendNodeExample = `// Backend API endpoint
app.post('/api/chat/send', async (req, res) => {
  const { roomId, user, message } = req.body;

  const sanitizedMessage = sanitize(message);

  await fetch('https://velyx.me/publish', {
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
});`;

  const fullFrontendExample = `import { useState, useEffect } from "react";

function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket(
      \`wss://velyx.me/ws?apiKey=\${process.env.VELYX_API_KEY}\`
    );

    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: "subscribe",
        topic: \`chat:room-\${roomId}\`
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages(prev => [...prev, data]);
      }
    };

    return () => socket.close();
  }, [roomId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        user: userId,
        message: input
      })
    });

    setInput("");
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
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}`;

  return (
    <div className="space-y-12 max-w-3xl">

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Build a Realtime Chat App
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          A complete guide to building a real-time chat application using Velyx.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* INTRO PARAGRAPH */}
      <p className="text-neutral-300 leading-relaxed">
        This guide walks you through connecting clients, subscribing to rooms, receiving messages,
        and publishing from your backend — all powered by Velyx.
      </p>

      {/* STEP 1 */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">1. Connect Your Client</h2>

        <p className="text-neutral-400">
          Establish a WebSocket connection from your frontend and authenticate using your API key.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {connectCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">2. Subscribe to a Chat Room</h2>

        <p className="text-neutral-400">
          After connecting, subscribe to a topic so clients in the same room receive messages together.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {subscribeCode}
          </SyntaxHighlighter>
        </div>

        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-4">
          <p className="text-neutral-300 text-sm">
            <span className="text-white font-medium">Tip:</span> Use consistent naming like{" "}
            <code className="bg-black border border-neutral-800 px-2 py-1 rounded">chat:room-{`{id}`}</code>{" "}
            to organize channels.
          </p>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">3. Receive Messages</h2>

        <p className="text-neutral-400">
          Listen for real-time messages delivered to your subscribed room.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {receiveCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* STEP 4 */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">4. Publish Messages from Backend</h2>

        <p className="text-neutral-400">
          Your backend validates user messages and publishes them to Velyx.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="http"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {publishCode}
          </SyntaxHighlighter>
        </div>

        <div className="space-y-2">
          <p className="text-neutral-400 text-sm">Example using Node.js:</p>

          <div className="bg-black border border-neutral-800 rounded-lg p-5">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              wrapLines
              wrapLongLines
              customStyle={codeStyle}
              codeTagProps={codeTagProps}
            >
              {backendNodeExample}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      {/* FULL FRONTEND EXAMPLE */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">Complete Frontend Example</h2>

        <p className="text-neutral-400">
          Here’s a full working React chat component using Velyx.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            wrapLines
            wrapLongLines
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {fullFrontendExample}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* NEXT STEPS */}
      <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6">
        <h3 className="text-white mb-3 text-lg font-medium">Next Steps</h3>

        <ul className="space-y-2 text-neutral-300">
          <li className="flex items-start gap-3">
            <span className="text-neutral-500 mt-1">•</span>
            <span>Add typing indicators using a <code className="bg-black border border-neutral-800 px-1 rounded">typing</code> event.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-500 mt-1">•</span>
            <span>Implement user presence with join/leave events.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-500 mt-1">•</span>
            <span>Add read receipts and reactions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-500 mt-1">•</span>
            <span>Scale to multiple chat rooms and private conversations.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
