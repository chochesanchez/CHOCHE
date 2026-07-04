"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { COMING_SOON, PROJECTS } from "@/data/projects";
import { pick } from "@/i18n/types";
import ImageFrame from "@/components/ui/ImageFrame";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects() {
  const { locale, t } = useLanguage();
  return (
    <section
      id="projects"
      className="relative z-20 mx-auto w-full max-w-editorial scroll-mt-24 bg-white px-6 py-24 sm:px-10 md:py-32"
    >
      <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} index="03" />

      <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 90}>
            <article className="group flex flex-col gap-5">
              <ImageFrame
                src={p.image}
                alt={pick(p.imageAlt, locale)}
                ratio="4 / 3"
              />

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl">{p.name}</h3>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap text-[11px] uppercase tracking-label underline-offset-4 hover:underline"
                    >
                      {p.hrefLabel ?? t.projects.visit} ↗
                    </a>
                  ) : (
                    <span className="whitespace-nowrap text-[11px] uppercase tracking-label text-black/30">
                      —
                    </span>
                  )}
                </div>

                <p className="text-[11px] uppercase tracking-label text-black/40">
                  created by CHOCHE
                </p>

                {p.award && (
                  <p className="text-sm text-black/70">
                    <span aria-hidden="true">{p.badge} </span>
                    {pick(p.award, locale)}
                  </p>
                )}

                <p className="text-base leading-relaxed text-black/70">
                  {pick(p.description, locale)}
                </p>

                <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-wide2 text-black/45">
                  {p.stack.map((s) => (
                    <li key={s} className="after:ml-3 after:content-['/'] last:after:content-['']">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Coming soon, created by CHOCHE */}
      <Reveal delay={80}>
        <div className="mt-20 border-t border-hairline pt-10">
          <p className="mb-6 text-[11px] uppercase tracking-label text-black/40">
            {t.projects.comingSoonLabel} · {t.projects.comingSoonBody}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {COMING_SOON.map((c) => (
              <div
                key={c.name}
                className="flex items-baseline justify-between gap-4 border border-dashed border-hairline px-6 py-6"
              >
                <h3 className="text-xl">{c.name}</h3>
                <p className="text-right text-sm text-black/55">
                  {pick(c.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
