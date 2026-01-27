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
  <main className="min-h-screen flex items-center justify-center bg-[#0e0e11] text-[#e5e5e7]">
    <div className="w-full max-w-sm border border-[#1c1c21] rounded-[6px] p-7 space-y-7 bg-[#121216]">

      {/* Header */}
      <div className="text-center space-y-1.5">
        <h1 className="text-lg font-medium tracking-tight text-white">
          Instant Chat
        </h1>
        <p className="text-xs text-[#8b8b91]">
          Real-time rooms. No login.
        </p>
      </div>

      {/* Name */}
      <input
        placeholder="Your name"
        className="w-full bg-[#0e0e11] border border-[#2a2a30] rounded-[4px]
                  px-3.5 py-2.5 text-sm placeholder-[#6f6f75]
                  focus:outline-none focus:border-[#c9a86a]
                  transition"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Toggle */}
      <div className="flex bg-[#0e0e11] border border-[#2a2a30] rounded-[4px] overflow-hidden">
        <button
          onClick={() => setJoin(false)}
          className={\`flex-1 py-2.5 text-sm transition \${
            !join
              ? "bg-[#1c1c21] text-white"
              : "text-[#8b8b91] hover:text-white"
          }\`}
        >
          Create
        </button>
        <button
          onClick={() => setJoin(true)}
          className={\`flex-1 py-2.5 text-sm transition \${
            join
              ? "bg-[#1c1c21] text-white"
              : "text-[#8b8b91] hover:text-white"
          }\`}
        >
          Join
        </button>
      </div>

      {/* Action */}
      {join ? (
        <div className="space-y-4">
          <input
            placeholder="Room ID"
            className="w-full bg-[#0e0e11] border border-[#2a2a30] rounded-[4px]
                      px-3.5 py-2.5 text-sm placeholder-[#6f6f75]
                      focus:outline-none focus:border-[#c9a86a]
                      transition"
            onChange={(e) => setRoomId(e.target.value)}
          />

          <button
            onClick={joinRoom}
            disabled={!name || !roomId}
            className="w-full py-2.5 text-sm font-medium
                      bg-[#1c1c21] text-white border border-[#2a2a30] rounded-[4px]
                      hover:border-[#c9a86a]
                      disabled:opacity-30 disabled:cursor-not-allowed
                      transition"
          >
            Join Room
          </button>
        </div>
      ) : (
        <button
          onClick={createRoom}
          disabled={!name}
          className="w-full py-2.5 text-sm font-medium
                    bg-[#1c1c21] text-white border border-[#2a2a30] rounded-[4px]
                    hover:border-[#c9a86a]
                    disabled:opacity-30 disabled:cursor-not-allowed
                    transition"
        >
          Create Room
        </button>
      )}

      {/* Footer */}
      <p className="text-[11px] text-center text-[#6f6f75]">
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

  const [copied, setCopied] = useState(false);
  const copyToClipboard = async (code:string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
<main className="h-screen flex flex-col bg-[#0e0e11] text-[#e5e5e7]">
  {/* Header */}
  <header className="flex items-center justify-between px-6 py-4 border-b border-[#1c1c21] bg-[#121216]">
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium tracking-tight text-white">
        Chat Room
      </span>

      <div className="flex items-center gap-2 text-xs text-[#9a9aa0]">
        <span className="font-mono opacity-80">{roomId}</span>

        <button
          onClick={() => copyToClipboard(roomId)}
          className="px-2 py-[2px] rounded border border-[#2a2a30]
                     bg-[#16161b] hover:bg-[#1e1e24] transition"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs text-[#9a9aa0]">
      <span
        className={\`h-1.5 w-1.5 rounded-full \${
          connected ? "bg-[#c9a86a]" : "bg-[#555]"
        }\`}
      />
      {connected ? "Online" : "Offline"}
    </div>
  </header>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
    {messages.map((m, i) => (
      <div key={i} className="flex flex-col gap-1">
        <span className="text-xs text-[#8b8b91]">
          {m.user}
        </span>
        <span className="text-sm leading-relaxed text-[#e5e5e7]">
          {m.message}
        </span>
      </div>
    ))}

    {messages.length === 0 && (
      <p className="text-sm text-[#7a7a80]">
        No messages yet. Say something meaningful.
      </p>
    )}
  </div>

  {/* Input */}
  <div className="border-t border-[#1c1c21] bg-[#121216] px-5 py-4">
    <div className="flex items-center gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Write a message…"
        className="flex-1 bg-[#0e0e11] border border-[#2a2a30]
                   rounded-lg px-4 py-2.5 text-sm
                   placeholder-[#6f6f75]
                   focus:outline-none focus:border-[#c9a86a]
                   transition"
      />

      <button
        onClick={send}
        disabled={!input.trim()}
        className="px-5 py-2.5 rounded-lg text-sm font-medium
                   bg-[#1e1e24] text-[#e5e5e7]
                   border border-[#2a2a30]
                   hover:bg-[#26262d]
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition"
      >
        Send
      </button>
    </div>
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
