"use client";

import { useEffect, useRef } from "react";

/**
 * A full-screen content panel that dissolves in over the dot canvas — slowly.
 * No routing; visibility is driven entirely by `show`.
 */
export default function Panel({
  show,
  eyebrow,
  title,
  children,
}: {
  show: boolean;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (show && ref.current) ref.current.scrollTop = 0;
  }, [show]);

  return (
    <section
      ref={ref}
      aria-hidden={!show}
      className="absolute inset-0 z-[5] overflow-y-auto bg-white px-[8%] pb-[110px] pt-[104px] transition-opacity duration-[1500ms] ease-editorial [-webkit-overflow-scrolling:touch] sm:px-[9%] sm:pb-[128px] sm:pt-[120px]"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="mx-auto w-full max-w-editorial">
        <p className="mb-6 text-[11px] uppercase tracking-label text-black/45">
          {eyebrow}
        </p>
        <h2 className="text-[clamp(38px,7vw,80px)] font-normal leading-[0.98]">
          {title}
        </h2>
        <div className="my-8 h-px bg-hairline" />
        {children}
      </div>
    </section>
  );
}
