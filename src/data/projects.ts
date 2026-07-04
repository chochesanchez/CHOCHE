import type { Localized } from "@/i18n/types";

export interface Project {
  name: string;
  award?: Localized;
  badge?: string; // emoji medal, decorative
  description: Localized;
  stack: string[];
  href?: string; // undefined => link is a placeholder
  hrefLabel?: string;
  /** Placeholder image path under /public until real mockups land. */
  image: string;
  imageAlt: Localized;
}

export interface ComingSoon {
  name: string;
  description: Localized;
}

export const PROJECTS: Project[] = [
  {
    name: "BALANCE",
    badge: "🏆",
    award: {
      en: "WWDC25 Swift Student Challenge — Winner",
      es: "WWDC25 Swift Student Challenge — Ganador",
      fr: "WWDC25 Swift Student Challenge — Lauréat",
    },
    description: {
      en: "Native SwiftUI iOS app for the personal finances of students and young people. Offline-first, no accounts, no cloud — 100% on-device.",
      es: "App iOS nativa en SwiftUI para las finanzas personales de estudiantes y jóvenes. Offline-first, sin cuentas, sin nube — 100% en el dispositivo.",
      fr: "App iOS native en SwiftUI pour les finances personnelles des étudiants et des jeunes. Hors-ligne d'abord, sans compte, sans cloud — 100% sur l'appareil.",
    },
    stack: ["Swift", "SwiftUI", "iOS"],
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "BALANCE — personal finance iOS app",
      es: "BALANCE — app iOS de finanzas personales",
      fr: "BALANCE — app iOS de finances personnelles",
    },
  },
  {
    name: "FARO",
    badge: "🏆",
    award: {
      en: "1st place — Swift Challenge Fest 2026 (Human-Centered AI / SDG)",
      es: "1er lugar — Swift Challenge Fest 2026 (IA centrada en las personas / ODS)",
      fr: "1re place — Swift Challenge Fest 2026 (IA centrée sur l'humain / ODD)",
    },
    description: {
      en: "iPhone/iPad app in Swift, SwiftUI and SwiftData with 100% on-device AI. Organizes the first 72 hours of a possible disappearance — turning scattered information into a private, validated, actionable case file. SDG 16 + 10.",
      es: "App para iPhone/iPad en Swift, SwiftUI y SwiftData con IA 100% en el dispositivo. Organiza las primeras 72 horas de una posible desaparición — convierte información dispersa en un expediente privado, validado y accionable. ODS 16 + 10.",
      fr: "App iPhone/iPad en Swift, SwiftUI et SwiftData avec IA 100% sur l'appareil. Organise les 72 premières heures d'une disparition possible — transforme des informations éparses en un dossier privé, validé et exploitable. ODD 16 + 10.",
    },
    stack: ["Swift", "SwiftUI", "SwiftData", "On-device AI"],
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "FARO — first-72-hours case organizer",
      es: "FARO — organizador de las primeras 72 horas",
      fr: "FARO — organiseur des 72 premières heures",
    },
  },
  {
    name: "NEXO",
    badge: "🥈",
    award: {
      en: "2nd place — Enactus Hackathon 2026 / Swift Change Makers (Mexico City)",
      es: "2º lugar — Enactus Hackathon 2026 / Swift Change Makers (CDMX)",
      fr: "2e place — Enactus Hackathon 2026 / Swift Change Makers (Mexico)",
    },
    description: {
      en: "iOS app that identifies waste with AI, guides its preparation, and connects people with recycling centers and collectors.",
      es: "App iOS que identifica residuos con IA, guía su preparación y conecta con centros de reciclaje y recolectores.",
      fr: "App iOS qui identifie les déchets par IA, guide leur préparation et met en relation avec les centres de recyclage et les collecteurs.",
    },
    stack: ["Swift", "SwiftUI", "Core ML"],
    href: "https://github.com/chochesanchez/Nexo",
    hrefLabel: "GitHub",
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "NEXO — AI waste sorting iOS app",
      es: "NEXO — app iOS de clasificación de residuos con IA",
      fr: "NEXO — app iOS de tri des déchets par IA",
    },
  },
  {
    name: "KafeCam",
    description: {
      en: "iOS app with on-device ML that detects diseases and nutritional deficiencies in coffee crops in real time, with weather forecasting and collaboration between farmers and technicians. Built for coffee-growing communities in Chiapas, Mexico. Offline-capable.",
      es: "App iOS con ML en el dispositivo que detecta enfermedades y deficiencias nutricionales en cultivos de café en tiempo real, con pronóstico del clima y colaboración entre agricultores y técnicos. Pensada para comunidades cafetaleras en Chiapas, México. Funciona sin conexión.",
      fr: "App iOS avec ML embarqué qui détecte maladies et carences nutritionnelles des cultures de café en temps réel, avec prévisions météo et collaboration entre agriculteurs et techniciens. Conçue pour les communautés caféicoles du Chiapas, Mexique. Fonctionne hors-ligne.",
    },
    stack: ["Swift", "Core ML", "iOS"],
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "KafeCam — on-device crop diagnosis for coffee",
      es: "KafeCam — diagnóstico de cultivos de café en el dispositivo",
      fr: "KafeCam — diagnostic des cultures de café sur l'appareil",
    },
  },
  {
    name: "TransformArte",
    description: {
      en: "Full-stack platform for a Rotary District 4130 social initiative (art + youth mental health, 7 cities). Bilingual ES/EN. Role: Technology Lead.",
      es: "Plataforma full-stack para una iniciativa social de Rotary Distrito 4130 (arte + salud mental juvenil, 7 ciudades). Bilingüe ES/EN. Rol: Líder de Tecnología.",
      fr: "Plateforme full-stack pour une initiative sociale du Rotary District 4130 (art + santé mentale des jeunes, 7 villes). Bilingue ES/EN. Rôle : Responsable Technologie.",
    },
    stack: ["Next.js 15", "React 18", "TypeScript", "Tailwind", "Supabase", "Prisma"],
    href: "https://transform-arte.com.mx",
    hrefLabel: "transform-arte.com.mx",
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "TransformArte — full-stack community platform",
      es: "TransformArte — plataforma de comunidad full-stack",
      fr: "TransformArte — plateforme communautaire full-stack",
    },
  },
  {
    name: "AFI",
    description: {
      en: "Active Fan Interaction — a web fan-engagement platform for Golden State Warriors supporters. Team: Lumina Consulting.",
      es: "Active Fan Interaction — plataforma web de fan engagement para aficionados de los Golden State Warriors. Equipo: Lumina Consulting.",
      fr: "Active Fan Interaction — plateforme web d'engagement des fans pour les supporters des Golden State Warriors. Équipe : Lumina Consulting.",
    },
    stack: ["React", "TypeScript", "Supabase"],
    href: "https://warriors-afi.vercel.app",
    hrefLabel: "warriors-afi.vercel.app",
    image: "/projects/placeholder.svg",
    imageAlt: {
      en: "AFI — Golden State Warriors fan engagement platform",
      es: "AFI — plataforma de fan engagement de los Golden State Warriors",
      fr: "AFI — plateforme d'engagement des fans des Golden State Warriors",
    },
  },
];

export const COMING_SOON: ComingSoon[] = [
  {
    name: "CASHINO",
    description: {
      en: "A retro-casino video game.",
      es: "Un videojuego de casino retro.",
      fr: "Un jeu vidéo de casino rétro.",
    },
  },
  {
    name: "Apparel",
    description: {
      en: "An apparel store.",
      es: "Una tienda de ropa.",
      fr: "Une boutique de vêtements.",
    },
  },
];
