import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({
  activePage,
  onPageChange,
  open,
  onClose,
}: SidebarProps) {
  const navItems = [
    { id: "introduction", label: "Introduction" },
    { section: "Getting Started" },
    { id: "authentication", label: "Authentication", parent: true },
    { id: "generate-api-key", label: "Generate API Key", parent: true },
    { section: "Build Guides" },
    { id: "build-chat", label: "Build a Realtime Chat App", parent: true },
    { section: "Core Concepts" },
    { id: "reconnection-guide", label: "Socket Reconnection Handle", parent: true },
    { section: "API Reference" },
    { id: "http-publish-api", label: "HTTP Publish API", parent: true },
    { id: "websocket-api", label: "WebSocket API", parent: true },
    { id: "support", label: "Support & Contact" },
  ];

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-[85vw] max-w-80 lg:w-72
          bg-black border-r border-neutral-900
          px-6 py-8 z-50
          overflow-y-auto
          transform transition-transform duration-300 ease-out

          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white lg:hidden"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex justify-center items-center mb-3">
            <Image
              src="/velyx.png"
              alt="velyx"
              width={52}
              height={52}
              className="opacity-90"
            />
          </Link>

          <p className="text-neutral-500 text-xs text-center tracking-wide">
            Real-time infrastructure
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            if ("section" in item) {
              return (
                <div
                  key={index}
                  className="pt-6 pb-2 text-neutral-500 text-[11px] uppercase tracking-wider font-medium"
                >
                  {item.section}
                </div>
              );
            }

            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id!);
                  onClose(); // 👈 auto-close on mobile
                }}
                className={`
                  w-full text-left rounded-lg text-sm
                  flex items-center relative px-3 py-2
                  ${item.parent ? "ml-2" : ""}
                  ${
                    isActive
                      ? "text-white bg-neutral-900/60"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-white rounded-r-sm" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
