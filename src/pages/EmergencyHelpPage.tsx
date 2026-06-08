import { motion } from 'framer-motion';
import { Siren, PhoneCall, Link as LinkIcon, ArrowRight, BadgeCheck, BrainCircuit } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { issuesData } from '../data/issues';
import { scenariosData } from '../data/scenarios';
import { Button } from '../components/ui/Button';
import { Gamepad2 } from 'lucide-react';
import { Disclaimer } from '../components/Disclaimer';
import { trackCategoryExploration } from '../utils/tracking';
import { useEffect } from 'react';

export function EmergencyHelpPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const isMlPredicted = searchParams.get('ml') === 'true';
  const mlConfidence = searchParams.get('conf');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const issue = issuesData.find(i => i.id === id);

  useEffect(() => {
    if (issue) {
      trackCategoryExploration(issue.category);
    }
  }, [issue]);

  if (!id) {
    const categories = ['Cybercrime', 'Consumer Rights'];
    return (
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-red-500 flex items-center justify-center gap-3">
            <Siren className="w-10 h-10" />
            {t('emergency.directory_title', 'Emergency Guidance Library')}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('emergency.directory_subtitle', 'Select your specific issue from the categories below to get immediate step-by-step actions and guidance.')}
          </p>
        </div>

        <div className="space-y-12">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6 text-blue border-b border-white/10 pb-2">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {issuesData.filter(i => i.category === category).map(issue => (
                  <motion.div
                    key={issue.id}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 cursor-pointer hover:border-blue/30 transition-colors flex flex-col h-full"
                    onClick={() => navigate(`/emergency?id=${issue.id}`)}
                  >
                    <div className="text-xs text-gray-500 mb-2">{t(`issues.${issue.id}.subcategory`, issue.subcategory)}</div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-light mb-2 group-hover:text-blue transition-colors">{t(`issues.${issue.id}.title`, issue.title)}</h3>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 flex-grow">{t(`issues.${issue.id}.description`, issue.description)}</p>
                    <div className="mt-4 flex items-center text-sm text-blue font-medium">
                      {t('emergency.view_guidance', 'View Guidance')} <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="pt-32 pb-16 px-4 text-center min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">{t('emergency.not_found', 'Issue Not Found')}</h1>
        <p className="text-gray-400 mb-8">{t('emergency.not_found_desc', 'We could not find the specific emergency guidance you are looking for.')}</p>
        <Button onClick={() => navigate('/')}>
          {t('emergency.back_home', 'Return Home')}
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 border-blue/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
          issue.severity === 'High' ? 'from-red-500 to-red-400' : 
          issue.severity === 'Medium' ? 'from-orange-500 to-orange-400' : 'from-blue to-blue-400'
        }`} />
        
        {isMlPredicted && (
          <div className="mb-6 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-400 shrink-0" />
              <span className="text-purple-300 text-sm font-medium">AI Issue Prediction</span>
            </div>
            {mlConfidence && (
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono">
                {mlConfidence}% Match
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue/10 rounded-full shrink-0">
              <Siren className="w-8 h-8 text-blue" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wider">{t(`issues.${issue.id}.category`, issue.category)}</span>
                <span className="text-xs text-gray-400">{t(`issues.${issue.id}.subcategory`, issue.subcategory)}</span>
              </div>
              <h1 className="text-3xl font-bold text-light">{t(`issues.${issue.id}.title`, issue.title)}</h1>
              <p className="text-lg text-gray-400 mt-2">{t(`issues.${issue.id}.description`, issue.description)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <section className="glass p-6 md:p-8 rounded-2xl border border-blue/30 bg-blue/5">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue flex items-center gap-3">
              <Siren className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
              {t('emergency.immediate_actions', 'Recommended Immediate Actions')}
            </h2>
            <ul className="space-y-4">
              {issue.emergencyActions.map((action, i) => {
                const actionText = t(`issues.${issue.id}.actions.${i}`, action);
                // Highlight the first few words or verbs dynamically (naive implementation for visual effect)
                const words = actionText.split(' ');
                const highlighted = words.slice(0, 2).join(' ');
                const rest = words.slice(2).join(' ');

                return (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    className="flex items-start gap-4 bg-dark-100/80 p-5 md:p-6 rounded-xl border border-blue/20 shadow-lg hover:border-blue/40 transition-colors"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-lg font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      {i + 1}
                    </span>
                    <span className="text-gray-100 text-lg md:text-xl leading-relaxed">
                      <span className="text-blue font-semibold">{highlighted} </span>
                      {rest}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </section>

          {issue.preventionTips && issue.preventionTips.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-300 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-gray-400" />
                {t('emergency.prevention_tips', 'Prevention Tips')}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {issue.preventionTips.map((tip, i) => (
                  <li key={i} className="glass-card p-4 text-gray-400 text-sm border-l-2 border-l-gray-600">
                    {t(`issues.${issue.id}.tips.${i}`, tip)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {issue.helpline && (
              <div className="glass-card p-6 bg-dark-200/30">
                <PhoneCall className="w-6 h-6 text-blue mb-3" />
                <h3 className="font-semibold mb-2">{t('emergency.helplines', 'Important Helplines')}</h3>
                <p className="text-lg text-white font-mono bg-white/5 inline-block px-3 py-1 rounded">{issue.helpline}</p>
              </div>
            )}
            
            {issue.portalLink && (
              <div className="glass-card p-6 bg-dark-200/30">
                <LinkIcon className="w-6 h-6 text-blue mb-3" />
                <h3 className="font-semibold mb-2">{t('emergency.official_portal', 'Official Portal')}</h3>
                <a href={issue.portalLink.url} target="_blank" rel="noreferrer" className="text-blue hover:underline break-words flex items-center gap-1 group">
                  {issue.portalLink.label}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
                </a>
              </div>
            )}
          </div>

          {issue.relatedScenarioIds && issue.relatedScenarioIds.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-light mb-2">{t('emergency.try_variations', 'Play Similar Scenarios')}</h3>
                <p className="text-gray-400 mb-6">{t('emergency.related_scenario_desc', 'Scammers use different tactics. Play these interactive scenarios to understand how this fraud happens in real life.')}</p>
                <Button 
                  onClick={() => {
                    if (issue.relatedScenarioIds) {
                      const randomId = issue.relatedScenarioIds[Math.floor(Math.random() * issue.relatedScenarioIds.length)];
                      navigate(`/scenario/${randomId}`);
                    }
                  }}
                  className="px-8 py-3 text-lg font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-pulse hover:animate-none"
                >
                  <Gamepad2 className="w-5 h-5 mr-2 inline" />
                  {t('emergency.play_random', 'Play Random Variation')}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {issue.relatedScenarioIds.map(scenarioId => {
                  const scenario = scenariosData.find(s => s.id === scenarioId);
                  if (!scenario) return null;
                  return (
                    <motion.div
                      key={scenario.id}
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-5 border-white/10 hover:border-blue/40 transition-colors flex flex-col h-full cursor-pointer group"
                      onClick={() => navigate(`/scenario/${scenario.id}`)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg text-white group-hover:text-blue transition-colors">{t(`scenarios_content.${scenario.id}.title`, scenario.title)}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{t(`scenarios_content.${scenario.id}.description`, scenario.description)}</p>
                      <div className="flex items-center justify-between text-sm mt-auto pt-2">
                        <span className="text-blue font-medium flex items-center ml-auto">{t('scenarios.play', 'Play Now')} <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" /></span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center pt-6 border-t border-white/5">
            <Disclaimer />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
