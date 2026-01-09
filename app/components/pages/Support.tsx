"use client";

export function Support() {
  return (
    <div className="space-y-12 max-w-3xl">

      {/* ---------- Title ---------- */}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Support
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed">
          Need help or have questions about Velyx?
        </p>
      </div>

      <div className="h-px bg-neutral-800" />

      {/* ---------- Contact ---------- */}
      <Section title="Contact">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>
            If you run into issues, have feedback, or need clarification,
            feel free to reach out.
          </p>

          <p>
            Email:{" "}
            <a
              href="mailto:your-email@gmail.com"
              className=" text-emerald-400 hover:underline"
            >
              taufiq2004.21@gmail.com
            </a>
          </p>

          <p className="text-neutral-500">
            Response time may vary during early development.
          </p>
        </div>
      </Section>

      {/* ---------- Documentation ---------- */}
      <Section title="Documentation">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>
            Most common questions are already covered in the documentation.
          </p>
          <p className="text-neutral-500">
            Start with the Getting Started and API sections.
          </p>
        </div>
      </Section>

      {/* ---------- Issues ---------- */}
      <Section title="Issues & Feedback">
        <div className="bg-[#0D0D0D] border border-neutral-800 rounded-lg p-6 text-neutral-300 text-sm space-y-2">
          <p>
            Found a bug or have a feature request?
          </p>

          <p>
            Open an issue on GitHub:{" "}
            <a
              href="https://github.com/toffee-k21/velyx-docs"
              className=" text-emerald-400 hover:underline"
            >
              github.com/toffee-k21/velyx-docs
            </a>
          </p>
        </div>
      </Section>

      {/* ---------- Footer ---------- */}
      {/* <div className="pt-4 text-neutral-500 text-sm">
        Back to{" "}
        <span className="text-white hover:underline cursor-pointer">
          Documentation
        </span>
      </div> */}
    </div>
  );
}

/* ================== Helper ================== */

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
