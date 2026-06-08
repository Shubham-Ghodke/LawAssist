import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Extending the Event interface for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallPWAButton({ className = '' }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Only render if the prompt is available
  if (!deferredPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-medium ${className}`}
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">{t('nav.install', 'Install App')}</span>
      <span className="sm:hidden">{t('nav.install_short', 'Install')}</span>
    </button>
  );
}
