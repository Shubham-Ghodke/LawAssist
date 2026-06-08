import { PhoneCall, ExternalLink, Siren } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { emergencyData } from '../data/emergency';

interface EmergencyActionPanelProps {
  emergencyId: string;
}

export function EmergencyActionPanel({ emergencyId }: EmergencyActionPanelProps) {
  const { t } = useTranslation();
  const actionData = emergencyData.find(e => e.id === emergencyId);

  if (!actionData) return null;

  return (
    <div className="w-full mt-8 p-6 sm:p-8 rounded-2xl bg-blue/10 border border-blue/30 backdrop-blur-md shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue/20 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-3 bg-red-500/20 rounded-full shrink-0">
          <Siren className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {t('emergency.title', 'Immediate Actions Required')}
          </h2>
          <p className="text-blue-200/80 text-sm">{actionData.title}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8 relative z-10">
        {actionData.actions.map((action, idx) => (
          <div key={idx} className="flex gap-4 items-start bg-dark/40 p-4 rounded-xl border border-white/5">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue/20 text-blue-400 font-bold text-sm">
              {idx + 1}
            </div>
            <p className="text-gray-200 mt-1">{action}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        {actionData.helpline && (
          <a
            href={`tel:${actionData.helpline}`}
            className="flex items-center justify-center gap-2 flex-1 bg-blue text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue/20 active:scale-[0.98]"
          >
            <PhoneCall className="w-5 h-5" />
            {t('emergency.call_helpline', 'Call Helpline:')} {actionData.helpline}
          </a>
        )}
        
        {actionData.portalLink && (
          <a
            href={actionData.portalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 bg-white/10 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/10 active:scale-[0.98]"
          >
            <ExternalLink className="w-5 h-5" />
            {t('emergency.visit_portal', 'Visit Portal')}
          </a>
        )}
      </div>
    </div>
  );
}
