export function HTTPPublishAPI() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">HTTP Publish API</h1>
        <p className="text-white/60 text-lg">
          Complete reference for publishing events via HTTP.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-6">
        <p className="text-white/80">
          The HTTP Publish API allows you to send events from your backend to all subscribed clients. 
          This API is designed to be simple, fast, and reliable.
        </p>

        <div className="space-y-3">
          <h2 className="text-white">Endpoint</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#0066FF] text-white text-xs rounded">POST</span>
                <code className="text-white">https://velyx.me/publish</code>
              </div>
              <p className="text-white/70 text-sm">
                Publish an event to a topic. All clients subscribed to that topic will receive it instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Request Headers</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white text-sm">Header</th>
                  <th className="text-left p-4 text-white text-sm">Value</th>
                  <th className="text-left p-4 text-white text-sm">Required</th>
                </tr>
              </thead>
              <tbody className="text-white/70 text-sm">
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">x-api-key</code></td>
                  <td className="p-4">Your Velyx API key</td>
                  <td className="p-4"><span className="text-emerald-400">Yes</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4"><code className="text-[#0066FF]">Content-Type</code></td>
                  <td className="p-4">application/json</td>
                  <td className="p-4"><span className="text-emerald-400">Yes</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-white">Request Body</h2>
          <div className="bg-black border border-white/10 rounded-lg p-5">
            <pre className="text-white/80 text-sm overflow-x-auto">
              <code>{`{
  "topic": "string",    // Required: Topic to publish to
  "data": any          // Required: Event payload (any valid JSON)
}`}</code>
            </pre>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-5 space-y-3">
            <div className="text-white text-sm">Field Specifications</div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[#0066FF] mb-1">topic</div>
                <ul className="space-y-1 text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Type: string</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Max length: 256 characters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Allowed characters: a-z, A-Z, 0-9, :, -, _</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[#0066FF] mb-1">data</div>
                <ul className="space-y-1 text-white/70 ml-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Type: any valid JSON (object, array, string, number, boolean, null)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Max size: 1 MB</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Response Formats</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded">200 OK</span>
                <span className="text-white">Success</span>
              </div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "success": true,
  "delivered": 42,
  "topic": "chat:room-42"
}`}</code>
                </pre>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <ul className="space-y-1 text-white/70 text-sm">
                  <li className="flex items-start">
                    <code className="text-[#0066FF] mr-2">success</code>
                    <span>Always true for successful publishes</span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-[#0066FF] mr-2">delivered</code>
                    <span>Number of clients that received the event</span>
                  </li>
                  <li className="flex items-start">
                    <code className="text-[#0066FF] mr-2">topic</code>
                    <span>Echo of the topic you published to</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">401 Unauthorized</span>
                <span className="text-white">Invalid API Key</span>
              </div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "success": false,
  "error": "Invalid API key"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">400 Bad Request</span>
                <span className="text-white">Invalid Request</span>
              </div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "success": false,
  "error": "Missing required field: topic"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">413 Payload Too Large</span>
                <span className="text-white">Payload Exceeds 1MB</span>
              </div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "success": false,
  "error": "Payload size exceeds 1 MB limit"
}`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">429 Too Many Requests</span>
                <span className="text-white">Rate Limit Exceeded</span>
              </div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`{
  "success": false,
  "error": "Rate limit exceeded",
  "retryAfter": 30
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-3">
          <h2 className="text-white">Complete Examples</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-white/80 mb-2">cURL</div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`curl -X POST https://velyx.me/publish \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "notifications:user-123",
    "data": {
      "type": "order_update",
      "orderId": "ord_abc123",
      "status": "shipped"
    }
  }'`}</code>
                </pre>
              </div>
            </div>

            <div>
              <div className="text-white/80 mb-2">JavaScript (Node.js)</div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`const response = await fetch('https://velyx.me/publish', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.VELYX_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    topic: 'chat:room-42',
    data: {
      user: 'alice',
      message: 'Hello!',
      timestamp: new Date().toISOString()
    }
  })
});

const result = await response.json();
if (result.success) {
  console.log(\`Delivered to \${result.delivered} clients\`);
} else {
  console.error('Publish failed:', result.error);
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <div className="text-white/80 mb-2">Python</div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`import requests
import os

response = requests.post(
    'https://velyx.me/publish',
    headers={
        'x-api-key': os.environ['VELYX_API_KEY'],
        'Content-Type': 'application/json'
    },
    json={
        'topic': 'game:match-xyz',
        'data': {
            'event': 'player_scored',
            'player': 'alice',
            'score': 100
        }
    }
)

result = response.json()
if result['success']:
    print(f"Delivered to {result['delivered']} clients")
else:
    print(f"Error: {result['error']}")`}</code>
                </pre>
              </div>
            </div>

            <div>
              <div className="text-white/80 mb-2">Ruby</div>
              <div className="bg-black border border-white/10 rounded-lg p-5">
                <pre className="text-white/80 text-sm overflow-x-auto">
                  <code>{`require 'net/http'
require 'json'

uri = URI('https://velyx.me/publish')
request = Net::HTTP::Post.new(uri)
request['x-api-key'] = ENV['VELYX_API_KEY']
request['Content-Type'] = 'application/json'
request.body = {
  topic: 'dashboard:analytics',
  data: {
    metric: 'page_views',
    value: 1250,
    timestamp: Time.now.iso8601
  }
}.to_json

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

result = JSON.parse(response.body)
puts "Delivered to #{result['delivered']} clients" if result['success']`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-white">Rate Limits</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span><span className="text-white">Standard tier:</span> 10,000 requests per second</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span><span className="text-white">Burst handling:</span> Up to 2x sustained rate for short bursts</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0066FF] mr-3">•</span>
                <span><span className="text-white">Retry strategy:</span> Implement exponential backoff on 429 responses</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-6">
          <h3 className="text-white mb-3">Best Practices</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Store your API key securely in environment variables</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Implement retry logic with exponential backoff for failed requests</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Monitor the <code className="text-white bg-white/5 px-1 rounded">delivered</code> count to ensure events reach clients</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Keep payloads small for faster delivery and better performance</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0066FF] mr-3">•</span>
              <span>Use batching for high-volume scenarios (contact support for batch API access)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
