"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function HTTPPublishAPI() {
  const endpoint = `POST https://velyx.me/publish`;

  const requestExample = `POST https://velyx.me/publish
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "topic": "chat:room-42",
  "payload": {
    "user": "alice",
    "message": "Hello world!",
    "timestamp": "2025-12-07T10:30:00Z"
  }
}`;

  const successResponse = `{
  "success": true,
  "topic": "chat:room-42"
}`;

  const curlExample = `curl -X POST https://velyx.me/publish \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "notifications:user-123",
    "payload": {
      "type": "order_update",
      "status": "shipped"
    }
  }'`;

  const jsExample = `await fetch("https://velyx.me/publish", {
  method: "POST",
  headers: {
    "x-api-key": process.env.VELYX_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    topic: "chat:room-42",
    payload: {
      user: "alice",
      message: "Hello!"
    }
  })
});`;

  return (
    <div className="space-y-12 max-w-3xl">

      {/* ---------- Title ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            HTTP Publish API
          </h1>
          <span className="px-2 py-0.5 text-xs rounded-full
            bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            http
          </span>
        </div>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Send events from your backend to all subscribed WebSocket clients.
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---------- Overview ---------- */}
      <div className="space-y-6 text-neutral-300 leading-relaxed">
        <p>
          The HTTP Publish API allows your backend to inject events into Velyx.
          Events are immediately routed to the correct topic and delivered
          to all connected subscribers.
        </p>

        <div className="bg-[#111111] border border-neutral-800 rounded-lg p-6 space-y-3">
          <h2 className="text-white text-lg font-medium">
            When to use this API
          </h2>
          <ul className="space-y-2">
            {[
              "Trigger real-time updates after database writes",
              "Send events from background workers or jobs",
              "Publish from any language or framework",
              "Push updates without managing WebSocket servers",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-neutral-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Endpoint ---------- */}
      <Section title="Endpoint">
        <CodeBlock language="http">
          {endpoint}
        </CodeBlock>
      </Section>

      {/* ---------- Authentication ---------- */}
      <Section title="Authentication">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>• API key must be sent in the <code className="text-white">x-api-key</code> header</p>
          <p>• Requests without a valid key are rejected</p>
          <p>• Keys are scoped per application</p>
        </div>
      </Section>

      {/* ---------- Request ---------- */}
      <Section title="Request Format">
        <CodeBlock language="http">
          {requestExample}
        </CodeBlock>

        <ul className="text-neutral-300 text-sm space-y-1">
          <li>• <code className="text-white">topic</code> — logical topic name (max 256 chars)</li>
          <li>• <code className="text-white">payload</code> — any valid JSON payload (≤ 1 MB)</li>
        </ul>
      </Section>

      {/* ---------- Response ---------- */}
      <Section title="Response">
        <CodeBlock language="json">
          {successResponse}
        </CodeBlock>

        {/* <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-1">
          <p>• <code className="text-white">delivered</code> = active subscribers</p>
          <p>• Delivery is best-effort (at-most-once)</p>
        </div> */}
      </Section>

      {/* ---------- Examples ---------- */}
      <Section title="Examples">
        <ExampleBlock title="cURL" language="bash">
          {curlExample}
        </ExampleBlock>

        <ExampleBlock title="JavaScript (Node.js)" language="javascript">
          {jsExample}
        </ExampleBlock>
      </Section>

      {/* ---------- Limits ---------- */}
      <Section title="Rate Limits">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>• 10,000 publishes / second / API key</p>
          <p>• Payload size limit: 1 MB</p>
          <p>• Burst traffic handled automatically</p>
        </div>
      </Section>

      {/* ---------- Best Practices ---------- */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6">
        <h3 className="text-white font-medium mb-3">
          Best Practices
        </h3>
        <ul className="space-y-2 text-neutral-300 text-sm">
          <li>• Keep payloads small</li>
          <li>• Include timestamps</li>
          <li>• Retry on 429 with backoff</li>
          <li>• Never expose API keys to browsers</li>
        </ul>
      </div>

      {/* ---------- Footer ---------- */}
      {/* <div className="pt-4 text-neutral-500 text-sm">
        Previous:{" "}
        <span className="text-white hover:underline cursor-pointer">
          WebSocket API
        </span>
      </div> */}
    </div>
  );
}

/* ================== Helpers ================== */

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
    <div className="bg-black border border-neutral-800 rounded-lg p-5">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLines
        wrapLongLines
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: 0,
          fontSize: "13.5px",
          lineHeight: "1.7",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
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

function ExampleBlock({
  title,
  language,
  children,
}: {
  title: string;
  language: string;
  children: string;
}) {
  return (
    <div className="bg-black border border-neutral-800 rounded-lg p-5 space-y-3">
      <div className="text-neutral-500 text-sm">{title}</div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLines
        wrapLongLines
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: 0,
          fontSize: "13.5px",
          lineHeight: "1.7",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
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
