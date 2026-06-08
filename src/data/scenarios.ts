export interface ScenarioStep {
  id: string;
  type: 'info' | 'decision' | 'result';
  title: string;
  content: string;
  options?: { label: string; nextStepId: string; isCorrect?: boolean }[];
  emergencyId?: string;
}

export interface Scenario {
  id: string;
  category: string;
  title: string;
  duration: string;
  type: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  steps: Record<string, ScenarioStep>;
}

export const scenariosData: Scenario[] = [
  // --- DIGITAL ARREST VARIATIONS ---
  {
    id: "digital_arrest_cbi", category: "Cybercrime", title: "The CBI Video Call", duration: "4 min", type: "Impersonation", severity: "High", description: "You receive a Skype video call from someone claiming to be a CBI officer threatening you with 'digital arrest'.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You get an automated call saying a parcel in your name was seized. The call is transferred to 'CBI', and they ask you to join a Skype video call.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What is your immediate next step?", content: "The 'officer' warns you not to disconnect or tell your family. He asks you to transfer your bank balance to an 'RBI secure account'.", options: [ { label: "Transfer the money to prove your innocence.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Disconnect the call immediately and call 1930.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Incorrect Action", content: "You have fallen for the 'Digital Arrest' scam. Indian law has NO concept of digital arrest.", emergencyId: "digital_arrest" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "You avoided a major scam! Real police do not interrogate or arrest via Skype.", emergencyId: "digital_arrest" }
    }
  },
  {
    id: "digital_arrest_customs", category: "Cybercrime", title: "The Customs Parcel Trap", duration: "3 min", type: "Impersonation", severity: "Medium", description: "An automated call claims FedEx or Customs has blocked your parcel.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You receive an IVR call saying 'This is FedEx. A parcel sent from your name to Taiwan has been intercepted. Press 1 to speak to Customs.'", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "You haven't sent any parcel to Taiwan.", options: [ { label: "Press 1 to clarify it wasn't you.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Cut the call and ignore.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "You're Being Reeled In", content: "By pressing 1, you are connected to a scammer who will now use fear tactics.", emergencyId: "digital_arrest" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Good job. Official couriers do not use automated IVR calls to threaten you.", emergencyId: "digital_arrest" }
    }
  },
  {
    id: "digital_arrest_aadhaar", category: "Cybercrime", title: "The Aadhaar Threat", duration: "3 min", type: "Identity Fraud", severity: "High", description: "A caller claims your Aadhaar is linked to money laundering.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A caller identifies themselves as an official from the 'Telecom Department'. They claim 5 illegal SIM cards were purchased using your Aadhaar.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They ask for your Aadhaar OTP to 'verify and block' the SIMs.", content: "They threaten police action if you don't cooperate.", options: [ { label: "Give the OTP to block the illegal SIMs.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Hang up and check the TAFCOP portal.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Identity Compromised", content: "You just gave them access to your Aadhaar authentication. Never share an OTP.", emergencyId: "digital_arrest" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Government officials will never ask for an OTP over the phone.", emergencyId: "digital_arrest" }
    }
  },

  // --- UPI SCAM VARIATIONS ---
  {
    id: "upi_urgent_request", category: "Cybercrime", title: "The Urgent Request", duration: "2 min", type: "Financial Fraud", severity: "High", description: "A friend urgently requests money via WhatsApp from an unknown number.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You receive a WhatsApp message from an unknown number. The profile picture is your close friend, asking for ₹10,000 urgently.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "The person is pressuring you.", options: [ { label: "Send the money immediately.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Call your friend on their original number.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Incorrect Action", content: "Fraudsters use stolen profile pictures to impersonate contacts.", emergencyId: "upi_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Always verify urgent requests by calling the person's known number.", emergencyId: "upi_scam" }
    }
  },
  {
    id: "upi_qr_scam", category: "Cybercrime", title: "The OLX QR Code Trap", duration: "3 min", type: "Financial Fraud", severity: "High", description: "A buyer insists on sending you money via a QR code.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "An OLX buyer agrees to your price but insists on paying via a QR code they just sent you on WhatsApp.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They ask you to scan it.", content: "The message says 'Scan to Receive ₹5,000'.", options: [ { label: "Scan it using GPay.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Refuse. Tell them to send via phone number.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Money Deducted!", content: "Scanning a QR code is ONLY for SENDING money. You never scan to receive money.", emergencyId: "qr_code_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "You spotted the scam. UPI PIN is NEVER required to receive money.", emergencyId: "qr_code_scam" }
    }
  },
  {
    id: "upi_customer_care", category: "Cybercrime", title: "The Fake Helpline", duration: "3 min", type: "Impersonation", severity: "Medium", description: "You call a customer care number found on Google.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You search 'Swiggy Customer Care' on Google. The executive asks you to download 'AnyDesk' to process a refund.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "They claim it's standard RBI protocol.", options: [ { label: "Download the app.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Cut the call.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Total Compromise", content: "AnyDesk is a screen-sharing app. The scammer can now see your banking PINs.", emergencyId: "upi_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Always use the official app's help section, never Google Search numbers.", emergencyId: "upi_scam" }
    }
  },

  // --- ONLINE SHOPPING VARIATIONS ---
  {
    id: "fake_product_stone", category: "Consumer Rights", title: "Stone in the Parcel", duration: "3 min", type: "Online Shopping", severity: "High", description: "You ordered an iPhone but received a stone.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You open your newly delivered smartphone box and find a brick inside.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Immediate next step?", content: "You are in shock.", options: [ { label: "Complain on Twitter.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Record video of box/labels and contact support.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Not Enough Evidence", content: "Without an unboxing video, platforms may reject your claim.", emergencyId: "fake_shopping" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Evidence is crucial. Always take photos of tampered seals and labels.", emergencyId: "fake_shopping" }
    }
  },
  {
    id: "fake_product_empty", category: "Consumer Rights", title: "The Empty Envelope", duration: "2 min", type: "Online Shopping", severity: "Medium", description: "You paid for clothes but received paper.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You bought dresses from an Instagram store. A courier arrives with a flat envelope containing blank paper.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Why did they do this?", content: "The Instagram page blocked you.", options: [ { label: "Courier mistake.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "To generate a valid 'Delivered' tracking receipt.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "It's a Scam", content: "This is 'Empty Tracking Fraud'.", emergencyId: "fake_shopping" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct!", content: "Scammers use the tracking proof to deny your bank chargeback.", emergencyId: "fake_shopping" }
    }
  },
  {
    id: "fake_product_different", category: "Consumer Rights", title: "The Bait and Switch", duration: "2 min", type: "Online Shopping", severity: "Low", description: "You ordered a branded jacket but received a knockoff.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You pay Cash on Delivery for Nike shoes but receive unbranded plastic shoes.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Who do you hold responsible?", content: "The website disappeared.", options: [ { label: "The delivery boy.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "The logistics company handling the COD.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Misplaced Blame", content: "The delivery boy doesn't know what's inside and can't refund you directly.", emergencyId: "fake_shopping" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Contact the courier's grievance officer to freeze the COD remittance.", emergencyId: "fake_shopping" }
    }
  },

  // --- LOAN APP SCENARIO ---
  {
    id: "loan_app_scenario", category: "Cybercrime", title: "The Instant Loan Threat", duration: "3 min", type: "Extortion", severity: "High", description: "An instant loan app starts blackmailing you.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You repaid an instant loan, but they demand ₹50,000 more and threaten to send morphed photos to your contacts.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "How do you handle it?", content: "They start a 10-minute timer.", options: [ { label: "Pay the ₹50,000.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Do NOT pay. Uninstall and warn contacts.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "The Trap Closes", content: "Extortionists never stop. They will demand more tomorrow.", emergencyId: "loan_app" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Never pay. Warning your contacts pre-emptively removes their leverage.", emergencyId: "loan_app" }
    }
  },

  // --- NEW VARIATIONS (ADDED TO FULFILL ALL ISSUES) ---
  {
    id: "voice_scam_disconnect", category: "Cybercrime", title: "Electricity Bill Threat", duration: "2 min", type: "Impersonation", severity: "Medium", description: "A message threatens to cut your power tonight.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You get an SMS: 'Dear consumer, your power will be disconnected at 9:30 PM. Call this number to update bills.'", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "It's 8:00 PM and you are panicked.", options: [ { label: "Call the number.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Check your official electricity app.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Scam Initiated", content: "Calling connects you to a scammer who will ask you to download a screen-sharing app to 'pay a ₹10 fee'.", emergencyId: "voice_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Electricity boards do not send threatening personal SMS messages from 10-digit mobile numbers.", emergencyId: "voice_scam" }
    }
  },
  {
    id: "voice_scam_kyc", category: "Cybercrime", title: "The Pan Card KYC Update", duration: "2 min", type: "Impersonation", severity: "Medium", description: "A caller claims your bank account will be frozen without a PAN update.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A caller says your HDFC account needs an urgent PAN link via a link sent to your SMS.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Do you click the link?", content: "The link looks like 'hdfc-kyc-update.com'.", options: [ { label: "Click and update PAN.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Ignore the SMS.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Phishing Trap", content: "The link is fake. Entering details gives hackers access to your banking.", emergencyId: "voice_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Banks never ask you to update KYC via random SMS links.", emergencyId: "voice_scam" }
    }
  },
  {
    id: "hack_insta", category: "Cybercrime", title: "Instagram Investment Scam", duration: "2 min", type: "Social Media", severity: "Medium", description: "Your friend posts about huge crypto profits.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "Your friend's Instagram posts a story: 'I just made $5000 in 2 hours! DM me to learn how.'", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "You DM them and they ask for a $100 deposit.", options: [ { label: "Send the money.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Call your friend via phone.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Account Hacked", content: "Your friend's account was hacked. You just paid a scammer.", emergencyId: "account_hacked" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Calling confirms their account was compromised. Good job.", emergencyId: "account_hacked" }
    }
  },
  {
    id: "hack_whatsapp", category: "Cybercrime", title: "The WhatsApp Verification Code", duration: "2 min", type: "Social Media", severity: "High", description: "Someone asks you to forward a 6-digit code.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A friend messages: 'Hey, I accidentally sent my login code to your number. Can you send it back?'", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Do you forward the SMS code you just received?", content: "The SMS says 'WhatsApp Registration Code'.", options: [ { label: "Yes, help them out.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "No, never share codes.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "WhatsApp Hacked", content: "That was YOUR login code. The scammer just hijacked your WhatsApp account.", emergencyId: "account_hacked" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Never forward 6-digit codes to anyone, even known contacts.", emergencyId: "account_hacked" }
    }
  },
  {
    id: "lost_phone_otp", category: "Cybercrime", title: "Stolen Phone OTP Risk", duration: "2 min", type: "Device Security", severity: "High", description: "Your phone is stolen while unlocked.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A thief snatched your phone from your hand while it was unlocked and you were reading an article.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What is your FIRST priority?", content: "The thief has access to everything.", options: [ { label: "File a police FIR.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Block your SIM and bank apps.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Too Slow", content: "By the time the FIR is filed, the thief will reset your UPI pin using OTPs and drain your accounts.", emergencyId: "lost_phone" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Blocking the SIM stops OTPs. This must happen within minutes.", emergencyId: "lost_phone" }
    }
  },
  {
    id: "lost_phone_extortion", category: "Cybercrime", title: "The 'Find My iPhone' Phishing", duration: "2 min", type: "Device Security", severity: "Medium", description: "Thieves try to get your iCloud password.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "Days after your iPhone is stolen, you receive an SMS: 'Your lost iPhone was found. Click here to view location: apple-support-find.com'", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Do you click and log in?", content: "You really want your phone back.", options: [ { label: "Yes, log in to check.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Ignore the SMS.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Device Unlocked", content: "It was a phishing link. You just gave the thieves your iCloud password, allowing them to wipe and sell the phone.", emergencyId: "lost_phone" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Thieves send fake Apple/Google links to get your password. Never click them.", emergencyId: "lost_phone" }
    }
  },
  {
    id: "sextortion_video", category: "Cybercrime", title: "The Unknown Video Call", duration: "2 min", type: "Harassment", severity: "High", description: "You answer a WhatsApp video call from a stranger.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You answer a video call from an unknown number. The screen shows an explicit video, and they record your face reacting to it.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They threaten to post the recording to YouTube unless you pay ₹20,000.", content: "What do you do?", options: [ { label: "Pay the money out of fear.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Block, ignore, and report.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Endless Extortion", content: "Paying marks you as a lucrative target. They will demand more money tomorrow.", emergencyId: "sextortion" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Scammers mass-call people. If you block them and refuse to pay, they usually move on to the next victim.", emergencyId: "sextortion" }
    }
  },
  {
    id: "sextortion_morph", category: "Cybercrime", title: "Morphed Photo Threat", duration: "2 min", type: "Harassment", severity: "High", description: "Someone morphs your public Facebook photos.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A scammer takes your public Facebook profile picture, morphs it onto an explicit image, and sends it to your Messenger.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They demand Amazon Gift Cards to delete it.", content: "What do you do?", options: [ { label: "Buy the gift cards.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Lock your profile and report to 1930.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "You Paid a Scammer", content: "They will just morph another photo. You cannot buy your way out of extortion.", emergencyId: "sextortion" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Locking down your privacy settings and reporting to cybercrime is the only way to handle morphing threats.", emergencyId: "sextortion" }
    }
  },
  {
    id: "bank_atm_fail", category: "Consumer Rights", title: "ATM Cash Not Dispensed", duration: "2 min", type: "Banking", severity: "Medium", description: "The ATM doesn't give cash but your account is debited.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You try to withdraw ₹10,000. The machine makes a noise, gives an error, but you get an SMS saying money was deducted.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "When do you complain?", content: "The bank branch is currently closed.", options: [ { label: "Wait a week to see if it reverses.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Call customer care and raise a dispute immediately.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Too Late", content: "Banks have a strict time window (usually 30 days) for ATM disputes. Waiting risks your money.", emergencyId: "banking_fraud" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Always log a complaint immediately. If the bank doesn't resolve it in 30 days, you can approach the RBI Ombudsman.", emergencyId: "banking_fraud" }
    }
  },
  {
    id: "bank_card_swipe", category: "Cybercrime", title: "Unauthorized Credit Card Swipe", duration: "2 min", type: "Banking", severity: "High", description: "Your card is swiped for a large amount in another country.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You wake up to an SMS: 'USD 500 spent on your Credit Card in London.' Your card is physically with you.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What must you do to ensure zero liability?", content: "You must act fast.", options: [ { label: "Report it to the bank within 3 days.", nextStepId: "result_correct_1", isCorrect: true }, { label: "Cancel the card via the app and forget it.", nextStepId: "result_wrong_1", isCorrect: false } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "You Still Owe Money", content: "Canceling the card doesn't reverse the charge. You must officially report the fraud.", emergencyId: "banking_fraud" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Under RBI rules, if you report unauthorized electronic transactions within 3 working days, your liability is ZERO.", emergencyId: "banking_fraud" }
    }
  },
  {
    id: "telecom_sim_block", category: "Consumer Rights", title: "Unfair SIM Deactivation", duration: "2 min", type: "Telecom", severity: "Low", description: "Your primary number is suddenly deactivated.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "Your Jio SIM suddenly stops working. Customer care says it was deactivated due to non-usage, but you recharged it last month.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Where do you escalate?", content: "The store executive refuses to help.", options: [ { label: "File a police FIR.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Email the Nodal Appellate Authority.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Wrong Venue", content: "Police don't handle telecom billing disputes.", emergencyId: "telecom_issue" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Telecom operators have a structured grievance process ending with the Appellate Authority. Use it.", emergencyId: "telecom_issue" }
    }
  },
  {
    id: "telecom_bill_shock", category: "Consumer Rights", title: "Postpaid Bill Shock", duration: "2 min", type: "Telecom", severity: "Medium", description: "You receive a bill for ₹15,000 due to roaming.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You get your Airtel postpaid bill. It's ₹15,000 because 'International Roaming' was activated without your consent.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Do you have to pay?", content: "The company threatens to ruin your CIBIL score.", options: [ { label: "Pay it to protect your credit score.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Dispute it via PGPORTAL or Consumer Helpline.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Lost Money", content: "If you didn't opt-in, it's an unfair trade practice. Paying it means you accept the charge.", emergencyId: "telecom_issue" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Companies cannot activate premium services without explicit consent. Dispute it officially.", emergencyId: "telecom_issue" }
    }
  },
  {
    id: "real_estate_delay", category: "Consumer Rights", title: "Builder Possession Delay", duration: "2 min", type: "Housing", severity: "High", description: "The builder is 3 years late on delivering your flat.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You paid 80% for an under-construction flat. The handover date passed 3 years ago, and construction has stopped.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What is your best legal remedy?", content: "You are paying both rent and EMI.", options: [ { label: "Stop paying your bank EMI.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "File a case in RERA.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Financial Ruin", content: "Stopping EMI hurts YOUR credit score, not the builder. The bank will seize your assets.", emergencyId: "real_estate" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "RERA tribunals are specifically set up to force builders to pay delay penalties or refund buyers.", emergencyId: "real_estate" }
    }
  },
  {
    id: "real_estate_amenities", category: "Consumer Rights", title: "Fake Amenities Promised", duration: "2 min", type: "Housing", severity: "Medium", description: "The brochure showed a pool, but there is none.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You move into your new flat. The builder's brochure promised a swimming pool and gym, but the space was sold as parking instead.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Can you take action?", content: "The builder says the brochure was 'indicative'.", options: [ { label: "Yes, it's an unfair trade practice.", nextStepId: "result_correct_1", isCorrect: true }, { label: "No, brochures aren't legally binding.", nextStepId: "result_wrong_1", isCorrect: false } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Incorrect", content: "Consumer courts have repeatedly ruled that brochures and advertisements are binding promises.", emergencyId: "real_estate" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "File a joint complaint with other residents in the Consumer Court for compensation.", emergencyId: "real_estate" }
    }
  },
  {
    id: "health_claim_denied", category: "Consumer Rights", title: "Cashless Claim Denied", duration: "2 min", type: "Healthcare", severity: "High", description: "Your health insurance refuses to pay during an emergency.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "Your father is hospitalized. You present your valid health insurance card, but the TPA rejects the cashless claim citing 'unjustified hospitalization'.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What do you do?", content: "The hospital is demanding a ₹2 Lakh deposit.", options: [ { label: "Argue with the hospital staff.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Pay, collect all bills, and file for reimbursement.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Waste of Time", content: "The hospital cannot control the TPA's decision. Arguing delays medical care.", emergencyId: "healthcare" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Pay for the treatment, ensure you get detailed medical justifications from the doctor, and file for reimbursement. If denied again, approach the Insurance Ombudsman.", emergencyId: "healthcare" }
    }
  },
  {
    id: "health_hidden_charge", category: "Consumer Rights", title: "Hospital Overcharging", duration: "2 min", type: "Healthcare", severity: "Medium", description: "You are billed ₹50,000 for 'miscellaneous medical supplies'.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "Upon discharge, the hospital gives you a final bill. You notice ₹50,000 lumped under 'admin charges and miscellaneous supplies'.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "How do you handle the bill?", content: "They won't let you leave without paying.", options: [ { label: "Demand an itemized bill before paying.", nextStepId: "result_correct_1", isCorrect: true }, { label: "Pay it and forget it.", nextStepId: "result_wrong_1", isCorrect: false } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Lost Money", content: "Hospitals often inflate generic charges. You should always demand transparency.", emergencyId: "healthcare" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "You have a legal right to an itemized bill. Threatening to file a complaint on the Consumer Helpline often gets these padded charges removed.", emergencyId: "healthcare" }
    }
  },
  {
    id: "refund_policy_trap", category: "Consumer Rights", title: "The 'No Refunds' Policy", duration: "2 min", type: "Online Shopping", severity: "Low", description: "A gym refuses to refund you for unused months.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You paid for a 1-year gym membership but had to relocate after 1 month. The gym refuses to refund the remaining 11 months, pointing to a 'No Refunds' sign.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Is their 'No Refunds' sign legally valid?", content: "They made you sign a contract saying the same.", options: [ { label: "Yes, you signed a contract.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "No, one-sided contracts are illegal.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Incorrect", content: "Consumer Protection laws override unfair business contracts.", emergencyId: "refund_denied" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Courts view non-refundable clauses for unrendered services as 'Unfair Trade Practices'. You can file a grievance to get a pro-rata refund.", emergencyId: "refund_denied" }
    }
  },
  {
    id: "refund_delay_scam", category: "Consumer Rights", title: "The 7-14 Business Days Loop", duration: "2 min", type: "Online Shopping", severity: "Low", description: "An airline keeps delaying your refund.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "An airline canceled your flight. They promised a refund in '7-14 business days'. It has been 45 days, and customer care just keeps repeating the same script.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "What is your best move?", content: "You paid via Credit Card.", options: [ { label: "Keep calling them every day.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Initiate a chargeback with your credit card company.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Wasted Time", content: "Customer care agents have no power to release funds stuck in accounting loops.", emergencyId: "refund_denied" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "A 'Services Not Rendered' chargeback dispute through your bank forces the merchant to prove they provided the service, bypassing their customer care entirely.", emergencyId: "refund_denied" }
    }
  },
  {
    id: "invest_whatsapp", category: "Cybercrime", title: "WhatsApp Stock Tips", duration: "2 min", type: "Financial Fraud", severity: "High", description: "You are added to a WhatsApp group promising 300% returns on stocks.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "A random number adds you to a 'VIP Stock Traders' group. Everyone is posting screenshots of huge profits.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "The admin asks you to download their 'custom trading app' to get started.", content: "What do you do?", options: [ { label: "Download the app and deposit ₹1000.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Leave the group and block the admin.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "It's a Fake Dashboard", content: "The app is fake. The numbers will go up, but you will never be able to withdraw your money.", emergencyId: "investment_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "SEBI-registered brokers do not operate via WhatsApp groups or custom APKs. It's a classic scam.", emergencyId: "investment_scam" }
    }
  },
  {
    id: "invest_crypto", category: "Cybercrime", title: "The Crypto Romance", duration: "2 min", type: "Financial Fraud", severity: "High", description: "Someone you met on a dating app suggests a crypto investment.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You matched with someone attractive on Tinder. After 2 weeks of chatting, they say they made a fortune in crypto and want to teach you.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They send you a link to a 'secret trading platform'.", content: "They promise it's risk-free.", options: [ { label: "Transfer a small amount to try.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Refuse and report their profile.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Pig Butchering Scam", content: "They 'fatten' you up with fake profits on a fake site, then steal everything. This is a global scam.", emergencyId: "investment_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Never take financial advice from strangers on dating apps or social media.", emergencyId: "investment_scam" }
    }
  },
  {
    id: "loan_app_harassment", category: "Cybercrime", title: "7-Day Loan Contact Abuse", duration: "2 min", type: "Extortion", severity: "High", description: "A loan app creates a WhatsApp group with your family members.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You missed the 7-day deadline for an instant loan. The app automatically creates a WhatsApp group named 'Defaulter' and adds your parents and boss.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "They send abusive messages to the group.", content: "What do you do?", options: [ { label: "Beg them in the group and promise to pay.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Post a message saying your phone was hacked, then exit.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Public Humiliation", content: "Begging shows weakness. They will demand 3x the loan amount to stop the harassment.", emergencyId: "loan_app" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Damage control is key. Informing contacts it's a hack removes their leverage, then report to cyber police.", emergencyId: "loan_app" }
    }
  },
  {
    id: "qr_fake_payment", category: "Cybercrime", title: "The Spoofed Audio Box", duration: "2 min", type: "Financial Fraud", severity: "High", description: "A customer shows you a fake payment success screen.",
    steps: {
      "intro": { id: "intro", type: "info", title: "The Situation", content: "You run a small shop. A customer buys goods worth ₹500, scans your QR code, and shows you a screen saying 'Payment Successful'.", options: [{ label: "Continue", nextStepId: "decision_1" }] },
      "decision_1": { id: "decision_1", type: "decision", title: "Your payment soundbox didn't announce the payment.", content: "The customer is in a hurry.", options: [ { label: "Let them go, the screen looked real.", nextStepId: "result_wrong_1", isCorrect: false }, { label: "Make them wait until you receive an SMS or soundbox alert.", nextStepId: "result_correct_1", isCorrect: true } ] },
      "result_wrong_1": { id: "result_wrong_1", type: "result", title: "Spoofed Screen", content: "There are fake apps that generate exact replicas of Paytm/GPay success screens. You lost your money.", emergencyId: "qr_code_scam" },
      "result_correct_1": { id: "result_correct_1", type: "result", title: "Correct Action!", content: "Never trust a screenshot or the customer's phone. Only trust your own bank SMS or payment audio box.", emergencyId: "qr_code_scam" }
    }
  }
];
