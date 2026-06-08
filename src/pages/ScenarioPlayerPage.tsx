import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, AlertTriangle, ArrowLeft, Info } from 'lucide-react';
import { scenariosData } from '../data/scenarios';
import { EmergencyActionPanel } from '../components/EmergencyActionPanel';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Disclaimer } from '../components/Disclaimer';

export function ScenarioPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const scenario = scenariosData.find(s => s.id === id);
  
  const [currentStepId, setCurrentStepId] = useState('intro');

  if (!scenario) {
    return (
      <div className="pt-32 pb-16 px-4 min-h-screen text-center">
        <h2 className="text-3xl font-bold">{t('emergency.not_found', 'Scenario Not Found')}</h2>
        <Button className="mt-8" onClick={() => navigate('/scenarios')}>{t('scenarios.back_to_directory', 'Back to Scenarios')}</Button>
      </div>
    );
  }

  const currentStep = scenario.steps[currentStepId];

  const handleOptionClick = (nextStepId: string) => {
    setCurrentStepId(nextStepId);
  };

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen flex flex-col">
      <button 
        onClick={() => navigate('/scenarios')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> {t('scenarios.back_to_directory', 'Back to Scenarios')}
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-white/10 text-gray-300 rounded-md">
            {scenario.category}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{t(`scenarios_content.${scenario.id}.title`, scenario.title)}</h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-grow flex flex-col"
        >
          <div className={`glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden ${currentStep.type === 'result' ? (currentStep.title.includes('Correct') ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5') : ''}`}>
            
            {currentStep.type === 'info' && (
              <div className="mb-8 text-blue-400"><Info className="w-12 h-12" /></div>
            )}
            
            {currentStep.type === 'decision' && (
              <div className="mb-8 text-yellow-400"><AlertTriangle className="w-12 h-12" /></div>
            )}

            {currentStep.type === 'result' && (
              <div className={`mb-8 ${currentStep.title.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                <BadgeCheck className="w-12 h-12" />
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t(`scenarios_content.${scenario.id}.steps.${currentStepId}.title`, currentStep.title)}
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              {t(`scenarios_content.${scenario.id}.steps.${currentStepId}.content`, currentStep.content)}
            </p>

            {currentStep.options && currentStep.options.length > 0 && (
              <div className="grid gap-4 mt-auto">
                {currentStep.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option.nextStepId)}
                    className="w-full text-left p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue/50 transition-all font-medium text-lg group"
                  >
                    <span className="flex items-center justify-between">
                      {t(`scenarios_content.${scenario.id}.steps.${currentStepId}.options.${idx}.label`, option.label)}
                      <ArrowLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 transform rotate-180 transition-all" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentStep.type === 'result' && currentStep.emergencyId && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <EmergencyActionPanel emergencyId={currentStep.emergencyId} />
            </motion.div>
          )}

          {currentStep.type === 'result' && (
            <div className="mt-8 flex justify-center">
               <Button onClick={() => navigate('/scenarios')} variant="secondary">
                 {t('scenarios.try_another', 'Try Another Scenario')}
               </Button>
            </div>
          )}
          
          <div className="mt-12">
            <Disclaimer />
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
