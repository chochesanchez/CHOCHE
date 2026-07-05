"use client";

import { useState } from "react";
import { BIO, FACTS, INTERESTS, PHILOSOPHY } from "@/data/about";
import {
  CONTACT_LINKS,
  EMAIL,
  EMAIL_IS_PLACEHOLDER,
} from "@/data/contact";
import Panel from "@/components/ui/Panel";

export default function About({ show }: { show: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — links still work */
    }
  };

  return (
    <Panel show={show} eyebrow="01 — About" title="Behind the dots">
      <div className="max-w-[640px] space-y-[18px] text-[clamp(17px,2.05vw,22px)] leading-[1.5]">
        {BIO.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <blockquote className="my-10 max-w-[660px] border-l-2 border-black pl-6 text-[clamp(18px,2.4vw,26px)] italic leading-[1.38]">
        <span className="mb-2 block text-[11px] uppercase not-italic tracking-label text-black/45">
          Philosophy
        </span>
        {PHILOSOPHY}
      </blockquote>

      {/* What I do / interests — only the given ones */}
      <div className="mb-10">
        <div className="mb-4 text-[11px] uppercase tracking-label text-black/45">
          What I do
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[15px] text-black/75">
          {INTERESTS.map((it, i) => (
            <li
              key={it}
              className="after:ml-3 after:text-black/25 after:content-['·'] last:after:content-['']"
            >
              {it}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-8">
        {FACTS.map((f, i) => (
          <div key={i} className="min-w-[170px] max-w-[300px]">
            <div className="mb-[7px] text-[11px] uppercase tracking-label text-black/45">
              {f.label}
            </div>
            <div className="text-[15px] leading-[1.45]">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Contact — one tap away; converting clients is the goal */}
      <div className="mt-12 border-t border-hairline pt-8">
        <div className="mb-5 text-[11px] uppercase tracking-label text-black/45">
          Contact
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          {EMAIL_IS_PLACEHOLDER ? (
            <p className="text-sm text-black/45">
              Email coming soon — reach me on the links below.
            </p>
          ) : (
            <>
              <a
                href={`mailto:${EMAIL}`}
                className="border border-black px-6 py-3 text-sm uppercase tracking-wide2 transition-colors duration-200 hover:bg-black hover:text-white"
              >
                Write to me — {EMAIL}
              </a>
              <button
                type="button"
                onClick={copy}
                className="text-[11px] uppercase tracking-label text-black/50 underline-offset-4 hover:underline"
              >
                {copied ? "Copied" : "Copy email"}
              </button>
            </>
          )}
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          {CONTACT_LINKS.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {c.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
