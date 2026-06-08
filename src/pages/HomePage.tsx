import { motion } from 'framer-motion';
import { SearchComponent } from '../components/SearchComponent';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ThreeBackground } from '../components/ThreeBackground';
import { useTranslation } from 'react-i18next';
import { issuesData } from '../data/issues';
import { Siren, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const highRiskIssues = issuesData.filter(i => i.severity === 'High').slice(0, 3);
  const trendingCyber = issuesData.filter(i => i.category === 'Cybercrime' && i.severity !== 'High').slice(0, 3);
  const trendingConsumer = issuesData.filter(i => i.category === 'Consumer Rights' && i.severity !== 'High').slice(0, 3);

  const renderIssueCard = (issue: any) => (
    <motion.div
      key={issue.id}
      whileHover={{ scale: 1.02 }}
      className={`glass-card p-6 cursor-pointer transition-colors flex flex-col h-full ${issue.isHighRisk ? 'hover:border-red-500/50' : 'hover:border-blue/30'}`}
      onClick={() => navigate(`/emergency?id=${issue.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{t(`issues.${issue.id}.subcategory`, issue.subcategory) as string}</span>
        {issue.severity === 'High' && (
          <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30 uppercase tracking-wider shrink-0 animate-pulse">
            {t('emergency.high_risk', 'High Risk') as string}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-light mb-2">{t(`issues.${issue.id}.title`, issue.title) as string}</h3>
      <p className="text-sm text-gray-400 line-clamp-2 flex-grow mb-4">{t(`issues.${issue.id}.description`, issue.description) as string}</p>
      <div className={`mt-auto flex items-center text-sm font-medium ${issue.severity === 'High' ? 'text-red-400' : 'text-blue'}`}>
        {t('emergency.view_guidance', 'View Guidance')} <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <ThreeBackground />
      
      {/* Hero Section */}
      <div className="text-center space-y-8 relative z-10 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 pb-4">
            {t('home.title_part1', 'Understand What To Do.')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue-400">{t('home.title_part2', 'When It Matters Most.')}</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
            {t('home.subtitle', 'Your first-aid system for legal awareness and response regarding cybercrimes and consumer rights.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8"
        >
          <SearchComponent />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
        >
          <Button onClick={() => navigate('/emergency')} className="text-lg px-8 py-4">
            {t('home.btn_emergency', 'Emergency Directory')}
          </Button>
          <Button variant="secondary" onClick={() => navigate('/scenarios')} className="text-lg px-8 py-4">
            {t('home.btn_scenario', 'Play Scenarios')}
          </Button>
        </motion.div>
      </div>

      {/* Intelligence Dashboard Sections */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-16 relative z-10"
      >
        {/* High Risk Alerts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-light">{t('home.trending_high_risk', 'Trending High-Risk Issues in India')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {highRiskIssues.map(renderIssueCard)}
          </div>
        </section>

        {/* Trending Cybercrime */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Siren className="w-8 h-8 text-blue" />
            <h2 className="text-3xl font-bold text-light">{t('home.trending_scams', 'Most Reported Scams')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingCyber.map(renderIssueCard)}
          </div>
        </section>

        {/* Trending Consumer Rights */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold text-light">{t('home.trending_consumer', 'Trending Consumer Complaints')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingConsumer.map(renderIssueCard)}
          </div>
        </section>
      </motion.div>


    </div>
  );
}
