import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getTrackingData } from '../utils/tracking';
import { LayoutDashboard, Compass, Gamepad2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TrackingData } from '../utils/tracking';

export function DashboardPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<TrackingData | null>(null);

  useEffect(() => {
    setData(getTrackingData());
  }, []);

  if (!data) return null;

  const topSearches = Object.entries(data.frequentlySearched)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const categories = Object.entries(data.categoriesExplored)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex items-center gap-4"
      >
        <div className="p-3 bg-blue/10 rounded-full shrink-0">
          <LayoutDashboard className="w-8 h-8 text-blue" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-light">{t('dashboard.title', 'Your Activity Dashboard')}</h1>
          <p className="text-gray-400">{t('dashboard.subtitle', 'Track your progress and awareness journey.')}</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Scenarios Completed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 border-white/5"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="w-6 h-6 text-blue" />
            <h2 className="text-xl font-semibold">{t('dashboard.scenarios_completed', 'Scenarios Completed')}</h2>
          </div>
          <div className="text-5xl font-bold text-light mb-2">
            {data.scenariosCompleted.length}
          </div>
          <p className="text-gray-400 text-sm">
            {data.scenariosCompleted.length === 0 
              ? t('dashboard.no_scenarios', 'Start playing scenarios to track your score.')
              : t('dashboard.scenarios_desc', 'Interactive simulations completed.')}
          </p>
        </motion.div>

        {/* Categories Explored */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 border-white/5 md:col-span-2"
        >
          <div className="flex items-center gap-3 mb-6">
            <Compass className="w-6 h-6 text-blue" />
            <h2 className="text-xl font-semibold">{t('dashboard.categories_explored', 'Categories Explored')}</h2>
          </div>
          
          {categories.length > 0 ? (
            <div className="space-y-4">
              {categories.map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-300">{category}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-2 bg-dark-200 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-blue" 
                        style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 font-mono">{count} views</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">{t('dashboard.no_categories', 'You haven\'t explored any issue categories yet.')}</p>
          )}
        </motion.div>

        {/* Frequently Searched */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 border-white/5 md:col-span-3"
        >
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-blue" />
            <h2 className="text-xl font-semibold">{t('dashboard.top_searches', 'Your Top Searches')}</h2>
          </div>

          {topSearches.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {topSearches.map(([query, count]) => (
                <div key={query} className="px-4 py-2 bg-dark-200/50 rounded-lg border border-white/5 flex items-center gap-2">
                  <span className="text-gray-300">{query}</span>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">{t('dashboard.no_searches', 'Use the search bar on the homepage to find guidance.')}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
