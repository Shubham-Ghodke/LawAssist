import { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function FloatingInstallCard() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback if browser doesn't support the programmatic prompt
      alert(t('pwa.install_manual', 'To install: tap the Share icon (or browser menu) and select "Add to Home Screen".'));
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-8 md:right-8 md:left-auto md:translate-x-0 z-50 w-[90%] max-w-sm animate-in slide-in-from-bottom-8 duration-500">
      <div className="relative overflow-hidden p-5 rounded-2xl border border-white/10 bg-dark-200/60 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
        {/* Glassmorphism gradient accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50 cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30">
            <Smartphone className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-white font-semibold text-lg leading-tight mb-1">
              {t('pwa.install_title', 'Install LawAssist')}
            </h3>
            <p className="text-xs text-gray-300">
              {t('pwa.install_desc', 'Add to your home screen for instant access and offline capabilities.')}
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="relative z-10 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
        >
          <Download className="w-5 h-5" />
          {t('pwa.install_button', 'Install App Now')}
        </button>
      </div>
    </div>
  );
}
