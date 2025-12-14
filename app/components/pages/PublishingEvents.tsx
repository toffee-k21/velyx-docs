export function PublishingEvents() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Publishing Events</h1>
        <p className="text-white/60 text-lg">
          Send real-time events from your backend to connected clients.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          Publishing is how you send events from your backend to Velyx, which then delivers them to all 
          subscribed clients in real-time. Events are published via a simple HTTP API, making integration 
          straightforward from any backend language or framework.
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-white">Publishing Endpoint</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded">POST</span>
                  <code className="text-white">https://velyx.me/publish</code>
                </div>
                <p className="text-white/70 text-sm">
                  Send a POST request with your API key and event payload to publish to a topic.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Request Format</h2>
            <div className="bg-black border border-white/10 rounded-lg p-5">
              <pre className="text-white/80 text-sm overflow-x-auto">
                <code>{`POST https://velyx.me/publish
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
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 mt-3">
              <div className="space-y-2 text-sm">
                <div className="text-white">Required Fields</div>
                <ul className="space-y-1 text-white/70">
                  <li className="flex items-start">
                    <code className="text-[#0066FF] mr-2">topic</code>
                    <span>The topic to publish to (string)</span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-[#0066FF] mr-2">data</code>
                    <span>The event payload (any valid JSON)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Response Format</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-white/70 text-sm">Success (200 OK)</div>
                <div className="bg-black border border-white/10 rounded-lg p-4">
                  <pre className="text-white/80 text-sm overflow-x-auto">
                    <code>{`{
  "success": true,
  "delivered": 42
}`}</code>
                  </pre>
                </div>
                <p className="text-white/60 text-xs">
                  <code className="text-white">delivered</code> shows how many clients received the event
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-white/70 text-sm">Error (4xx/5xx)</div>
                <div className="bg-black border border-white/10 rounded-lg p-4">
                  <pre className="text-white/80 text-sm overflow-x-auto">
                    <code>{`{
  "success": false,
  "error": "Invalid API key"
}`}</code>
                  </pre>
                </div>
                <p className="text-white/60 text-xs">
                  Error responses include a descriptive message
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Implementation Examples</h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-white/80 mb-2">Node.js / JavaScript</div>
                <div className="bg-black border border-white/10 rounded-lg p-5">
                  <pre className="text-white/80 text-sm overflow-x-auto">
                    <code>{`async function publishEvent(topic, data) {
  const response = await fetch('https://velyx.me/publish', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.VELYX_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ topic, data })
  });
  
  const result = await response.json();
  console.log(\`Delivered to \${result.delivered} clients\`);
  return result;
}

// Usage
await publishEvent('notifications:user-123', {
  type: 'order_shipped',
  orderId: 'ord_abc123',
  trackingNumber: '1Z999AA10123456784'
});`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <div className="text-white/80 mb-2">Python</div>
                <div className="bg-black border border-white/10 rounded-lg p-5">
                  <pre className="text-white/80 text-sm overflow-x-auto">
                    <code>{`import requests
import os

def publish_event(topic, data):
    response = requests.post(
        'https://velyx.me/publish',
        headers={
            'x-api-key': os.environ['VELYX_API_KEY'],
            'Content-Type': 'application/json'
        },
        json={'topic': topic, 'data': data}
    )
    result = response.json()
    print(f"Delivered to {result['delivered']} clients")
    return result

# Usage
publish_event('game:match-xyz', {
    'type': 'player_joined',
    'player': 'alice',
    'timestamp': '2025-12-07T10:30:00Z'
})`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <div className="text-white/80 mb-2">Go</div>
                <div className="bg-black border border-white/10 rounded-lg p-5">
                  <pre className="text-white/80 text-sm overflow-x-auto">
                    <code>{`package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "os"
)

type PublishRequest struct {
    Topic string      \`json:"topic"\`
    Data  interface{} \`json:"data"\`
}

func publishEvent(topic string, data interface{}) error {
    payload, _ := json.Marshal(PublishRequest{
        Topic: topic,
        Data:  data,
    })
    
    req, _ := http.NewRequest("POST", 
        "https://velyx.me/publish",
        bytes.NewBuffer(payload))
    
    req.Header.Set("x-api-key", os.Getenv("VELYX_API_KEY"))
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    defer resp.Body.Close()
    
    return err
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Event Delivery Guarantees</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <div>
                    <span className="text-white">At-most-once delivery:</span> Events are delivered immediately 
                    to all currently connected and subscribed clients
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <div>
                    <span className="text-white">No persistence:</span> Events are not stored. Clients that 
                    connect after publishing will not receive past events
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <div>
                    <span className="text-white">Instant delivery:</span> Typical latency from publish to 
                    client delivery is under 50ms globally
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <div>
                    <span className="text-white">Order preservation:</span> Events published to the same topic 
                    are delivered in order to each subscriber
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-white">Rate Limits & Throttling</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
              <p className="text-white/70">
                Velyx is designed for high-throughput scenarios. Default limits are generous, but can be 
                increased for enterprise use cases:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">10,000 publishes/second</span> per API key (standard tier)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">1 MB maximum</span> event payload size</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span><span className="text-white">Automatic scaling</span> for burst traffic</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
            <h3 className="text-white mb-3">Best Practices</h3>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Keep event payloads small and focused - only send what clients need</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Use consistent data structures across your event types</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Include timestamps for debugging and client-side ordering</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Handle publish failures gracefully with retries and fallbacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span>Monitor the <code className="text-white bg-white/5 px-1 rounded">delivered</code> count to track reach</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
