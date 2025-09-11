"use client";

import React, { useState } from "react";

const plans = [
  {
    id: "free",
    title: "Free",
    monthly: 0,
    yearly: 0,
    queries: "5,000 / month",
    pdfs: "3 / month",
    perks: ["Scoped API key", "Basic SDK embed", "Community support"],
  },
  {
    id: "pro",
    title: "Pro (Institutes)",
    monthly: 399,
    yearly: 3999,
    queries: "100,000 / month",
    pdfs: "250 / month",
    perks: ["Priority ingestion", "Retention controls", "India-hour support"],
  },
  {
    id: "enterprise",
    title: "Enterprise (University)",
    monthly: 1999,
    yearly: 19999,
    queries: "1,000,000 / month",
    pdfs: "2,000 / month",
    perks: ["SSO & SAML", "Dedicated onboarding", "SLA & priority support"],
  },
];

function formatINR(v) {
  if (v === 0) return "Free";
  return `₹${v.toLocaleString("en-IN")}`;
}

export default function Price() {
  const [layout, setLayout] = useState("cards");
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="w-full bg-black text-gray-200 py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Pricing — pick a layout
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Everything priced in INR. GST extra.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center bg-[#0f0f10] rounded-full p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-3 py-1 cursor-target rounded-full text-xs font-medium ${
                  billing === "monthly"
                    ? "bg-white text-black"
                    : "text-gray-300"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-3 py-1 cursor-target rounded-full text-xs font-medium ${
                  billing === "yearly" ? "bg-white text-black" : "text-gray-300"
                }`}
              >
                Yearly
              </button>
            </div>

            <div className="inline-flex items-center bg-[#0f0f10] rounded-full p-1">
              <button
                onClick={() => setLayout("cards")}
                className={`px-3 py-1 cursor-target text-sm ${
                  layout === "cards"
                    ? "bg-white text-black rounded-full"
                    : "text-gray-300"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setLayout("table")}
                className={`px-3 py-1 cursor-target text-sm ${
                  layout === "table"
                    ? "bg-white text-black rounded-full"
                    : "text-gray-300"
                }`}
              >
                Comparison
              </button>
              <button
                onClick={() => setLayout("compact")}
                className={`px-3 py-1 cursor-target text-sm ${
                  layout === "compact"
                    ? "bg-white text-black rounded-full"
                    : "text-gray-300"
                }`}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Cards - visual, feature-focused */}
        {layout === "cards" && (
          <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl cursor-target p-6 border ${
                  p.id === "pro"
                    ? "border-indigo-700 bg-gradient-to-br from-[#0f1220] to-[#070709]"
                    : "border-gray-800 bg-[#070707]"
                } shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="text-xs text-gray-400 mt-1">
                      {p.queries} • {p.pdfs}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold">
                      {billing === "monthly"
                        ? formatINR(p.monthly) + (p.monthly ? "/mo" : "")
                        : formatINR(p.yearly) + (p.yearly ? "/yr" : "")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {billing === "monthly"
                        ? "billed monthly"
                        : "billed annually"}
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-1"
                      >
                        <path
                          d="M5 13l4 4L20 6"
                          stroke="#9CA3AF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-gray-300">{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <button
                    className={`w-full cursor-target py-2 rounded-xl font-semibold ${
                      p.id === "pro"
                        ? "bg-white text-black"
                        : "bg-transparent border border-gray-700 text-gray-200"
                    }`}
                  >
                    {p.id === "enterprise" ? "Contact sales" : "Get started"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Layout: Comparison Table - great for side-by-side specs */}
        {layout === "table" && (
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#060607]">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400">
                  <th className="p-4">Plan</th>
                  {plans.map((p) => (
                    <th key={p.id} className="p-4 text-center">
                      {p.title}
                      <div className="text-sm mt-2">
                        {billing === "monthly"
                          ? formatINR(p.monthly) + (p.monthly ? "/mo" : "")
                          : formatINR(p.yearly) + (p.yearly ? "/yr" : "")}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-gray-800">
                  <td className="p-4 text-gray-300">Queries / month</td>
                  {plans.map((p) => (
                    <td key={p.id} className="p-4 text-center text-gray-200">
                      {p.queries}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-gray-800 bg-[#070709]">
                  <td className="p-4 text-gray-300">PDFs / month</td>
                  {plans.map((p) => (
                    <td key={p.id} className="p-4 text-center text-gray-200">
                      {p.pdfs}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="p-4 text-gray-300">Key perks</td>
                  {plans.map((p) => (
                    <td key={p.id} className="p-4 text-sm text-gray-200">
                      <ul className="space-y-1">
                        {p.perks.map((perk) => (
                          <li key={perk}>• {perk}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-gray-800">
                  <td className="p-4" />
                  {plans.map((p) => (
                    <td key={p.id} className="p-4 text-center">
                      <button
                        className={`py-2 px-4 rounded-md ${
                          p.id === "pro"
                            ? "bg-white text-black font-semibold"
                            : "bg-transparent border border-gray-700 text-gray-200"
                        }`}
                      >
                        {p.id === "enterprise" ? "Contact sales" : "Choose"}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {layout === "compact" && (
          <div className="bg-[#070707] rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {plans.map((p) => (
                    <div key={p.id} className="p-4 bg-[#0b0b0b] rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-300 font-semibold">
                            {p.title}
                          </div>
                          <div className="text-xs text-gray-400">
                            {p.queries}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {billing === "monthly"
                              ? formatINR(p.monthly)
                              : formatINR(p.yearly)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {billing === "monthly" ? "/mo" : "/yr"}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-400">
                        {p.perks[0]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-400">
                    Need more queries?
                  </div>
                  <div className="w-full bg-[#0b0b0b] rounded-full h-3 mt-2 overflow-hidden">
                    <div
                      style={{ width: "35%" }}
                      className="h-3 rounded-full bg-white opacity-90"
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Usage: 35% of Pro quota
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 flex flex-col gap-3">
                <div className="p-4 bg-[#0b0b0b] rounded-lg">
                  <div className="text-sm font-semibold">Quick add-ons</div>
                  <div className="text-xs text-gray-400 mt-2">
                    Extra queries: ₹150 / 1,000
                  </div>
                  <div className="text-xs text-gray-400">
                    Extra PDF ingestion: ₹50 / file
                  </div>
                </div>

                <div className="p-4 bg-[#0b0b0b] rounded-lg">
                  <div className="text-sm font-semibold">Payments</div>
                  <div className="text-xs text-gray-400 mt-2">
                    Accepts UPI, Netbanking, Credit/Debit — integrate via
                    Razorpay or custom gateway.
                  </div>
                </div>

                <button className="w-full py-2 rounded-xl bg-white text-black font-semibold">
                  Get started
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-xs text-gray-500">
          Tips: choose the layout that fits your landing. Comparison is best for
          technical buyers; Compact is great for small colleges, Cards are
          visually strong on product pages.
        </div>
      </div>
    </section>
  );
}
