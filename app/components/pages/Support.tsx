import { Mail, MessageCircle, Book, Github } from 'lucide-react';

export function Support() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-white">Support & Contact</h1>
        <p className="text-white/60 text-lg">
          Get help, report issues, or connect with the Velyx team.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 hover:border-[#0066FF]/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-white">Email Support</h2>
            </div>
            <p className="text-white/70">
              Get in touch with our support team for technical assistance, billing questions, or general inquiries.
            </p>
            <a 
              href="mailto:support@velyx.io"
              className="inline-block text-[#0066FF] hover:text-[#0052CC] transition-colors duration-200"
            >
              support@velyx.io
            </a>
            <div className="text-white/50 text-sm">
              Response time: Usually within 24 hours
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 hover:border-[#0066FF]/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-white">Community Discord</h2>
            </div>
            <p className="text-white/70">
              Join our Discord server to chat with other developers, share projects, and get quick answers.
            </p>
            <a 
              href="https://discord.gg/velyx"
              className="inline-block text-[#0066FF] hover:text-[#0052CC] transition-colors duration-200"
            >
              Join Discord Server
            </a>
            <div className="text-white/50 text-sm">
              Active community of 2,500+ developers
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 hover:border-[#0066FF]/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center">
                <Book className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-white">Documentation</h2>
            </div>
            <p className="text-white/70">
              Browse our comprehensive documentation, guides, and API reference for detailed technical information.
            </p>
            <a 
              href="#"
              className="inline-block text-[#0066FF] hover:text-[#0052CC] transition-colors duration-200"
            >
              View Documentation
            </a>
            <div className="text-white/50 text-sm">
              You're already here!
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4 hover:border-[#0066FF]/30 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center">
                <Github className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-white">GitHub</h2>
            </div>
            <p className="text-white/70">
              Report bugs, request features, or contribute to our open-source client libraries on GitHub.
            </p>
            <a 
              href="https://github.com/velyx"
              className="inline-block text-[#0066FF] hover:text-[#0052CC] transition-colors duration-200"
            >
              github.com/velyx
            </a>
            <div className="text-white/50 text-sm">
              Open source SDKs and examples
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        <div className="space-y-4">
          <h2 className="text-white">Enterprise Support</h2>
          <div className="bg-gradient-to-r from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 rounded-lg p-6">
            <div className="space-y-4">
              <p className="text-white/80">
                Need dedicated support, custom SLAs, or help scaling to millions of connections? 
                Our enterprise support team is here to help.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span className="text-white/70">Dedicated support engineer</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span className="text-white/70">Priority bug fixes and feature requests</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span className="text-white/70">Architecture review and optimization</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#0066FF] mr-3">•</span>
                  <span className="text-white/70">Custom SLAs and uptime guarantees</span>
                </div>
              </div>
              <div className="pt-4">
                <a 
                  href="mailto:enterprise@velyx.io"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg transition-colors duration-200"
                >
                  Contact Enterprise Sales
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-white">Status & Incidents</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
            <p className="text-white/70">
              Check our status page for real-time system status, scheduled maintenance, and incident reports.
            </p>
            <a 
              href="https://status.velyx.io"
              className="inline-flex items-center gap-2 text-[#0066FF] hover:text-[#0052CC] transition-colors duration-200"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="bg-white/5 border border-white/10 rounded-lg p-5 group">
              <summary className="text-white cursor-pointer list-none flex items-center justify-between">
                <span>How do I get started with Velyx?</span>
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-white/70 mt-4 text-sm">
                Start by visiting the Authentication page to learn about API keys, then generate your first 
                key on the Generate API Key page. From there, check out the Build Guides section for 
                step-by-step tutorials.
              </p>
            </details>

            <details className="bg-white/5 border border-white/10 rounded-lg p-5 group">
              <summary className="text-white cursor-pointer list-none flex items-center justify-between">
                <span>What are the rate limits?</span>
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-white/70 mt-4 text-sm">
                Standard tier includes 10,000 publishes per second and unlimited WebSocket connections. 
                Rate limits can be increased for enterprise customers. See the HTTP Publish API documentation 
                for more details.
              </p>
            </details>

            <details className="bg-white/5 border border-white/10 rounded-lg p-5 group">
              <summary className="text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is there a free tier?</span>
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-white/70 mt-4 text-sm">
                Yes! Our free tier includes 100,000 messages per month and up to 100 concurrent connections. 
                Perfect for development and small projects. Contact sales for pricing on larger plans.
              </p>
            </details>

            <details className="bg-white/5 border border-white/10 rounded-lg p-5 group">
              <summary className="text-white cursor-pointer list-none flex items-center justify-between">
                <span>How do I secure my topics?</span>
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-200">▼</span>
              </summary>
              <p className="text-white/70 mt-4 text-sm">
                Topics are scoped to your API key, so other customers cannot access them. However, any client 
                with your API key can subscribe to any topic. Implement authorization in your backend before 
                publishing sensitive events, and use topic naming to logically separate data.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
