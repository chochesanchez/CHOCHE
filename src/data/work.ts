import type { Localized } from "@/i18n/types";

export interface WorkEntry {
  role: Localized;
  org: string;
  /** Free-text period; `present: true` swaps the end for a localized label. */
  period: string;
  present?: boolean;
  description: Localized;
}

export const WORK: WorkEntry[] = [
  {
    role: {
      en: "Technology Lead",
      es: "Líder de Tecnología",
      fr: "Responsable Technologie",
    },
    org: "TransformArte / Club Rotario Monterrey Metropolitano A.C.",
    period: "May 2025",
    present: true,
    description: {
      en: "End-to-end design and development of a full-stack community and fundraising platform for a Rotary initiative across 7 cities.",
      es: "Diseño y desarrollo integral de una plataforma full-stack de comunidad y recaudación para una iniciativa de Rotary en 7 ciudades.",
      fr: "Conception et développement de bout en bout d'une plateforme full-stack de communauté et de collecte pour une initiative Rotary dans 7 villes.",
    },
  },
  {
    role: { en: "Developer", es: "Desarrollador", fr: "Développeur" },
    org: "Lumina Consulting",
    period: "2026",
    description: {
      en: "Web fan-engagement platform (AFI) for Golden State Warriors supporters.",
      es: "Plataforma web de fan engagement (AFI) para aficionados de los Golden State Warriors.",
      fr: "Plateforme web d'engagement des fans (AFI) pour les supporters des Golden State Warriors.",
    },
  },
  {
    role: {
      en: "Developer & Automation",
      es: "Desarrollador y Automatización",
      fr: "Développeur & Automatisation",
    },
    org: "Dasza Logistics 3PL Trade & Consulting",
    period: "—",
    description: {
      en: "Website redesign (dasza.com) and an internal process tool, “Dasza System.”",
      es: "Rediseño del sitio (dasza.com) e implementación de una herramienta interna, “Dasza System.”",
      fr: "Refonte du site (dasza.com) et mise en place d'un outil interne, « Dasza System ».",
    },
  },
  {
    role: {
      en: "Implementation",
      es: "Implementación",
      fr: "Implémentation",
    },
    org: "The Makeup Center",
    period: "—",
    description: {
      en: "GoHighLevel and Shopify implementation with supporting automations.",
      es: "Implementación de GoHighLevel y Shopify con automatizaciones de apoyo.",
      fr: "Mise en œuvre de GoHighLevel et Shopify avec automatisations à l'appui.",
    },
  },
];
