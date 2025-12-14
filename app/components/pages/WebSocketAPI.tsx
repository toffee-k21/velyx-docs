"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function WebSocketAPI() {
  const connectCode = `const ws = new WebSocket(
  "wss://velyx.me/ws?apiKey=YOUR_API_KEY"
);

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "subscribe",
    topic: "chat:room-42"
  }));
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  console.log(msg);
};`;

  const eventCode = `{
  "topic": "chat:room-42",
  "payload": {
    "user": "alice",
    "message": "Hello world!"
  }
}`;

  const codeStyle = {
    background: "transparent",
    margin: 0,
    padding: "0",
    fontSize: "13.5px",
    lineHeight: "1.7",
    overflowX: "auto",
  };

  const codeTagProps = {
    style: {
      background: "transparent",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      whiteSpace: "pre",
    },
  };

  return (
    <div className="space-y-12 max-w-3xl">

      {/* ---- Title ---- */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            WebSocket API
          </h1>
          <span className="px-2 py-0.5 text-xs rounded-full 
            bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            realtime
          </span>
        </div>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Low-level WebSocket protocol used by Velyx for real-time delivery.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---- Overview ---- */}
      <div className="space-y-6 text-neutral-300 leading-relaxed">
        <p>
          Velyx exposes a persistent WebSocket connection that allows clients to
          subscribe to topics and receive events in real time.
        </p>

        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-3">
          <h2 className="text-white text-lg font-medium">
            What this connection handles
          </h2>
          <ul className="space-y-2">
            {[
              "Connection lifecycle and heartbeats",
              "Topic subscription and routing",
              "Automatic app-level topic isolation",
              "Fan-out via Redis for horizontal scaling",
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-neutral-500">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Connection ---- */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">Connection</h2>

        <p className="text-neutral-300">
          Connect using your API key as a query parameter.
          Invalid or missing keys will close the connection.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="text"
            style={oneDark}
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            wss://velyx.me/ws?apiKey=YOUR_API_KEY
          </SyntaxHighlighter>
        </div>
      </div>

      {/* ---- Topic Isolation ---- */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">Topic Isolation</h2>

        <p className="text-neutral-300">
          Topics are automatically namespaced per application.
          Clients never interact with internal topic names directly.
        </p>

        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 space-y-2 text-sm">
          <div className="text-neutral-400">
            Client topic:
            <code className="ml-2 text-white">chat:room-42</code>
          </div>
          <div className="text-neutral-400">
            Internal topic:
            <code className="ml-2 text-white">
              app:&lt;appId&gt;:chat:room-42
            </code>
          </div>
        </div>
      </div>

      {/* ---- Client Messages ---- */}
      <div className="space-y-6">
        <h2 className="text-white text-xl font-medium">Client → Server</h2>

        <p className="text-neutral-300">
          All messages must be JSON and include a <code className="text-white">type</code>.
        </p>

        <div className="bg-black border border-neutral-800 rounded-lg p-5 space-y-3">
          <div className="text-neutral-500 text-sm">
            Subscribe to a topic
          </div>

          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
{`{
  "type": "subscribe",
  "topic": "chat:room-42"
}`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* ---- Server Messages ---- */}
      <div className="space-y-6">
        <h2 className="text-white text-xl font-medium">Server → Client</h2>

        <div className="bg-black border border-neutral-800 rounded-lg p-5 space-y-3">
          <div className="text-neutral-500 text-sm">
            Published event
          </div>

          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {eventCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* ---- Heartbeats ---- */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
        <h3 className="text-white font-medium mb-2">
          Connection Liveness
        </h3>
        <p className="text-neutral-300 text-sm">
          Ping / pong is handled automatically at the WebSocket protocol level.
          No client-side ping message is required.
        </p>
      </div>

      {/* ---- Example ---- */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-medium">Complete Example</h2>

        <div className="bg-black border border-neutral-800 rounded-lg p-5">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={codeStyle}
            codeTagProps={codeTagProps}
          >
            {connectCode}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 text-neutral-500 text-sm">
        Next:{" "}
        <span className="text-white hover:underline cursor-pointer">
          Publishing Events →
        </span>
      </div>
    </div>
  );
}
