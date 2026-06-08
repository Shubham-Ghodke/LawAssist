import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { EmergencyHelpPage } from './pages/EmergencyHelpPage';
import { PlayScenariosPage } from './pages/PlayScenariosPage';
import { ScenarioPlayerPage } from './pages/ScenarioPlayerPage';
import { useTranslation } from 'react-i18next';

import { Disclaimer } from './components/Disclaimer';
import { PWAPrompt } from './components/PWAPrompt';
import { FloatingInstallCard } from './components/FloatingInstallCard';

function App() {
  useTranslation();
  return (
    <Router>
      <div className="min-h-screen bg-dark text-light relative overflow-hidden font-sans">
        {/* Background gradient effects for the whole app */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <Navbar />
        
        <div className="relative z-10 flex-grow">
          <PWAPrompt />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/emergency" element={<EmergencyHelpPage />} />
            <Route path="/scenarios" element={<PlayScenariosPage />} />
            <Route path="/scenario/:id" element={<ScenarioPlayerPage />} />
          </Routes>
        </div>

        {/* Global Footer Disclaimer */}
        <footer className="relative z-10 border-t border-white/5 py-8 mt-auto bg-dark-100/50 backdrop-blur-md text-center text-sm text-gray-500">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <Disclaimer className="mb-4" />
            <p className="mt-2 text-xs">© {new Date().getFullYear()} LawAssist. All rights reserved.</p>
          </div>
        </footer>

        {/* Global Floating Overlays */}
        <div className="relative z-50">
          <FloatingInstallCard />
        </div>
      </div>
    </Router>
  );
}

export default App;
