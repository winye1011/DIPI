import { calculateSimilarity } from './utils.js';

export function getResult(userLevels, dimOrder, types) {
  const rankings = types.map(t => {
    const sim = calculateSimilarity(userLevels, t.code, dimOrder);
    return Object.assign({}, t, { similarity: sim });
  }).sort((a, b) => b.similarity - a.similarity);

  return {
    primary: rankings[0],
    secondary: rankings[1],
    rankings: rankings,
    mode: 'normal'
  };
}

export function getResultMode() {
  return 'normal';
}
