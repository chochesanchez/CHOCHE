export interface ContactLink {
  label: string;
  value: string;
  href: string;
  /** true when this is real; false marks a placeholder to be filled in later. */
  ready: boolean;
}

/** Contact email — placeholder until Choche provides the real address. */
export const EMAIL = "hello@choche.dev"; // TODO(choche): replace with real email
export const EMAIL_IS_PLACEHOLDER = true;

export const LOCATION = "Monterrey, Nuevo León, México";

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "GitHub",
    value: "github.com/chochesanchez",
    href: "https://github.com/chochesanchez",
    ready: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jmspswe",
    href: "https://linkedin.com/in/jmspswe",
    ready: true,
  },
  {
    label: "Instagram",
    value: "instagram.com/chochesanchezz",
    href: "https://instagram.com/chochesanchezz",
    ready: true,
  },
];
