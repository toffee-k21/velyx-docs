"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/* =========================================================
   Build Realtime Chat Guide
   ========================================================= */

export function BuildRealtimeChatGuide() {
  const landingPageCode = `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const createRoom = () => {
    const id = crypto.randomUUID().slice(0, 8);
    router.push(\`/room/\${id}?name=\${encodeURIComponent(name)}\`);
  };

  const joinRoom = () => {
    router.push(\`/room/\${roomId}?name=\${encodeURIComponent(name)}\`);
  };

  return (
    <main>
      <input
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
    </main>
  );
}
`;

  const apiRouteCode = `import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  await fetch("https://velyx.me/publish", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_VELYX_API_KEY!,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return NextResponse.json({ success: true });
}
`;

  const roomPageCode = `"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Room({ params }) {
  const { roomId } = params;
  const name = useSearchParams().get("name") ?? "guest";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket(
      \`wss://velyx.me/ws?apiKey=NEXT_PUBLIC_VELYX_API_KEY\`
    );

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "subscribe",
        topic: \`chat:\${roomId}\`
      }));
    };

    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, JSON.parse(e.data)]);
    };

    return () => ws.close();
  }, [roomId]);

  const send = async () => {
    await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: \`chat:\${roomId}\`,
        payload: {
          user: name,
          message: input
        }
      })
    });

    setInput("");
  };

  return (
    <main>
      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.user}</b>: {m.message}
        </div>
      ))}
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </main>
  );
}
`;

  return (
    <div className="space-y-14 max-w-3xl">

      {/* ---------- Title ---------- */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Build a Real-Time Chat App
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          This guide walks through building a minimal real-time chat application
          using Next.js and Velyx — without managing WebSocket servers,
          pub/sub infrastructure, or fan-out logic.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---------- Overview ---------- */}
      <Section title="Overview">
        <ul className="text-neutral-300 text-sm space-y-2">
          <li>• A landing page to create or join a room</li>
          <li>• A room page that subscribes to a chat topic</li>
          <li>• A backend API route that publishes messages</li>
        </ul>
      </Section>

      {/* ---------- Landing Page ---------- */}
      <Section title="1. Landing Page">
        <p className="text-neutral-300">
          Collects a user name and room ID, then routes the user to{" "}
          <code className="text-white">/room/[roomId]</code>.
        </p>

        <CodeBlock language="tsx">
          {landingPageCode}
        </CodeBlock>
      </Section>

      {/* ---------- API Route ---------- */}
      <Section title="2. Publish API Route">
        <p className="text-neutral-300">
          Publishing messages via a backend API route keeps your Velyx API key
          secure and allows future extensions.
        </p>

        <CodeBlock language="ts">
          {apiRouteCode}
        </CodeBlock>
      </Section>

      {/* ---------- Room Page ---------- */}
      <Section title="3. Chat Room">
        <p className="text-neutral-300">
          Subscribes to a chat topic over WebSocket and renders messages
          in real time.
        </p>

        <CodeBlock language="tsx">
          {roomPageCode}
        </CodeBlock>
      </Section>

      {/* ---------- Message Flow ---------- */}
      <Section title="Message Flow">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>• Clients subscribe to <code className="text-white">chat:&lt;roomId&gt;</code></p>
          <p>• Messages are published via HTTP</p>
          <p>• Velyx fans out events to all subscribers</p>
        </div>
      </Section>

      {/* ---------- Extending ---------- */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
        <h3 className="text-white font-medium mb-3">
          Extending This Example
        </h3>
        <ul className="space-y-2 text-neutral-300 text-sm">
          <li>• Authentication & identity</li>
          <li>• Message persistence</li>
          <li>• Presence & typing indicators</li>
          <li>• Moderation & validation</li>
        </ul>
      </div>

      {/* ---------- Footer ---------- */}
      {/* <div className="pt-4 text-neutral-500 text-sm">
        Next:{" "}
        <span className="text-white hover:underline cursor-pointer">
          Presence & State Sync
        </span>
      </div> */}
    </div>
  );
}

/* =========================================================
   Shared UI
   ========================================================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-medium">{title}</h2>
      {children}
    </div>
  );
}

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  return (
    <div className="bg-black border border-neutral-800 rounded-lg overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLines={false}
        wrapLongLines={false}
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: "1.25rem",
          fontSize: "13.5px",
          lineHeight: "1.7",
          minWidth: "100%",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            whiteSpace: "pre",
          },
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
