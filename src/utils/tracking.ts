export interface TrackingData {
  categoriesExplored: Record<string, number>;
  scenariosCompleted: string[];
  frequentlySearched: Record<string, number>;
}

const STORAGE_KEY = 'lawassist_tracking';

export function getTrackingData(): TrackingData {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing tracking data', e);
    }
  }
  return {
    categoriesExplored: {},
    scenariosCompleted: [],
    frequentlySearched: {}
  };
}

export function saveTrackingData(data: TrackingData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function trackCategoryExploration(category: string) {
  const data = getTrackingData();
  data.categoriesExplored[category] = (data.categoriesExplored[category] || 0) + 1;
  saveTrackingData(data);
}

export function trackScenarioCompletion(scenarioId: string) {
  const data = getTrackingData();
  if (!data.scenariosCompleted.includes(scenarioId)) {
    data.scenariosCompleted.push(scenarioId);
    saveTrackingData(data);
  }
}

export function trackSearch(query: string) {
  if (query.trim().length < 3) return;
  const data = getTrackingData();
  const normalizedQuery = query.toLowerCase().trim();
  data.frequentlySearched[normalizedQuery] = (data.frequentlySearched[normalizedQuery] || 0) + 1;
  saveTrackingData(data);
}
