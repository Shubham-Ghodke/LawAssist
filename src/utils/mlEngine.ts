import { Issue, issuesData } from '../data/issues';

class MLEngine {
  private vocab: Set<string> = new Set();
  private classDocCounts: Record<string, number> = {};
  private classWordCounts: Record<string, Record<string, number>> = {};
  private totalDocs: number = 0;
  private isTrained: boolean = false;

  constructor() {
    this.train(issuesData);
  }

  // Basic normalization and tokenization
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ') // Remove punctuation, preserving letters/numbers across languages
      .replace(/\s+/g, ' ')     // Normalize spaces
      .trim()
      .split(' ')
      .filter(word => word.length > 2); // Ignore short words
  }

  // Train the Naive Bayes model on the issue dataset
  public train(issues: Issue[]) {
    this.vocab.clear();
    this.classDocCounts = {};
    this.classWordCounts = {};
    this.totalDocs = 0;

    issues.forEach(issue => {
      // Treat each issue as a class
      const classId = issue.id;
      this.classDocCounts[classId] = 0;
      this.classWordCounts[classId] = {};

      // Build a training document for this issue using its metadata
      const trainingTexts = [
        issue.title,
        issue.description,
        ...issue.keywords,
        ...(issue.aliases || [])
      ];

      // Weight aliases and keywords heavily by duplicating them in the training text
      const combinedText = trainingTexts.join(' ') + ' ' + 
                           issue.keywords.join(' ') + ' ' + 
                           (issue.aliases ? issue.aliases.join(' ') : '');

      const tokens = this.tokenize(combinedText);
      
      this.classDocCounts[classId] += 1;
      this.totalDocs += 1;

      tokens.forEach(token => {
        this.vocab.add(token);
        this.classWordCounts[classId][token] = (this.classWordCounts[classId][token] || 0) + 1;
      });
    });

    this.isTrained = true;
  }

  // Predict the most likely issue for a given query
  public predict(query: string): { issueId: string; confidence: number } | null {
    if (!this.isTrained) return null;

    const tokens = this.tokenize(query);
    if (tokens.length === 0) return null;

    const scores: Record<string, number> = {};
    let maxScore = -Infinity;
    let predictedId = '';

    // Calculate probabilities using Naive Bayes with Laplace smoothing
    const vocabSize = this.vocab.size;

    Object.keys(this.classDocCounts).forEach(classId => {
      // Prior probability P(Class)
      let logProb = Math.log(this.classDocCounts[classId] / this.totalDocs);

      // Total words in this class
      const totalWordsInClass = Object.values(this.classWordCounts[classId]).reduce((a, b) => a + b, 0);

      // Conditional probability P(Word | Class)
      tokens.forEach(token => {
        const wordCount = this.classWordCounts[classId][token] || 0;
        // Laplace smoothing to handle unseen words
        const probWordGivenClass = (wordCount + 1) / (totalWordsInClass + vocabSize);
        logProb += Math.log(probWordGivenClass);
      });

      scores[classId] = logProb;

      if (logProb > maxScore) {
        maxScore = logProb;
        predictedId = classId;
      }
    });

    if (!predictedId) return null;

    // Convert log-probabilities to a rough confidence percentage (0-100)
    // This is a naive conversion for UX purposes since true probabilities get vanishingly small
    const scoreValues = Object.values(scores);
    const avgScore = scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length;
    const diff = maxScore - avgScore;
    
    // If the diff is very small, the model is guessing blindly
    let confidence = Math.min(Math.max((diff * 5), 10), 98); 
    
    // Boost confidence if specific rare keywords matched directly
    tokens.forEach(token => {
       if (this.classWordCounts[predictedId][token] > 0) {
         confidence += 2; // small boost for exact matches found during ML phase
       }
    });

    confidence = Math.min(confidence, 99);

    return {
      issueId: predictedId,
      confidence: confidence
    };
  }
}

// Export a singleton instance
export const mlEngine = new MLEngine();
