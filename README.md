# ⚖️ LawAssist

LawAssist is a modern, privacy-first **Progressive Web Application (PWA)** designed to provide users with immediate, step-by-step guidance during cybercrime and consumer rights emergencies. 

By combining interactive educational scenarios, localized multi-language support, and a completely offline-capable architecture, LawAssist acts as a reliable first-responder guide in the palm of your hand.

![LawAssist](https://img.shields.io/badge/Status-Active-success)
![PWA](https://img.shields.io/badge/Progressive_Web_App-Optimized-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## 🚀 Key Features

* **📱 Progressive Web App (PWA):** Fully installable on both mobile and desktop devices, providing a seamless, native app-like experience. Robust Service Worker caching ensures that critical emergency guidance is accessible **100% offline**.
* **🧠 Client-Side Machine Learning:** Features a custom, entirely local Natural Language Processing (NLP) bag-of-words classification engine. It intelligently predicts user emergencies based on their queries *without ever transmitting sensitive user data to external servers*.
* **🎮 Interactive Scenarios:** Gamified, interactive decision-making scenarios that help educate users on recognizing and reacting to real-world scams and legal traps.
* **🌐 Multilingual Support:** Full internationalization (i18next) seamlessly toggling between English and Hindi to maximize accessibility.
* **✨ Glassmorphism UI:** A stunning, premium user interface utilizing translucent backdrops, glowing elements, and silky-smooth animations powered by Tailwind CSS and Framer Motion.

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Mobile-first, fully responsive)
* **Animations:** Framer Motion
* **Offline/PWA:** Vite PWA Plugin + Workbox
* **Icons:** Lucide React
* **Localization:** i18next

## ⚙️ Getting Started

To run this project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham-Ghodke/LawAssist.git
   cd LawAssist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   To test the offline features and PWA capabilities locally, you must run the production build:
   ```bash
   npm run build
   npm run preview
   ```

## 🔒 Security & Privacy

Privacy is a core tenet of LawAssist. 
* **Zero Outbound Data:** The application makes **zero** external API calls.
* **Local Processing:** All machine learning classification and scenario processing happen directly on the client's local CPU. No user queries, location data, or personal information ever leaves the device.
