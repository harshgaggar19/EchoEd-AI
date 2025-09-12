import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { DemoVideoSection } from "./DemoVideoSection";

const stepOneCode = `import EduAssistant from '@echoed-ai/sdk';`;
const stepTwoCode = `// ...in your component or app
<EduAssistant apiKey="YOUR_API_KEY" />`;

function CodeCopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mb-6">
      <span className="block text-xs text-neutral-400 mb-2 font-semibold uppercase tracking-wider">
        {label}
      </span>
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex items-center justify-between shadow-inner">
        <pre className="overflow-x-auto text-sm font-mono text-neutral-100 m-0">
          {code}
        </pre>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            toast.success("Copied!", { duration: 1000 });
            setTimeout(() => setCopied(false), 1000);
          }}
          aria-label="Copy code"
          className={`ml-2 border-teal-400 ${
            copied ? "bg-green-900 border-green-500" : ""
          }`}
        >
          <Copy
            size={18}
            className={copied ? "text-green-400" : "text-teal-300"}
          />
        </Button>
      </div>
    </div>
  );
}

export default function IntegrateDocs() {
  return (
    <>
      <div className="w-full mx-auto py-10 px-4">
        <h2 className="text-7xl font-extrabold mb-7 text-blue-400 tracking-tight">
          Integration Guide
        </h2>

        <div className="mb-10">
          <h3 className="text-xl font-bold mb-3 text-white">
            Step 1: Import the Component
          </h3>

          <CodeCopyBlock code={stepOneCode} label="Import" />
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-bold mb-3 text-white">
            Step 2: Render and Pass API Key
          </h3>
          <CodeCopyBlock code={stepTwoCode} label="Usage Example" />
        </div>

        {/* Optionally render a demo video/animation below */}
      </div>
      <DemoVideoSection descrip={false} />
    </>
  );
}
