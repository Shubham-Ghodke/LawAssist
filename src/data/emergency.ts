export interface EmergencyDataType {
  id: string;
  title: string;
  actions: string[];
  helpline?: string;
  portalLink?: {
    label: string;
    url: string;
  };
}

export const emergencyData: EmergencyDataType[] = [
  {
    id: "upi-fraud",
    title: "UPI / Banking Fraud",
    actions: [
      "Call the Cybercrime Helpline (1930) immediately.",
      "Contact your bank and temporarily freeze the affected account.",
      "Save screenshots, transaction IDs, and suspicious messages.",
      "Report the fraud on the official cybercrime portal."
    ],
    helpline: "1930",
    portalLink: {
      label: "Cybercrime Portal",
      url: "https://cybercrime.gov.in"
    }
  },

  {
    id: "instagram-hacked",
    title: "Instagram Account Hacked",
    actions: [
      "Change your password immediately if access is still available.",
      "Enable two-factor authentication.",
      "Report the hacked account through Instagram support.",
      "Check linked email accounts and remove suspicious devices."
    ],
    helpline: "1930",
    portalLink: {
      label: "Instagram Help Center",
      url: "https://help.instagram.com"
    }
  },

  {
    id: "lost-phone",
    title: "Lost or Stolen Phone",
    actions: [
      "Block your SIM card immediately.",
      "Log out from banking and payment applications remotely.",
      "Track your device using Find My Device or iCloud.",
      "File a police complaint if the device contains sensitive information."
    ],
    helpline: "1930",
    portalLink: {
      label: "CEIR Portal",
      url: "https://www.ceir.gov.in"
    }
  },

  {
    id: "fake-product",
    title: "Fake Product Delivered",
    actions: [
      "Take photos and videos of the received package immediately.",
      "Contact the shopping platform and request a refund or replacement.",
      "Keep invoice, payment proof, and packaging safely.",
      "File a complaint through the consumer grievance portal if unresolved."
    ],
    helpline: "1915",
    portalLink: {
      label: "Consumer Helpline",
      url: "https://consumerhelpline.gov.in"
    }
  },

  {
    id: "refund-denied",
    title: "Refund Denied by Seller",
    actions: [
      "Review the platform refund policy carefully.",
      "Contact seller support with order and payment details.",
      "Save all chats, emails, and invoices as evidence.",
      "Escalate the complaint through consumer grievance platforms."
    ],
    helpline: "1915",
    portalLink: {
      label: "Consumer Portal",
      url: "https://consumerhelpline.gov.in"
    }
  },

  {
    id: "otp-scam",
    title: "OTP Scam",
    actions: [
      "Never share OTP or banking PIN with anyone.",
      "Immediately contact your bank if OTP was shared.",
      "Monitor your account for suspicious activity.",
      "Report the incident through official cybercrime channels."
    ],
    helpline: "1930",
    portalLink: {
      label: "Cybercrime Portal",
      url: "https://cybercrime.gov.in"
    }
  }
];