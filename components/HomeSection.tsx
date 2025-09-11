import Link from "next/link";
import React from "react";

export default function HomeSection() {
  return (
    <section className="bg-gradient-to-b from-black/60 via-neutral-900 to-black text-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                EchoEd for Campuses — AI that knows your college
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-xl">
                Built for college staff and administrators: create a campus
                account, upload your PDFs, PPTs and policies, generate an API
                key, and embed a lightweight chatbot on your college website.
                Students ask — EchoEd answers using your uploaded curriculum and
                campus context.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard
                title="Institutional Knowledge"
                desc="Syllabus, notices, faculty contacts and exam patterns — directly searchable by students."
                icon={CalendarIcon}
              />

              <FeatureCard
                title="SDK & API Key"
                desc="One-time setup for your site: generate a scoped API key and initialize the SDK."
                icon={ShieldIcon}
              />

              <FeatureCard
                title="Simple Content Upload"
                desc="Drop PDFs, slides, and policies into your dashboard. EchoEd ingests and indexes them automatically."
                icon={MapIcon}
              />

              <FeatureCard
                title="Privacy & Controls"
                desc="Keys are institution-scoped. Rotate keys, set retention and access controls from the dashboard."
                icon={TranslateIcon}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex cursor-target items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-semibold shadow-lg hover:scale-[1.01] transition-transform"
              >
                Create Campus Account
              </Link>

              <Link
                href="/dashboard"
                className="text-gray-300 cursor-target hover:text-white"
              >
                Integration docs →
              </Link>
            </div>
          </div>

          {/* Right: admin-dashboard mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[320px] sm:w-[420px]">
              <div className="relative rounded-2xl overflow-hidden border border-white/6 bg-gradient-to-b from-neutral-800/40 to-black p-5 shadow-2xl">
                <div className="h-[420px] bg-gradient-to-b from-black/40 to-black rounded-xl p-4 text-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold">Campus Dashboard</div>
                    <div className="text-xs text-gray-400">Beta</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-xs text-gray-300">API Keys</div>
                      <div className="mt-2 font-medium">
                        Key: •••• •••• ••••
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-xs text-gray-300">Uploads</div>
                      <div className="mt-2 font-medium">12 files</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-white/5 rounded-md p-3 text-sm">
                    <div className="text-xs text-gray-300">Recent upload</div>
                    <div className="mt-1 font-medium">CS_Syllabus_Sem4.pdf</div>
                  </div>

                  <div className="mt-4 text-xs text-gray-400">
                    Students will be able to ask about course content directly
                    from your public site once embedded.
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 bg-white/5 px-3 py-1 rounded-full text-xs text-gray-200 border border-white/6">
                For College Staff
              </div>
            </div>
          </div>
        </div>

        {/* Onboarding & Integration strip */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white/4 p-6 rounded-2xl border border-white/6">
            <h3 className="text-xl font-semibold">
              Onboard your campus in 5 steps
            </h3>
            <ol className="mt-4 space-y-3 text-sm text-gray-300">
              <li>
                <strong>1.</strong> Create a campus admin account and verify
                your email.
              </li>
              <li>
                <strong>2.</strong> Generate an API key scoped to your
                institution and choose key permissions.
              </li>
              <li>
                <strong>3.</strong> Upload PDFs, PPTs and policy docs in the
                dashboard — organized by course and department.
              </li>
              <li>
                <strong>4.</strong> Embed the EchoEd SDK on your college website
                using the provided snippet.
              </li>
              <li>
                <strong>5.</strong> Monitor usage, rotate keys, and tune
                retention/permissions from the dashboard.
              </li>
            </ol>

            <div className="mt-6 bg-white/5 p-3 rounded-lg text-xs">
              <div className="font-medium">Quick SDK example</div>
              <pre className="mt-2 text-xs overflow-auto p-2 bg-black/60 rounded">
                {`import { EchoEdChat } from 'echoed-sdk';
<main>
    <EchoEdChat/>
</main>
                `}
              </pre>
            </div>
          </div>

          <div className="bg-white/6 p-6 rounded-2xl border border-white/6">
            <h3 className="text-xl font-semibold">Security & admin controls</h3>
            <p className="mt-3 text-sm text-gray-300">
              Keys are scoped and auditable. You can rotate keys, set read-only
              upload users, and configure data retention per-department. We also
              provide an activity log for compliance and support requests.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-md text-sm">
                <div className="font-semibold">Key rotation</div>
                <div className="text-xs text-gray-300 mt-1">
                  Rotate keys without downtime using the secondary key feature.
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-md text-sm">
                <div className="font-semibold">Access control</div>
                <div className="text-xs text-gray-300 mt-1">
                  Grant upload-only or admin roles to staff accounts.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials targeted to admin outcomes */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Testimonial
            quote="Onboarding took 10 minutes — our students love the quick answers."
            name="Dr. Mehta, Dean"
          />
          <Testimonial
            quote="We uploaded all syllabi and the bot started answering immediately."
            name="Ms. Roy, Admin"
          />
          <Testimonial
            quote="API keys and logs help us stay compliant with campus policies."
            name="Mr. Das, IT"
          />
        </div>
      </div>
    </section>
  );
}

/* ---- Helper subcomponents ---- */

function FeatureCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: any;
}) {
  return (
    <div className="flex cursor-target items-start gap-4 bg-white/3 p-4 rounded-2xl border border-white/6">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-300 mt-1">{desc}</div>
      </div>
    </div>
  );
}

function Testimonial({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="bg-white/4 p-4 cursor-target rounded-2xl border border-white/6">
      <div className="text-sm text-gray-100 italic">“{quote}”</div>
      <div className="mt-3 text-xs text-gray-300">— {name}</div>
    </div>
  );
}

/* ---- Simple SVG icons ---- */
function CalendarIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 3v4M8 3v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 6v12l6-3 6 3 6-12-6 3-6-3L3 6z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TranslateIcon(props: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 5h16M4 19h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5c2 2 2 6 0 8M7 12h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
