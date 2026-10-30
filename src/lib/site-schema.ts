export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "@id": "https://www.infeworks.com/#organization",
  name: "Infeworks — International for Engineering Works",
  alternateName: "الشركة الدولية للأعمال الهندسية (إنفيوركس)",
  url: "https://www.infeworks.com",
  logo: "https://www.infeworks.com/logo.png",
  foundingDate: "2006",
  description:
    "Turnkey EPC contractor for water, wastewater, civil infrastructure, and electromechanical engineering in Egypt.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "313 Zahraa Nasr City",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+20224103130",
      contactType: "customer support",
      availableLanguage: ["Arabic", "English"],
    },
  ],
};

export function organizationReference() {
  return { "@id": organizationSchema["@id"] };
}

export function isPublicLocalePath(pathname: string) {
  return /^\/(?:en|ar)(?:\/|$)/.test(pathname);
}

type CaseStudyInput = {
  title: string;
  description: string;
  url: string;
  locale: string;
  image?: string | undefined;
  location?: { display_name: string | null; lat: number; lng: number } | null;
};

// A case-study page describes a project; it is not itself the project organization.
export function caseStudySchema(input: CaseStudyInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    name: input.title,
    description: input.description,
    url: input.url,
    inLanguage: input.locale === "ar" ? "ar-EG" : "en-EG",
    image: input.image,
    publisher: organizationReference(),
    about: {
      "@type": "Project",
      "@id": `${input.url.replace("/ar/work/", "/en/work/")}#project`,
      name: input.title,
      location: input.location
        ? {
            "@type": "Place",
            name: input.location.display_name ?? undefined,
            geo: {
              "@type": "GeoCoordinates",
              latitude: input.location.lat,
              longitude: input.location.lng,
            },
          }
        : undefined,
    },
  };
}
