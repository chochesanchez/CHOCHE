import type { Locale } from "./types";

/**
 * UI strings for the whole site. Keys are stable; content per locale.
 * Prose that belongs to content (bio, project/work descriptions) lives in
 * /data with Localized fields — this file is only chrome and section copy.
 */
export type Dict = {
  nav: {
    myself: string;
    work: string;
    projects: string;
    map: string;
    info: string;
    backToTop: string;
  };
  hero: {
    role: string;
    signature: string;
    scrollHint: string;
    reducedMotionAlt: string;
  };
  myself: {
    eyebrow: string;
    title: string;
    philosophyLabel: string;
  };
  work: {
    eyebrow: string;
    title: string;
    present: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    awardLabel: string;
    stackLabel: string;
    visit: string;
    comingSoonLabel: string;
    comingSoonBody: string;
  };
  map: {
    eyebrow: string;
    title: string;
    countries: string;
    cities: string;
    hint: string;
    citiesIn: string;
  };
  info: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    copyEmail: string;
    copied: string;
    emailPlaceholder: string;
    locationLabel: string;
  };
  footer: {
    signature: string;
  };
};

export const DICTIONARIES: Record<Locale, Dict> = {
  en: {
    nav: {
      myself: "Myself",
      work: "Work",
      projects: "Projects",
      map: "Map",
      info: "Info",
      backToTop: "Back to top — re-expand the face",
    },
    hero: {
      role: "designer & developer",
      signature: "created by CHOCHE",
      scrollHint: "scroll",
      reducedMotionAlt:
        "A face rendered in black dots on white — the CHOCHE signature.",
    },
    myself: {
      eyebrow: "Myself",
      title: "The person behind the dots",
      philosophyLabel: "Philosophy",
    },
    work: {
      eyebrow: "Work",
      title: "Where I've worked",
      present: "Present",
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      awardLabel: "Award",
      stackLabel: "Stack",
      visit: "Visit",
      comingSoonLabel: "Coming soon",
      comingSoonBody: "created by CHOCHE",
    },
    map: {
      eyebrow: "Map",
      title: "Places I've been",
      countries: "countries",
      cities: "cities",
      hint: "Hover a country to see the cities.",
      citiesIn: "Cities in",
    },
    info: {
      eyebrow: "Info",
      title: "Let's work together",
      lead: "Have a project in mind? I design and build products that feel simple. Tell me what you need.",
      cta: "Write to me",
      copyEmail: "Copy email",
      copied: "Copied",
      emailPlaceholder: "Email coming soon — reach me on the links below.",
      locationLabel: "Based in",
    },
    footer: {
      signature: "created by CHOCHE",
    },
  },

  es: {
    nav: {
      myself: "Yo",
      work: "Trayectoria",
      projects: "Proyectos",
      map: "Mapa",
      info: "Contacto",
      backToTop: "Volver arriba — reexpandir la cara",
    },
    hero: {
      role: "diseñador y desarrollador",
      signature: "creado por CHOCHE",
      scrollHint: "desliza",
      reducedMotionAlt:
        "Una cara formada por puntos negros sobre blanco — la firma de CHOCHE.",
    },
    myself: {
      eyebrow: "Yo",
      title: "La persona detrás de los puntos",
      philosophyLabel: "Filosofía",
    },
    work: {
      eyebrow: "Trayectoria",
      title: "Dónde he trabajado",
      present: "Presente",
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Trabajo seleccionado",
      awardLabel: "Premio",
      stackLabel: "Stack",
      visit: "Visitar",
      comingSoonLabel: "Próximamente",
      comingSoonBody: "creado por CHOCHE",
    },
    map: {
      eyebrow: "Mapa",
      title: "Lugares donde he estado",
      countries: "países",
      cities: "ciudades",
      hint: "Pasa el cursor sobre un país para ver las ciudades.",
      citiesIn: "Ciudades en",
    },
    info: {
      eyebrow: "Contacto",
      title: "Trabajemos juntos",
      lead: "¿Tienes un proyecto en mente? Diseño y construyo productos que se sienten simples. Cuéntame qué necesitas.",
      cta: "Escríbeme",
      copyEmail: "Copiar correo",
      copied: "Copiado",
      emailPlaceholder: "Correo próximamente — encuéntrame en los enlaces de abajo.",
      locationLabel: "Ubicado en",
    },
    footer: {
      signature: "creado por CHOCHE",
    },
  },

  fr: {
    nav: {
      myself: "Moi",
      work: "Parcours",
      projects: "Projets",
      map: "Carte",
      info: "Contact",
      backToTop: "Retour en haut — ré-agrandir le visage",
    },
    hero: {
      role: "designer & développeur",
      signature: "créé par CHOCHE",
      scrollHint: "défiler",
      reducedMotionAlt:
        "Un visage en points noirs sur blanc — la signature de CHOCHE.",
    },
    myself: {
      eyebrow: "Moi",
      title: "La personne derrière les points",
      philosophyLabel: "Philosophie",
    },
    work: {
      eyebrow: "Parcours",
      title: "Où j'ai travaillé",
      present: "Présent",
    },
    projects: {
      eyebrow: "Projets",
      title: "Travaux choisis",
      awardLabel: "Prix",
      stackLabel: "Stack",
      visit: "Visiter",
      comingSoonLabel: "Bientôt",
      comingSoonBody: "créé par CHOCHE",
    },
    map: {
      eyebrow: "Carte",
      title: "Lieux visités",
      countries: "pays",
      cities: "villes",
      hint: "Survolez un pays pour voir les villes.",
      citiesIn: "Villes en",
    },
    info: {
      eyebrow: "Contact",
      title: "Travaillons ensemble",
      lead: "Un projet en tête ? Je conçois et construis des produits qui semblent simples. Dites-moi ce qu'il vous faut.",
      cta: "Écrivez-moi",
      copyEmail: "Copier l'e-mail",
      copied: "Copié",
      emailPlaceholder: "E-mail bientôt disponible — retrouvez-moi via les liens ci-dessous.",
      locationLabel: "Basé à",
    },
    footer: {
      signature: "créé par CHOCHE",
    },
  },
};
