import React, { useMemo, useEffect, useState } from "react";

export default function Oops({
  signInHref = "/signin",
  className = "",
}: {
  signInHref?: string;
  className?: string;
}) {
  const pool = [
    "Looks like your magic token forgot to show up.",
    "This dashboard only opens for actual humans with accounts.",
    "Door's locked. No badge, no entry — even for charming smiles.",
    "You can't binge the dashboard without permission.",
    "Account not found. Maybe try signing in (wild idea!).",
    "Nice try. But you need to sign in to access the secrets.",
    "The UI insists you identify yourself first. Rude, but fair.",
    "Hold up — authentication required before we spill the beans.",
    "You brought curiosity but forgot the login. Tragic.",
    "We checked. Your session is lounging on the beach. Sign in to wake it.",
  ];

  const line = useMemo(() => pool[Math.floor(Math.random() * pool.length)], []);

  const [showToast, setShowToast] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-[#040406] to-[#070708] ${className}`}
    >
      {/* subtle dotted background */}
      <svg
        className="pointer-events-none fixed inset-0 w-full h-full opacity-6"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="dots"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* small dismissible toast */}
      <div aria-live="polite" className="pointer-events-none">
        {showToast && (
          <div className="pointer-events-auto fixed right-6 top-6 z-50 rounded-lg bg-white/5 backdrop-blur-sm border border-white/8 px-4 py-3 shadow max-w-xs">
            <div className="flex items-start gap-3">
              <div
                className="flex-none mt-1 w-2.5 h-2.5 rounded-full bg-amber-400"
                aria-hidden
              />
              <div className="flex-1">
                <div className="text-xs text-gray-300">Heads up</div>
                <div className="mt-1 text-sm font-semibold text-white leading-snug">
                  {line}
                </div>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-200 ml-2"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* centered minimal card */}
      <section className="relative z-10 w-full max-w-xl mx-6 p-8 rounded-2xl bg-gradient-to-tr from-white/3 to-white/4 border border-white/6 shadow-2xl">
        <div className="flex flex-col gap-6">
          {/* header */}
          <div className="flex items-center gap-4">
            <div className="flex-none w-12 h-12 rounded-lg bg-white/6 grid place-items-center border border-white/8">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 2v6"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="15"
                  r="5"
                  stroke="white"
                  strokeWidth="1.3"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Sign in required
              </h1>
              <p className="mt-1 text-sm text-gray-300 max-w-md">
                You're trying to access the dashboard, which is private. Sign in
                to continue — we promise it's worth it.
              </p>
            </div>
          </div>

          {/* content split */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="flex-1 bg-gradient-to-b from-black/60 to-black/40 rounded-xl p-4 border border-white/6 flex flex-col justify-center">
              <div className="text-sm text-gray-200">{line}</div>
              <div className="mt-3 text-xs text-gray-400">
                Only one line of sass at a time — no crowding.
              </div>
            </div>

            <div className="flex-none w-full sm:w-44 flex flex-col justify-center gap-3">
              <button
                onClick={() => (window.location.href = signInHref)}
                className="w-full rounded-full px-4 py-2 bg-white text-black font-semibold shadow hover:transform hover:scale-[1.01] transition"
                aria-label="Sign in"
              >
                Sign in
              </button>

              <button
                onClick={() => window.history.back()}
                className="w-full rounded-full px-4 py-2 border border-white/10 text-white/90 hover:bg-white/3 transition"
                aria-label="Go back"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
