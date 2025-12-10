import { Lock } from 'lucide-react';
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
    { id: 'generate-api-key', label: 'Generate API Key', parent: 'Getting Started',},
    { section: 'Build Guides' },
    { id: 'build-chat', label: 'Build a Realtime Chat App', parent: 'Build Guides' },
    { section: 'Core Concepts' },
    { id: 'websocket-connections', label: 'WebSocket Connections', parent: 'Core Concepts' },
    { id: 'topics-subscriptions', label: 'Topics & Subscriptions', parent: 'Core Concepts' },
    { id: 'publishing-events', label: 'Publishing Events', parent: 'Core Concepts' },
    { id: 'reconnection-guide', label: 'Socket Reconnection Handle', parent: 'Core Concepts' },
    { section: 'API Reference' },
    { id: 'websocket-api', label: 'WebSocket API', parent: 'API Reference' },
    { id: 'http-publish-api', label: 'HTTP Publish API', parent: 'API Reference' },
    { id: 'sdks', label: 'SDKs (Coming Soon)', section: null },
    { id: 'support', label: 'Support & Contact', section: null },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-78 bg-black border-r border-white/10 overflow-y-auto">
      <div className="p-8">
        <div className="mb-12">
          <h1 className="text-white tracking-tight">
          <Link href="/" className="text-xl font-bold flex items-center justify-center mb-8">
            <Image 
              src="/velyx-logo.png" 
              alt="velyx"
              width={75}
              height={75}
            />
            {/* <div className='m-2'>Velyx</div> */}
        </Link>
          </h1>
          <p className="text-white/40 text-sm mt-1 text-center">Infrastructure for Realtime Experiences</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, index) => {
            if ('section' in item && item.section) {
              return (
                <div key={index} className="pt-6 pb-2 text-white/40 text-xs uppercase tracking-wider">
                  {item.section}
                </div>
              );
            }

            const isActive = activePage === item.id;
            const isLocked = 'locked' in item && item.locked;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id!)}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-[#0066FF] text-white' 
                    : isLocked
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                  ${item.parent ? 'ml-3' : ''}
                  flex items-center justify-between
                `}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
