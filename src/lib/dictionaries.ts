import type { Locale } from "@/lib/i18n";

export type Dictionary = typeof en;

export const en = {
  nav: {
    features: "Features",
    rails: "Rails",
    proof: "Proof",
    security: "Security",
    faq: "FAQ",
    project: "Project Details",
  },
  cta: {
    primary: "Book a consultation",
    secondary: "Project Details →",
    github: "View source on GitHub",
  },
  hero: {
    badge: "Payment & Banking Infrastructure",
    titleA: "Scale fintech",
    titleB: "safe and secure",
    subtitle:
      "KlyraPay helps modern teams launch card issuing, bank transfers, and instant settlement with a sleek developer experience and enterprise-grade security.",
    stat1k: "Current balance",
    stat2k: "Instant settlement",
  },
  sections: {
    features: {
      eyebrow: "Built for the teams that ship",
      title: "A modern payments stack—minus the drag.",
      subtitle:
        "The visuals are premium, but the code is practical: composable sections, centralized branding, and SEO-first defaults so companies can fork this as a real template.",
      cards: [
        {
          title: "Multi-rail routing",
          body: "Choose the fastest, cheapest rail per region—cards, ACH/SEPA, and RTP-style flows.",
        },
        {
          title: "Smart vaults",
          body: "Tokenized storage patterns and deterministic IDs—designed for a privacy-first mindset.",
        },
        {
          title: "Fraud signals",
          body: "Risk layers that feel like product: device hints, velocity rules, and step-up policies.",
        },
        {
          title: "Global payouts",
          body: "Batch, schedule, and reconcile payouts with clean reporting semantics.",
        },
      ],
    },
    rails: {
      eyebrow: "The rails",
      title: "One integration. Multiple rails.",
      subtitle:
        "A landing page should feel tangible. These sections are modeled after what real fintech buyers ask for: uptime, latency, compliance, and controls.",
      items: [
        {
          k: "Card issuing",
          v: "Virtual and physical issuance flows with programmable controls.",
        },
        { k: "Bank transfers", v: "ACH/SEPA-like flows with status webhooks." },
        {
          k: "Instant settlement",
          v: "Near-real-time settlement patterns with clear traceability.",
        },
        { k: "Ledger views", v: "Readable balances and auditable history." },
      ],
    },
    proof: {
      eyebrow: "Case study",
      title: "Proof that design can sell trust.",
      subtitle:
        "KlyraPay is a frontend-only project: no fake login screens, no backend fluff—just sharp marketing and strong engineering standards.",
      bullets: [
        "Acquired 8 long-time customers",
        "300% growth in first year",
        "Hired 24 talented developers",
      ],
      button: "Read the story",
    },
    security: {
      eyebrow: "Security posture",
      title: "Security that reads like a product page.",
      subtitle:
        "This template is optimized for clarity: technical buyers get detail, non-technical buyers get confidence.",
      points: [
        {
          title: "Principle of least privilege",
          body: "Make permissions explicit. Avoid hidden state. Keep components predictable and auditable.",
        },
        {
          title: "Operational readiness",
          body: "Docker-first deployment and a safe indexing toggle for pre-launch environments.",
        },
        {
          title: "SEO-friendly by default",
          body: "Metadata helpers, sitemap, robots, canonical URLs, and localized routes.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Answers that remove buyer friction.",
      items: [
        {
          q: "Is KlyraPay a real product?",
          a: "No—this is a frontend-only landing page project designed as a premium template for a payments / banking startup.",
        },
        {
          q: "Does this include backend or authentication?",
          a: "No. Landing pages stay frontend-only. Later phases will add React portals where state management is appropriate.",
        },
        {
          q: "How do I prevent Google indexing before launch?",
          a: "Set NEXT_PUBLIC_ALLOW_INDEXING=0 to disallow crawlers via robots and output noindex metadata.",
        },
        {
          q: "How do I change language and theme?",
          a: "Language uses locale routes (/en, /de, /es, /fr). Theme toggles instantly (light/dark) and persists locally.",
        },
      ],
    },
    finalCta: {
      title: "Turn your payments story into a brand buyers remember.",
      subtitle:
        "Fork the template, swap the copy and icons, and deploy as a subdomain with Docker.",
      primary: "See Project Details",
    },
  },
  project: {
    title: "Project Details",
    intro:
      "This page stays in the navigation (as the last menu item) so anyone can quickly understand the stack, versions, and how to reuse the project as a template.",
    stack: "Stack",
    ops: "Ops / SEO",
    reuse: "Reuse notes",
    indexingEnabled: "Enabled",
    indexingDisabled: "Disabled (noindex + disallow)",
    notes: [
      'Branding is centralized in "src/lib/site.ts".',
      'SEO is centralized in "src/lib/seo.ts" plus "src/app/robots.ts" and "src/app/sitemap.ts".',
      'Localization is implemented via locale routes and "src/proxy.ts".',
      "Theme toggles are class-based (live) and persist locally.",
    ],
  },
};

export const de: Dictionary = {
  ...en,
  nav: {
    features: "Funktionen",
    rails: "Zahlungswege",
    proof: "Nachweis",
    security: "Sicherheit",
    faq: "FAQ",
    project: "Projekt-Details",
  },
  cta: {
    primary: "Beratung buchen",
    secondary: "Projekt-Details →",
    github: "Quellcode auf GitHub",
  },
  hero: {
    ...en.hero,
    badge: "Zahlungs- & Banking-Infrastruktur",
    titleA: "Skaliere Fintech",
    titleB: "sicher und stabil",
    subtitle:
      "KlyraPay hilft Teams beim Start von Kartenprogrammen, Überweisungen und Instant Settlement – mit erstklassigem Developer-Erlebnis und hoher Sicherheit.",
  },
  sections: {
    ...en.sections,
    finalCta: {
      title: "Mach aus deiner Payment-Story eine Marke, die Käufer erinnern.",
      subtitle:
        "Forke das Template, tausche Texte/Icons und deploye als Subdomain mit Docker.",
      primary: "Projekt-Details ansehen",
    },
  },
  project: {
    ...en.project,
    intro:
      "Diese Seite bleibt bewusst in der Navigation (als letzter Menüpunkt), damit man Stack, Versionen und Wiederverwendung sofort versteht.",
  },
};

export const es: Dictionary = {
  ...en,
  nav: {
    features: "Funciones",
    rails: "Rieles",
    proof: "Prueba",
    security: "Seguridad",
    faq: "FAQ",
    project: "Detalles del proyecto",
  },
  cta: {
    primary: "Reservar consultoría",
    secondary: "Detalles del proyecto →",
    github: "Ver código en GitHub",
  },
  hero: {
    ...en.hero,
    badge: "Infraestructura de pagos y banca",
    titleA: "Escala fintech",
    titleB: "seguro y confiable",
    subtitle:
      "KlyraPay ayuda a equipos modernos a lanzar emisión de tarjetas, transferencias bancarias y liquidación instantánea con una experiencia de desarrollador premium.",
  },
  sections: {
    ...en.sections,
    finalCta: {
      title: "Convierte tu historia de pagos en una marca inolvidable.",
      subtitle:
        "Haz fork del template, cambia textos/íconos y despliega como subdominio con Docker.",
      primary: "Ver detalles del proyecto",
    },
  },
  project: {
    ...en.project,
    intro:
      "Esta página permanece en la navegación (como el último ítem) para que cualquiera entienda el stack, versiones y cómo reutilizar el proyecto.",
  },
};

export const fr: Dictionary = {
  ...en,
  nav: {
    features: "Fonctionnalités",
    rails: "Réseaux",
    proof: "Preuves",
    security: "Sécurité",
    faq: "FAQ",
    project: "Détails du projet",
  },
  cta: {
    primary: "Réserver une consultation",
    secondary: "Détails du projet →",
    github: "Voir le code sur GitHub",
  },
  hero: {
    ...en.hero,
    badge: "Infrastructure paiements & banque",
    titleA: "Passez à l’échelle",
    titleB: "en toute sécurité",
    subtitle:
      "KlyraPay aide les équipes modernes à lancer l’émission de cartes, les virements et le règlement instantané avec une expérience développeur premium.",
  },
  sections: {
    ...en.sections,
    finalCta: {
      title:
        "Transformez votre récit de paiement en une marque que les acheteurs retiennent.",
      subtitle:
        "Forkez le template, remplacez textes/icônes, puis déployez en sous-domaine avec Docker.",
      primary: "Voir les détails du projet",
    },
  },
  project: {
    ...en.project,
    intro:
      "Cette page reste dans la navigation (dernier élément) afin de comprendre rapidement la stack, les versions et la réutilisation du projet.",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  switch (locale) {
    case "de":
      return de;
    case "es":
      return es;
    case "fr":
      return fr;
    case "en":
    default:
      return en;
  }
}
