import Reveal from "./Reveal";

/** Editorial section header: small tracked eyebrow + large serif title. */
export default function SectionHeading({
  eyebrow,
  title,
  index,
}: {
  eyebrow: string;
  title: string;
  index: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-hairline pb-5 md:mb-16">
        <div className="flex items-baseline gap-5">
          <span className="text-[11px] uppercase tracking-label text-black/40">
            {index}
          </span>
          <span className="text-[11px] uppercase tracking-label text-black/40">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-right text-3xl leading-none sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
