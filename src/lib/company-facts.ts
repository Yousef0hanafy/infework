// The contact facts shown across the site, in schema data and in public/offline.html.
// Change them here; company-facts.test.ts fails if a page hard-codes its own copy.

type Bi = { en: string; ar: string };

/** The one public number: calls and WhatsApp. */
export const COMPANY_PHONE = {
  e164: "+201044794499",
  display: "+20 104 479 4499",
} as const;

export const COMPANY_PHONE_HREF = `tel:${COMPANY_PHONE.e164}`;
export const COMPANY_WHATSAPP_URL = `https://wa.me/${COMPANY_PHONE.e164.slice(1)}`;

export const WORKING_HOURS: Bi = {
  en: "Sunday – Thursday, 09:00 AM – 04:00 PM (Cairo time)",
  ar: "الأحد – الخميس، 09:00 صباحاً – 04:00 مساءً (بتوقيت القاهرة)",
};

export const WORKING_HOURS_SHORT: Bi = {
  en: "Sun–Thu, 09:00 AM – 04:00 PM",
  ar: "الأحد–الخميس، 09:00 ص – 04:00 م",
};

export const RESPONSE_TIME: Bi = {
  en: "within 24 hours",
  ar: "خلال 24 ساعة",
};
