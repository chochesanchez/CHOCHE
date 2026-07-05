"use client";

import { TIMELINE } from "@/data/timeline";
import ImageFrame from "@/components/ui/ImageFrame";
import Panel from "@/components/ui/Panel";

/**
 * Image-led timeline, newest (2026) at the top → oldest (2003) at the bottom.
 * Each row: big year + one big uppercase word + a full image. No sentences.
 */
export default function Timeline({ show }: { show: boolean }) {
  return (
    <Panel show={show} eyebrow="02 — Timeline" title="Timeline">
      <div className="flex flex-col gap-14 sm:gap-20">
        {TIMELINE.map((item, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={i}
              className="grid grid-cols-1 items-center gap-6 border-t border-hairline pt-8 md:grid-cols-2 md:gap-12"
            >
              <div className={flip ? "md:order-2" : "md:order-1"}>
                <div className="text-[clamp(14px,1.6vw,18px)] tracking-wide2 text-black/45">
                  {item.year}
                </div>
                <div className="mt-1 text-[clamp(46px,9vw,104px)] uppercase leading-[0.9] tracking-[0.02em]">
                  {item.word}
                </div>
              </div>
              <div className={flip ? "md:order-1" : "md:order-2"}>
                <ImageFrame
                  src={item.image}
                  alt={item.caption}
                  ratio="4 / 3"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}
