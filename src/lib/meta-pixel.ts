type MetaPixelWindow = Window & {
  fbq?: (command: "track", event: "Contact" | "Lead", data?: { channel: string }) => void;
};

function trackMetaEvent(event: "Contact" | "Lead", data?: { channel: string }) {
  if (typeof window === "undefined") return;

  try {
    (window as MetaPixelWindow).fbq?.("track", event, data);
  } catch {
    // A tracking failure must not interrupt contact or form submission.
  }
}

export function trackMetaContact(channel: "whatsapp" | "email") {
  trackMetaEvent("Contact", { channel });
}

export function trackMetaLead() {
  trackMetaEvent("Lead");
}
