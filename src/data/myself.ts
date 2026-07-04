import type { Localized } from "@/i18n/types";

/** Bio paragraphs for the Myself section. Editable prose, per locale. */
export const BIO: Localized[] = [
  {
    en: "José Manuel Sánchez Pérez — CHOCHE — is a developer and designer from Monterrey, Mexico. He studies Computer Science & Technology Engineering at Tec de Monterrey and builds apps and web platforms with one obsession: simplicity.",
    es: "José Manuel Sánchez Pérez — CHOCHE — es un desarrollador y diseñador de Monterrey, México. Estudia Ingeniería en Tecnologías Computacionales en el Tec de Monterrey y construye apps y plataformas web con una obsesión: la simplicidad.",
    fr: "José Manuel Sánchez Pérez — CHOCHE — est un développeur et designer de Monterrey, Mexique. Il étudie l'ingénierie en technologies informatiques au Tec de Monterrey et construit des apps et des plateformes web avec une obsession : la simplicité.",
  },
  {
    en: "He believes complexity should be absorbed by the system, not the user — reducing every interaction to a single click, the way Tesla reduced driving. His work ranges from award-winning iOS apps to full-stack platforms for social impact, always under one signature: created by CHOCHE.",
    es: "Cree que la complejidad debe absorberla el sistema, no el usuario — reducir cada interacción a un solo clic, como Tesla redujo el manejar. Su trabajo va de apps iOS premiadas a plataformas full-stack para impacto social, siempre bajo una misma firma: creado por CHOCHE.",
    fr: "Il pense que la complexité doit être absorbée par le système, pas par l'utilisateur — réduire chaque interaction à un seul clic, comme Tesla a réduit la conduite. Son travail va d'apps iOS primées à des plateformes full-stack à impact social, toujours sous une même signature : créé par CHOCHE.",
  },
];

/** Short philosophy pull-quote. */
export const PHILOSOPHY: Localized = {
  en: "Reduce the complex to a single, effortless action. Solve the problems of your own community with technology.",
  es: "Reducir lo complejo a una sola acción sin esfuerzo. Resolver los problemas de tu propia comunidad con tecnología.",
  fr: "Réduire le complexe à une seule action sans effort. Résoudre les problèmes de sa propre communauté par la technologie.",
};

export const FACTS: { label: Localized; value: string }[] = [
  {
    label: { en: "Studying", es: "Estudiando", fr: "Études" },
    value: "Computer Science & Technology Engineering — Tec de Monterrey (2022 – 2027)",
  },
  {
    label: { en: "Based in", es: "Ubicado en", fr: "Basé à" },
    value: "Monterrey, Nuevo León, México",
  },
  {
    label: { en: "Focus", es: "Enfoque", fr: "Axe" },
    value: "iOS · Full-stack web · UI/UX",
  },
];
