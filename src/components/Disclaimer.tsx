import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

export function Disclaimer({ className = '' }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={`p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-3 shadow-[0_0_15px_rgba(249,115,22,0.1)] text-left ${className}`}>
      <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
      <p className="text-sm text-orange-200/90 leading-relaxed font-medium">
        {t('global.disclaimer')}
      </p>
    </div>
  );
}
