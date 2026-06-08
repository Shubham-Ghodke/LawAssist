import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { scenariosData } from '../data/scenarios';
import { useTranslation } from 'react-i18next';
import { Disclaimer } from '../components/Disclaimer';

export function PlayScenariosPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('scenarios.title', 'Interactive Scenarios')}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('scenarios.subtitle', 'Experience real-world fraud situations in a safe environment. Make choices and learn the correct actions.')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenariosData.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 flex flex-col h-full group ${scenario.severity === 'High' ? 'border-red-500/20 hover:border-red-500/50' : 'hover:border-blue/40'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-medium px-2 py-1 bg-white/10 text-gray-300 rounded-md">
                {scenario.category}
              </span>
            </div>
            
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${scenario.severity === 'High' ? 'group-hover:text-red-400' : 'group-hover:text-blue'}`}>
              {t(`scenarios_content.${scenario.id}.title`, scenario.title)}
            </h3>
            
            <p className="text-sm text-gray-400 mb-6 flex-grow line-clamp-3">
              {t(`scenarios_content.${scenario.id}.description`, scenario.description)}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">

              <span className="flex items-center gap-1"><BadgeCheck className="w-4 h-4" /> {scenario.type}</span>
            </div>
            
            <Button 
              variant="secondary" 
              onClick={() => navigate(`/scenario/${scenario.id}`)}
              className={`w-full text-sm transition-all ${scenario.severity === 'High' ? 'group-hover:bg-red-500/20 group-hover:text-red-400 group-hover:border-red-500/50' : 'group-hover:bg-blue group-hover:text-white group-hover:border-blue'}`}
            >
              {t('scenarios.start', 'Start Scenario')}
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 flex flex-col items-center">
        <Disclaimer />
      </div>
    </div>
  );
}
