import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-blue" />
            <Link to="/" className="text-xl font-bold tracking-tight">LawAssist</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              <Link to="/" className="hover:text-blue transition-colors px-3 py-2 rounded-md font-medium text-sm">{t('nav.home', 'Home')}</Link>
              <Link to="/emergency" className="text-red-400 hover:text-red-300 transition-colors px-3 py-2 rounded-md font-medium text-sm">{t('nav.emergency', 'Emergency Help')}</Link>
              <Link to="/scenarios" className="hover:text-blue transition-colors px-3 py-2 rounded-md font-medium text-sm">{t('nav.scenarios', 'Scenarios')}</Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                {i18n.language === 'en' ? 'EN' : 'HI'}
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-medium"
            >
              <Globe className="w-3 h-3" />
              {i18n.language === 'en' ? 'EN' : 'HI'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel mx-4 mb-4 mt-2"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium">{t('nav.home', 'Home')}</Link>
            <Link to="/emergency" onClick={() => setIsOpen(false)} className="block text-red-400 hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium">{t('nav.emergency', 'Emergency Help')}</Link>
            <Link to="/scenarios" onClick={() => setIsOpen(false)} className="block hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium">{t('nav.scenarios', 'Scenarios')}</Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
