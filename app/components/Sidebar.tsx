import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const navItems = [
    { id: 'introduction', label: 'Introduction', section: null },
    { section: 'Getting Started' },
    { id: 'authentication', label: 'Authentication', parent: 'Getting Started' },
    { id: 'generate-api-key', label: 'Generate API Key', parent: 'Getting Started' },
    { section: 'Build Guides' },
    { id: 'build-chat', label: 'Build a Realtime Chat App', parent: 'Build Guides' },
    // { section: 'Core Concepts' },
    // { id: 'websocket-connections', label: 'WebSocket Connections', parent: 'Core Concepts' },
    // { id: 'topics-subscriptions', label: 'Topics & Subscriptions', parent: 'Core Concepts' },
    // { id: 'publishing-events', label: 'Publishing Events', parent: 'Core Concepts' },
    // { id: 'reconnection-guide', label: 'Socket Reconnection Handle', parent: 'Core Concepts' },
    { section: 'API Reference' },
    { id: 'websocket-api', label: 'WebSocket API', parent: 'API Reference' },
    { id: 'http-publish-api', label: 'HTTP Publish API', parent: 'API Reference' },
    // { id: 'sdks', label: 'SDKs (Coming Soon)', section: null },
    { id: 'support', label: 'Support & Contact', section: null },
  ];

  return (
    <aside
      className="
        fixed top-0 left-0 h-screen w-72
        bg-[#000000] 
        border-r border-neutral-900
        overflow-y-auto 
        px-6 py-8 z-50
      "
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Logo Block */}
      <div className="flex flex-col items-center mb-10">
        <Link href="/" className="flex justify-center items-center mb-3">
          <Image src="/velyx.png" alt="velyx" width={55} height={55} className="opacity-90" />
        </Link>

        <p className="text-neutral-500 text-xs text-center tracking-wide">
          Infrastructure for Realtime Experiences
        </p>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {navItems.map((item, index) => {
          if ("section" in item && item.section) {
            return (
              <div
                key={index}
                className="
                  pt-6 pb-2 
                  text-neutral-500 
                  text-[11px] 
                  uppercase 
                  tracking-wider 
                  font-medium
                "
              >
                {item.section}
              </div>
            );
          }

          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id!)}
              className={` cursor-pointer
                w-full text-left rounded-lg text-sm
                flex items-center relative
                px-3 py-2

                ${item.parent ? "ml-2" : ""}

                ${isActive
                  ? "text-white bg-neutral-900/60"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                }
              `}
            >
              {/* Active Left Bar (Vercel style) */}
              {isActive && (
                <span
                  className="
                    absolute left-0 top-0 h-full w-[3px]
                    bg-white
                    rounded-r-sm
                  "
                />
              )}

              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
