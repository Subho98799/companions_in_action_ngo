"use client";

import { Copy, HeartHandshake, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { siteConfig } from "@/data/siteConfig";

type ActionComposerProps = {
  mode: "donate" | "enquire";
};

export function ActionComposer({ mode }: ActionComposerProps) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [copied, setCopied] = useState(false);

  const title = mode === "donate" ? "Start a donation" : "Send an enquiry";
  const buttonLabel = mode === "donate" ? "Copy donation message" : "Copy enquiry message";
  const message = useMemo(() => {
    const intro =
      mode === "donate"
        ? "Hi Companions in Action, I would like to donate."
        : "Hi Companions in Action, I would like to enquire.";
    const nameLine = name.trim() ? `My name is ${name.trim()}.` : "";
    const detailLine = detail.trim() ? detail.trim() : "Please share the next steps.";
    return [intro, nameLine, detailLine].filter(Boolean).join("\n");
  }, [detail, mode, name]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="border border-ink/15 bg-white/65 p-5 shadow-soft backdrop-blur md:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-paper">
          {mode === "donate" ? <HeartHandshake size={18} /> : <Send size={18} />}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss">
            {mode === "donate" ? "Donation path" : "Enquiry path"}
          </p>
          <h3 className="font-display text-3xl font-semibold">{title}</h3>
        </div>
      </div>

      <div className="grid gap-3">
        <input
          className="field"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <textarea
          className="field min-h-28 resize-none"
          placeholder={
            mode === "donate"
              ? "Amount or question about donating"
              : "What would you like to ask?"
          }
          value={detail}
          onChange={(event) => setDetail(event.target.value)}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-paper transition hover:bg-river"
        >
          <Copy size={17} />
          {copied ? "Message copied" : buttonLabel}
        </button>
        <a
          href={mode === "donate" && siteConfig.donationUrl ? siteConfig.donationUrl : siteConfig.instagramDmUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-ink/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition hover:border-river hover:text-river"
        >
          <Send size={17} />
          Open Instagram DM
        </a>
      </div>
    </div>
  );
}
