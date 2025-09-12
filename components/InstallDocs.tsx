import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, Eye, EyeOff, KeyRound } from "lucide-react";
import { toast } from "sonner"; // shadcn toast
import api from "@/lib/api";
import { useUser } from "@clerk/nextjs";

const sampleApiKey = "sk-7h1s1sABCDXXXXXXxy9nF@keY";
const sdkInstallCommand = "npm install @echoed-ai/sdk";

export function ApiKeySection({
  apiKey,
  onRegenerate,
}: {
  apiKey: string;
  onRegenerate: () => void;
}) {
  const [hidden, setHidden] = useState(true);
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("Generate");
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied!", { duration: 1400 });
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="w-full  px-8   shadow-2xl mb-12">
      <div className="flex items-center gap-3 mb-6">
        <KeyRound className="text-teal-400" size={28} />
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          <span className="mr-3">Your API Key</span>
          <span className="inline-block align-middle bg-teal-800/50 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full tracking-widest ml-1 uppercase">
            Secure
          </span>
        </h2>
      </div>

      <div className="mb-6 px-0 md:px-4 py-4 bg-neutral-950/60 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-neutral-700">
        <div className="flex items-center gap-4 w-full">
          <span className="font-mono text-sm md:text-md text-green-400 bg-neutral-900 px-4 py-2 rounded select-all tracking-widest shadow-inner flex-1 transition-all">
            {maskApiKey(apiKey, !hidden)}
          </span>
          <Button
            type="button"
            onClick={handleCopy}
            size="icon"
            variant="outline"
            className={`border-teal-500 transition-transform ${
              copied ? "scale-110 border-green-500 bg-green-900/80" : ""
            }`}
            aria-label="Copy API key"
          >
            <Copy
              size={19}
              className={copied ? "text-green-400" : "text-teal-300"}
            />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="ml-1"
            aria-label={hidden ? "Show API key" : "Hide API key"}
            onClick={() => setHidden((h) => !h)}
          >
            {hidden ? (
              <EyeOff size={19} className="text-neutral-400" />
            ) : (
              <Eye size={19} className="text-teal-400" />
            )}
          </Button>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="bg-teal-900 text-teal-200 font-bold flex-shrink-0 transition-colors border-none hover:bg-teal-800 mt-4 md:mt-0"
          onClick={() => {
            setMsg("Generating...");
            setTimeout(() => {}, 1000);
            onRegenerate();
            setMsg("Generated");
            setTimeout(() => {}, 1000);
            setMsg("Generate");
          }}
        >
          <RefreshCcw size={16} className="mr-2" />
          {msg}
        </Button>
      </div>
      <p className="text-sm text-neutral-400 px-1">
        <span className="font-semibold text-teal-200">Pro tip:</span> Treat your
        API key like a password. You can regenerate or reveal it anytime, but
        keep it confidential!
      </p>
    </section>
  );
}

function maskApiKey(key: string, visible: boolean) {
  return visible ? key : key?.replace(/.(?=.{4})/g, "•");
}
function InstallSection({ command }: { command: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    toast.success("Install command copied!", { duration: 1200 });
  };

  return (
    <section className="w-full  p-6 rounded-2xl  border-neutral-800 shadow-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 tracking-tight">
        SDK Installation
      </h2>
      <div className="flex flex-col md:flex-row items-start gap-4 mb-2">
        <span className="font-mono bg-neutral-800 text-base px-4 py-2 rounded text-white select-all">
          {command}
        </span>
        <Button
          type="button"
          variant="outline"
          className="border border-blue-400 text-sm"
          onClick={handleCopy}
        >
          <Copy size={18} className="mr-2" />
          Copy Command
        </Button>
      </div>
      <div className="text-neutral-400 text-sm mt-1">
        Run this in your project directory to install{" "}
        <span className="text-blue-300 font-semibold">@echoed-ai/sdk</span>.
      </div>
    </section>
  );
}

export default function InstallDocs() {
  const [apiKey, setApiKey] = useState("Loading API key...");
  const getApiKey = async () => {
    try {
      const { data } = await api.get("/api/org/get-keys", {
        headers: {
          email: user?.emailAddresses[0]?.emailAddress,
        },
      });
      if (data.apiKey === "") {
        setApiKey("No_API_KEY");
        return;
      }
      console.log(data.apiKey);
      setApiKey(data.apiKey);
    } catch (error) {
      console.error("Error_fetching_API_key:", error);
      setApiKey("Error_fetching_API_key");
    }
  };
  const { user } = useUser();
  getApiKey();
  const handleRegenKey = async () => {
    try {
      const { data } = await api.post("/api/org/generate-api-key", {
        email: user?.emailAddresses[0]?.emailAddress || "niraj",
      });
      if (data.success) {
        setApiKey(data.apiKey);
        toast.success("API key re-generated!", { duration: 1400 });
        return;
      }
      toast.success("API key failed to generate!", { duration: 1400 });
    } catch (error) {
      console.error("Error regenerating API key:", error);
      toast.error("Failed to regenerate API key.", { duration: 1400 });
    }
  };

  return (
    <div className="w-full mx-auto py-10 px-4">
      <ApiKeySection apiKey={apiKey} onRegenerate={handleRegenKey} />
      <InstallSection command={sdkInstallCommand} />
    </div>
  );
}
