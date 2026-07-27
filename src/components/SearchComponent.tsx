import { useState, useMemo } from 'react';
import { Search, ArrowRight, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { issuesData, Issue } from '../data/issues';
import { trackSearch } from '../utils/tracking';
import { mlEngine } from '../utils/mlEngine';

type SearchResult = Issue & {
  mlPredicted?: boolean;
  mlConfidence?: number;
};

// 1. Query Normalization System
const normalizeQuery = (query: string) => {
  let normalized = query.toLowerCase().trim();
  
  // Clean punctuation
  normalized = normalized.replace(/[^\w\s]/g, ' ');

  // Fix repeated characters (e.g. stooone -> stone)
  normalized = normalized.replace(/(.)\1{2,}/g, '$1$1');
  
  // Custom slang/typo overrides
  normalized = normalized.replace(/\bhaced\b/g, 'hacked');
  normalized = normalized.replace(/\bhackd\b/g, 'hacked');
  normalized = normalized.replace(/\baya\b/g, 'aaya');
  
  // Remove common stop words (English and Hinglish)
  const stopWords = ['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'mein', 'mera', 'meri', 'hai', 'ki', 'ka', 'ko', 'se', 'my', 'is', 'am', 'are'];
  const regex = new RegExp(`\\b(${stopWords.join('|')})\\b`, 'g');
  normalized = normalized.replace(regex, '');
  
  // Simplify spacing
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
};

export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 2 & 3. Fuzzy Matching Setup
  const fuse = useMemo(() => new Fuse(issuesData, {
    keys: [
      { name: 'aliases', weight: 4 },
      { name: 'keywords', weight: 2 },
      { name: 'title', weight: 1.5 },
      { name: 'description', weight: 1 }
    ],
    threshold: 0.5,
    includeScore: true,
    ignoreLocation: true,
    distance: 100,
  }), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setQuery(rawVal);
    
    if (rawVal.trim().length === 0) {
      setResults([]);
      return;
    }

    const normalizedVal = normalizeQuery(rawVal);
    const searchVal = normalizedVal.length > 2 ? normalizedVal : rawVal;
    
    // Step 1: Run Fuzzy Search
    const fuseResults = fuse.search(searchVal);
    
    // Map Fuse results
    let combinedResults: SearchResult[] = fuseResults.map(r => ({
      ...r.item,
    }));

    // Step 2: 4. ML Classification Layer
    // Only engage ML if query is long enough to be an intent (not just a 3-letter keyword)
    if (searchVal.split(' ').length > 1 || rawVal.length > 8) {
      const prediction = mlEngine.predict(searchVal);
      
      if (prediction && prediction.confidence > 20) {
        // Check if the ML predicted issue is already at the very top of Fuse results
        const isTopFuseResult = fuseResults.length > 0 && 
                                fuseResults[0].item.id === prediction.issueId && 
                                (fuseResults[0].score || 1) < 0.3; // low score means good match in Fuse

        if (!isTopFuseResult) {
          const predictedIssue = issuesData.find(i => i.id === prediction.issueId);
          if (predictedIssue) {
            // Remove it if it exists lower down in the fuse results
            combinedResults = combinedResults.filter(r => r.id !== prediction.issueId);
            
            // Inject the ML prediction at the top
            combinedResults.unshift({
              ...predictedIssue,
              mlPredicted: true,
              mlConfidence: Math.round(prediction.confidence)
            });
          }
        }
      }
    }

    setResults(combinedResults.slice(0, 5)); // Limit to top 5
  };

  const handleSelect = (item: SearchResult) => {
    trackSearch(query);
    const mlParams = item.mlPredicted ? `&ml=true&conf=${item.mlConfidence}` : '';
    navigate(`/emergency?id=${item.id}${mlParams}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 glass-card bg-dark-100/50 text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue focus:bg-dark-100/80 transition-all text-lg"
          placeholder={t('home.search_placeholder', 'Describe your issue (e.g., received stone in parcel, insta hacked)')}
          value={query}
          onChange={handleSearch}
        />
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full glass-panel overflow-hidden z-50 shadow-2xl"
          >
            <ul className="max-h-80 overflow-auto py-2">
              {results.map((item) => (
                <li key={item.id} className="border-b border-white/5 last:border-0">
                  <button
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 hover:bg-white/10 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-light group-hover:text-blue transition-colors text-base">{t(`issues.${item.id}.title`, item.title)}</p>
                        {item.mlPredicted && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                            <BrainCircuit className="w-3 h-3" /> ML Prediction ({item.mlConfidence}%)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wider">{t(`issues.${item.id}.category`, item.category)}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{t(`issues.${item.id}.subcategory`, item.subcategory)}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-blue transition-colors flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
