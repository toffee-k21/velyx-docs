"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Build Realtime Chat Guide

export function BuildRealtimeChatGuide() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async (code:string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const landingPageCode = `
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [join, setJoin] = useState(false);
  const router = useRouter();

  const createRoom = () => {
    if (!name.trim()) return;
    const id = crypto.randomUUID().slice(0, 8);
    router.push(\`/room/\${id}?name=\${encodeURIComponent(name)}\`);
  };

  const joinRoom = () => {
    if (!name.trim() || !roomId.trim()) return;
    router.push(\`/room/\${roomId}?name=\${encodeURIComponent(name)}\`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm border border-neutral-800 rounded-xl p-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">
            Instant Chat
          </h1>
          <p className="text-xs text-neutral-400">
            Real-time rooms. No login.
          </p>
        </div>

        {/* Name */}
        <input
          placeholder="Your name"
          className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm
          focus:outline-none focus:ring-1 focus:ring-white/30"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Toggle */}
        <div className="flex border border-neutral-800 rounded-md overflow-hidden">
          <button
            onClick={() => setJoin(false)}
            className={\`flex-1 py-2 text-sm \${
              !join ? "bg-white text-black" : "text-neutral-400"
            }\`}
          >
            Create
          </button>
          <button
            onClick={() => setJoin(true)}
            className={\`flex-1 py-2 text-sm \${
              join ? "bg-white text-black" : "text-neutral-400"
            }\`}
          >
            Join
          </button>
        </div>

        {/* Action */}
        {join ? (
          <div className="space-y-3">
            <input
              placeholder="Room ID"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm
              focus:outline-none focus:ring-1 focus:ring-white/30"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button
              onClick={joinRoom}
              disabled={!name || !roomId}
              className="w-full bg-white text-black py-2 rounded-md text-sm
              disabled:opacity-30"
            >
              Join Room
            </button>
          </div>
        ) : (
          <button
            onClick={createRoom}
            disabled={!name}
            className="w-full bg-white text-black py-2 rounded-md text-sm
            disabled:opacity-30"
          >
            Create Room
          </button>
        )}

        {/* Footer */}
        <p className="text-[11px] text-center text-neutral-500">
          Powered by Velyx
        </p>
      </div>
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
      "x-api-key": process.env.VELYX_API_KEY!,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return NextResponse.json({ success: true });
}
`;

const roomPageCode = `
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Room({ params }: any) {
  const { roomId }:any = React.use(params);
  const name = useSearchParams().get("name") ?? "guest";

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(
      \`wss://velyx.me/ws?appId=\${process.env.NEXT_PUBLIC_VELYX_APP_ID}\`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("connected");
      setConnected(true);

      ws.send(
        JSON.stringify({
          type: "subscribe",
          topic: \`chat:\${roomId}\`,
        })
      );
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data.payload ?? data]);
    };

    ws.onclose = () => {
      console.log("disconnected");
      setConnected(false);
    };

    return () => ws.close();
  }, [roomId]);

  const send = async () => {
    if (!input.trim()) return;

    await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: \`chat:\${roomId}\`,
        payload: {
          user: name,
          message: input,
        },
      }),
    });

    setInput("");
  };

  return (
    <main className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Room</p>
          <p className="text-xs text-neutral-400">{roomId}</p>
        </div>
        <span className="text-xs">
          {connected ? "Connected" : "Disconnected"}
        </span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm">
            <span className="text-neutral-400">{m.user}</span>
            <span className="ml-2">{m.message}</span>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-neutral-500 text-sm">
            No messages yet. Start the conversation.
          </p>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-neutral-800 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:border-white"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="px-4 py-2 rounded-md text-sm font-medium
                     bg-white text-black
                     disabled:opacity-30"
        >
          Send
        </button>
      </div>
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
        <p className="text-neutral-500 font-bold text-sm"> /app/page.tsx</p>
        <div className="relative">
          <button
        onClick={() => copyToClipboard(landingPageCode)}
        className="absolute top-2 right-2 text-xs bg-neutral-700 text-white px-2 py-1 rounded"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
        <CodeBlock language="tsx">
          {landingPageCode}
        </CodeBlock>

        </div>
      </Section>

      {/* ---------- API Route ---------- */}
      <Section title="2. Publish API Route">
        <p className="text-neutral-300">
          Publishing messages via a backend API route keeps your Velyx API key
          secure and allows future extensions.
        </p>
        <p className="text-neutral-500 font-bold text-sm"> /app/api/publish/route.ts</p>
        <div className="relative">
          <button
          onClick={() => copyToClipboard(apiRouteCode)}
          className="absolute top-2 right-2 text-xs bg-neutral-700 text-white px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

          <CodeBlock language="ts">
            {apiRouteCode}
          </CodeBlock>
        </div>
      </Section>

      {/* ---------- Room Page ---------- */}
      <Section title="3. Chat Room">
        <p className="text-neutral-300">
          Subscribes to a chat topic over WebSocket and renders messages
          in real time.
        </p>
        <p className="text-neutral-500 font-bold text-sm">/app/room/[roomId]/page.tsx</p>
        <div className="relative">
          <button
          onClick={() => copyToClipboard(roomPageCode)}
          className="absolute top-2 right-2 text-xs bg-neutral-700 text-white px-2 py-1 rounded"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <CodeBlock language="tsx">
            {roomPageCode}
          </CodeBlock>
        </div>
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

  //  Shared UI

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
