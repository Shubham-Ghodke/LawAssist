export interface Issue {
  id: string;
  category: "Cybercrime" | "Consumer Rights";
  subcategory: string;
  title: string;
  description: string;
  keywords: string[];
  aliases?: string[];
  emergencyActions: string[];
  preventionTips: string[];
  helpline?: string;
  portalLink?: { label: string; url: string };
  relatedScenarioIds?: string[];
  severity: 'High' | 'Medium' | 'Low';
}

export const issuesData: Issue[] = [
  // CYBERCRIME
  {
    id: "digital_arrest",
    category: "Cybercrime",
    subcategory: "Impersonation",
    title: "Fake Digital Arrest / CBI Scam",
    description: "Fraudsters posing as Police/CBI on a video call, claiming your Aadhaar or parcel is linked to illegal activities and demanding money to avoid 'digital arrest'.",
    keywords: ["digital arrest", "police call", "cbi", "skype", "aadhaar misuse", "customs", "arrest"],
    aliases: [
      "fake police call", "online arrest threat", "cbi video call", "aadhaar block msg", "custom clearance fraud", "parcel block police", "skype arrest",
      "police dhamki", "cbi dhamki", "arrest msg", "aadhaar police",
      "फर्जी पुलिस कॉल", "डिजिटल अरेस्ट", "अरेस्ट वीडियो कॉल"
    ],
    severity: 'High',
    emergencyActions: [
      "DISCONNECT the call immediately. Real police DO NOT arrest via Skype or WhatsApp.",
      "Understand: THERE IS NO CONCEPT OF 'DIGITAL ARREST' IN INDIAN LAW.",
      "Do NOT transfer any money to 'verify' your accounts or as a 'security deposit'.",
      "Call the National Cyber Crime Helpline (1930) to report the numbers and accounts."
    ],
    preventionTips: [
      "Never accept unsolicited video calls from unknown numbers.",
      "Government agencies do not ask for money transfers to clear your name.",
      "Do not share your screen or download any apps they suggest."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["digital_arrest_cbi", "digital_arrest_customs", "digital_arrest_aadhaar"]
  },
  {
    id: "investment_scam",
    category: "Cybercrime",
    subcategory: "Financial Fraud",
    title: "Fake Investment / Trading Scam",
    description: "Lured into WhatsApp or Telegram groups offering stock tips or crypto investments, leading to massive financial loss through fake trading apps.",
    keywords: ["investment", "trading", "stock", "crypto", "whatsapp group", "telegram", "profit"],
    aliases: [
      "trading scam", "fake investment app", "telegram investment fraud", "stock market scam", "money doubled scam", "crypto fraud", "part time job investment",
      "paisa double", "trading fraud", "part time job", "whatsapp group scam",
      "पार्ट टाइम जॉब फ्रॉड", "टेलीग्राम इन्वेस्टमेंट", "पैसा डबल"
    ],
    severity: 'High',
    emergencyActions: [
      "Stop depositing any more money, even if they say it's a 'withdrawal tax' or 'fee'.",
      "Take screenshots of all chats, group members, and bank transfer receipts.",
      "Call 1930 immediately and block the destination bank accounts.",
      "Report the specific fake app or website link on the cybercrime portal."
    ],
    preventionTips: [
      "SEBI-registered brokers do not operate via informal WhatsApp or Telegram groups.",
      "If returns sound too good to be true, it is a scam.",
      "Never download trading apps from unknown APK links; use official app stores."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["invest_whatsapp", "invest_crypto"]
  },
  {
    id: "loan_app",
    category: "Cybercrime",
    subcategory: "Extortion",
    title: "Loan App Harassment",
    description: "Downloaded an instant loan app that stole your contacts and gallery, and is now morphing photos and blackmailing you.",
    keywords: ["loan app", "harassment", "contacts", "morphing", "blackmail", "extortion", "instant loan"],
    aliases: [
      "fake loan app blackmail", "contact hack loan", "morphed photo send to contacts", "loan app threat", "7 days loan scam", "paisa de diya fir bhi call aa raha hai",
      "loan app dhamki", "photo morph", "contact message loan app",
      "लोन ऐप हैरेसमेंट", "फोटो एडिट कर ब्लैकमेल", "7 दिन लोन"
    ],
    severity: 'High',
    emergencyActions: [
      "Do NOT pay them. Paying once will only lead to more blackmail.",
      "Uninstall the fraudulent app immediately and revoke all permissions.",
      "Inform your close contacts that your phone was hacked and to ignore fake messages.",
      "File a complaint at the nearest cyber police station or on the national portal."
    ],
    preventionTips: [
      "Only borrow from RBI-registered NBFCs or banks.",
      "Never grant 'Contacts' or 'Gallery' permissions to unverified loan apps.",
      "Check the app publisher details and reviews before downloading."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["loan_app_scenario", "loan_app_harassment"]
  },
  {
    id: "upi_scam",
    category: "Cybercrime",
    subcategory: "Banking Fraud",
    title: "UPI / Digital Payment Fraud",
    description: "Lost money through a fake UPI payment request, OTP scam, or malicious APK banking app.",
    keywords: ["upi", "money", "fraud", "bank", "scam", "transfer", "otp", "deducted"],
    aliases: [
      "paisa kat gaya", "money gone from bank", "wrong transfer", "upi payment fraud", "account se paise nikal gaye", "otp share hogaya", "fraud payment", "bank balance zero", "money deducted",
      "paytm scam", "phonepe scam", "gpay scam", "galti se paise transfer",
      "पैसा कट गया", "गलती से पैसा ट्रांसफर", "यूपीआई फ्रॉड", "ओटीपी शेयर हो गया"
    ],
    severity: 'High',
    emergencyActions: [
      "Immediately call the National Cyber Crime Helpline (1930).",
      "Contact your bank to block your account/card and dispute the transaction.",
      "Register a formal complaint on the official cybercrime portal.",
      "Take screenshots of the transaction ID and messages."
    ],
    preventionTips: [
      "Never share OTPs or PINs with anyone.",
      "Do not click on unverified payment links.",
      "Verify the receiver's name before entering your UPI PIN."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["upi_urgent_request", "upi_qr_scam", "upi_customer_care"]
  },
  {
    id: "voice_scam",
    category: "Cybercrime",
    subcategory: "Impersonation",
    title: "Fake Bank / KYC Call Scam",
    description: "Received a call claiming your bank account, SIM, or electricity will be blocked unless you update KYC immediately.",
    keywords: ["kyc", "bank call", "electricity", "sim block", "customer support", "update"],
    aliases: [
      "fake bank calls", "kyc update scam", "courier scam calls", "fake customer support", "electricity bill disconnect message", "pan card update call", "sim card block warning",
      "bijli bill msg", "sim band message", "bank kyc call",
      "केवाईसी कॉल", "बिजली बिल मैसेज", "बैंक कस्टमर केयर"
    ],
    severity: 'Medium',
    emergencyActions: [
      "Disconnect the call. Do not follow any instructions to download apps (like AnyDesk/TeamViewer).",
      "Do not share any OTPs received during the call.",
      "Call your bank or service provider using the official number from their website.",
      "Report the fraudulent number on the Chakshu portal (Sanchar Saathi)."
    ],
    preventionTips: [
      "Banks and telecom operators NEVER ask you to download screen-sharing apps.",
      "Do not panic. Official disconnections require formal written notices, not sudden phone calls.",
      "Use caller ID apps to spot frequently reported scam numbers."
    ],
    helpline: "1930",
    portalLink: { label: "Chakshu - Report Suspected Fraud", url: "https://sancharsaathi.gov.in/sfc/" },
    relatedScenarioIds: ["voice_scam_disconnect", "voice_scam_kyc"]
  },
  {
    id: "qr_code_scam",
    category: "Cybercrime",
    subcategory: "Banking Fraud",
    title: "QR Code Scam",
    description: "Asked to scan a QR code on OLX or WhatsApp to receive money, but money was deducted instead.",
    keywords: ["qr code", "scan", "receive money", "olx", "deducted", "fraud", "scam"],
    aliases: [
      "olx scam", "qr code scan", "scan karke paise gaye", "payment receive scam", "code scan kiya", "qr fraud",
      "olx fraud", "qr code receive money",
      "क्यूआर कोड स्कैन", "ओएलएक्स फ्रॉड"
    ],
    severity: 'High',
    emergencyActions: [
      "Contact your bank immediately to block the transaction and your account.",
      "Call the National Cyber Crime Helpline (1930).",
      "Take screenshots of the QR code and chat history with the scammer.",
      "Report the incident on the cybercrime portal."
    ],
    preventionTips: [
      "You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.",
      "Be wary of buyers on platforms like OLX insisting on paying via QR code.",
      "Verify the identity of the person you are transacting with."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["upi_qr_scam", "qr_fake_payment"]
  },
  {
    id: "account_hacked",
    category: "Cybercrime",
    subcategory: "Social Media",
    title: "Social Media Account Hacked",
    description: "If your social media account (Instagram, Facebook, WhatsApp) is compromised or impersonated.",
    keywords: ["instagram", "facebook", "hacked", "social media", "impersonation", "fake profile", "whatsapp", "insta"],
    aliases: [
      "insta haced", "account hack hogaya", "facebook fake profile", "someone using my pics", "whatsapp hack", "my id hacked", "fake id bani hai", "id chori",
      "insta hack", "facebook hack", "fake id",
      "इंस्टाग्राम हैक", "व्हाट्सएप हैक", "फेक प्रोफाइल"
    ],
    severity: 'High',
    emergencyActions: [
      "Use the platform's official account recovery page.",
      "Do NOT pay any ransom if demanded by the hacker.",
      "Warn your contacts not to respond to messages from your account.",
      "Report the impersonation/hack on the cybercrime portal."
    ],
    preventionTips: [
      "Enable Two-Factor Authentication (2FA).",
      "Do not click on suspicious links sent in DMs.",
      "Use strong, unique passwords for every platform."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["hack_insta", "hack_whatsapp"]
  },
  {
    id: "lost_phone",
    category: "Cybercrime",
    subcategory: "Device Security",
    title: "Lost or Stolen Mobile Device",
    description: "If your smartphone is lost or stolen, putting your data and finances at risk.",
    keywords: ["stolen", "lost", "mobile", "phone", "device", "imei"],
    aliases: [
      "phone lost what to do", "mobile chori", "phone chori ho gaya", "lost phone", "find my device", "block imei", "stolen mobile",
      "phone kho gaya", "mobile lost",
      "फोन चोरी हो गया", "मोबाइल खो गया"
    ],
    severity: 'Medium',
    emergencyActions: [
      "Block your SIM card immediately by contacting your telecom provider.",
      "File an FIR at the nearest police station.",
      "Use the CEIR portal to block your device's IMEI number.",
      "Remotely wipe your data using Google Find My Device or Apple Find My."
    ],
    preventionTips: [
      "Always keep a record of your phone's IMEI number (*#06#).",
      "Enable 'Find My Device' on your phone.",
      "Set a strong lock screen PIN/Password."
    ],
    helpline: "14422 (CEIR Helpline)",
    portalLink: { label: "CEIR Device Blocking Portal", url: "https://www.ceir.gov.in" },
    relatedScenarioIds: ["lost_phone_otp", "lost_phone_extortion"]
  },
  {
    id: "sextortion",
    category: "Cybercrime",
    subcategory: "Harassment",
    title: "Sextortion / Blackmail",
    description: "If you are being blackmailed with intimate images or videos by scammers.",
    keywords: ["sextortion", "blackmail", "nude", "video call", "threat", "images", "morphed"],
    aliases: [
      "blackmail kar raha hai", "fake video call", "nude video threat", "morphed photo", "paise mang raha hai blackmail", "dirty video blackmail",
      "nude video call", "video call blackmail",
      "वीडियो कॉल ब्लैकमेल", "गंदी वीडियो ब्लैकमेल"
    ],
    severity: 'High',
    emergencyActions: [
      "Do NOT pay any money to the extortionists; they will only demand more.",
      "Block all communication and do not answer further calls/messages.",
      "Take screenshots of the threats, profiles, and phone numbers.",
      "Report immediately to the Cyber Crime Portal."
    ],
    preventionTips: [
      "Do not accept video calls from unknown numbers.",
      "Maintain strict privacy settings on social media.",
      "Do not share intimate images online."
    ],
    helpline: "1930",
    portalLink: { label: "National Cyber Crime Reporting Portal", url: "https://cybercrime.gov.in" },
    relatedScenarioIds: ["sextortion_video", "sextortion_morph"]
  },
  
  // CONSUMER RIGHTS
  {
    id: "fake_shopping",
    category: "Consumer Rights",
    subcategory: "Online Shopping",
    title: "E-Commerce Fraud / Fake Product",
    description: "Paid for a product but received nothing, a counterfeit product, or got a stone in the package.",
    keywords: ["shopping", "fake", "website", "money back", "refund", "ecommerce", "counterfeit", "stone", "package", "wrong item"],
    aliases: [
      "got stone in parcel", "stoone in parcel", "parcel mein patthar aaya", "fake parcel", "wrong item aya", "empty box", "fake order received", "parcel in stone", "different item delivered", "amazon sent fake shoes", "flipkart wrong item",
      "fake product received", "parcel scam",
      "पार्सल में पत्थर", "गलत सामान आया", "फेक प्रोडक्ट"
    ],
    severity: 'High',
    emergencyActions: [
      "Record an unboxing video if you suspect the package.",
      "Contact the e-commerce platform's support immediately.",
      "Contact your bank to initiate a chargeback for the transaction.",
      "File a grievance on the National Consumer Helpline portal."
    ],
    preventionTips: [
      "Buy only from trusted, verified sellers and platforms.",
      "Read seller reviews and ratings before purchasing.",
      "Always take an unboxing video for expensive items."
    ],
    helpline: "1915 (National Consumer Helpline)",
    portalLink: { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in" },
    relatedScenarioIds: ["fake_product_stone", "fake_product_empty", "fake_product_different"]
  },
  {
    id: "banking_fraud",
    category: "Consumer Rights",
    subcategory: "Banking Services",
    title: "Banking Service Fraud / Dispute",
    description: "ATM cash not dispensed but deducted, hidden bank charges, or unauthorized credit card transactions.",
    keywords: ["atm", "unauthorized", "credit card", "hidden charges", "bank dispute", "deducted"],
    aliases: [
      "unauthorized transaction", "atm cash not received", "hidden charges", "card fraud", "atm paise nahi nikle", "credit card extra charge",
      "atm deduction", "paisa kat gaya atm",
      "एटीएम पैसा नहीं निकला", "क्रेडिट कार्ड फ्रॉड"
    ],
    severity: 'High',
    emergencyActions: [
      "Immediately report unauthorized transactions to your bank to limit liability.",
      "For failed ATM transactions, file a complaint with the card-issuing bank within 30 days.",
      "If the bank rejects your claim unjustly, file a complaint with the Banking Ombudsman (RBI)."
    ],
    preventionTips: [
      "Check your bank statements regularly for hidden fees.",
      "Never share your credit card CVV or PIN.",
      "Set transaction limits on your debit/credit cards via your banking app."
    ],
    helpline: "14440 (RBI Ombudsman)",
    portalLink: { label: "RBI Ombudsman Portal", url: "https://cms.rbi.org.in" },
    relatedScenarioIds: ["bank_atm_fail", "bank_card_swipe"]
  },
  {
    id: "telecom_issue",
    category: "Consumer Rights",
    subcategory: "Telecom",
    title: "Telecom / Network Complaints",
    description: "Persistent call drops, wrong billing, or recharge issues without resolution from the provider.",
    keywords: ["telecom", "network", "call drop", "bill", "recharge", "airtel", "jio", "vi"],
    aliases: [
      "call drops", "network issues", "wrong bill", "recharge issue", "recharge failed paise cut gaye", "sim not working poor network",
      "recharge fail", "sim bandh",
      "नेटवर्क प्रॉब्लम", "रिचार्ज फेल", "कॉल ड्रॉप"
    ],
    severity: 'Low',
    emergencyActions: [
      "Lodge a formal complaint with the telecom operator's appellate authority.",
      "Keep records of complaint numbers and emails.",
      "If unresolved within 30 days, file a grievance on the PGPORTAL or NCH."
    ],
    preventionTips: [
      "Read post-paid billing plans carefully to avoid hidden data charges.",
      "Use official apps for recharges to avoid third-party failures."
    ],
    helpline: "1915 (National Consumer Helpline)",
    portalLink: { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in" },
    relatedScenarioIds: ["telecom_sim_block", "telecom_bill_shock"]
  },
  {
    id: "real_estate",
    category: "Consumer Rights",
    subcategory: "Housing",
    title: "Real Estate / Builder Fraud",
    description: "Delayed flat possession, fake amenities promised, or builder absconding with funds.",
    keywords: ["builder", "real estate", "flat", "possession", "rera", "property", "delay"],
    aliases: [
      "delayed possession", "fake promises", "builder fraud", "flat nahi mila", "builder bhag gaya", "property scam",
      "rera complain", "flat possession",
      "बिल्डर फ्रॉड", "फ्लैट नहीं मिला", "रेरा शिकायत"
    ],
    severity: 'High',
    emergencyActions: [
      "Gather all payment receipts, builder agreements, and brochures.",
      "File a formal complaint with your state's Real Estate Regulatory Authority (RERA).",
      "Form an association with other affected buyers for stronger legal standing.",
      "Lodge a case in the Consumer Court for deficiency of service."
    ],
    preventionTips: [
      "Only invest in RERA-registered projects and check the RERA website for project status.",
      "Never pay large sums in cash.",
      "Have a lawyer review the builder-buyer agreement before signing."
    ],
    portalLink: { label: "RERA Portals (State-wise)", url: "https://mohua.gov.in/cms/rera.php" },
    relatedScenarioIds: ["real_estate_delay", "real_estate_amenities"]
  },
  {
    id: "healthcare",
    category: "Consumer Rights",
    subcategory: "Healthcare",
    title: "Healthcare & Insurance Claims",
    description: "Unfairly rejected health insurance claims or hidden/excessive hospital charges.",
    keywords: ["insurance", "hospital", "health", "claim rejected", "mediclaim", "tpa", "bill"],
    aliases: [
      "rejected claim", "hidden hospital charges", "insurance delay", "mediclaim pass nahi ho raha", "hospital overcharging", "cashless mediclaim denied",
      "insurance reject", "mediclaim reject",
      "इंश्योरेंस रिजेक्ट", "मेडिक्लेम पास नहीं", "अस्पताल बिल"
    ],
    severity: 'Medium',
    emergencyActions: [
      "Request a written, detailed denial letter from the TPA/Insurance company.",
      "Escalate the grievance to the insurance company's Grievance Redressal Officer.",
      "If unresolved within 15 days, file a complaint with the Insurance Ombudsman.",
      "File a complaint on the National Consumer Helpline for hospital overcharging."
    ],
    preventionTips: [
      "Read the exclusions and waiting periods in your insurance policy document.",
      "Disclose all pre-existing medical conditions truthfully when buying insurance.",
      "Ask hospitals for an itemized bill before payment."
    ],
    helpline: "155255 (IRDAI Grievance)",
    portalLink: { label: "Bima Bharosa (IRDAI)", url: "https://bimabharosa.irdai.gov.in" },
    relatedScenarioIds: ["health_claim_denied", "health_hidden_charge"]
  },
  {
    id: "refund_denied",
    category: "Consumer Rights",
    subcategory: "Online Shopping",
    title: "Refund Denied Unfairly",
    description: "If an e-commerce platform or seller refuses to refund your money for a valid return or canceled order.",
    keywords: ["refund", "denied", "return", "canceled order", "ecommerce", "seller refused", "money not returned"],
    aliases: [
      "refund nahi aaya", "flipkart refund not coming", "money not returning", "return reject kar diya", "amazon refund late", "paisa wapas nahi aaya", "order cancel no refund",
      "refund issue", "return denied",
      "रिफंड नहीं आया", "पैसा वापस नहीं मिला"
    ],
    severity: 'Low',
    emergencyActions: [
      "Keep all email and chat transcripts with the seller/platform.",
      "Send a formal email threatening to escalate to consumer court.",
      "File a chargeback request with your credit card company or bank.",
      "Lodge a complaint on the National Consumer Helpline."
    ],
    preventionTips: [
      "Always read the return/refund policy before making a purchase.",
      "Prefer platforms with clearly stated, customer-friendly return policies.",
      "Keep proof of dispatch when returning an item."
    ],
    helpline: "1915 (National Consumer Helpline)",
    portalLink: { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in" },
    relatedScenarioIds: ["refund_policy_trap", "refund_delay_scam"]
  }
];
