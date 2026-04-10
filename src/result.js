import { calculateSimilarity } from './utils.js';

export const getResult = (userLevels, dimOrder, types) => {
  const rankings = types.map(type => {
    const similarity = calculateSimilarity(userLevels, type.code, dimOrder);
    return { ...type, similarity };
  }).sort((a, b) => b.similarity - a.similarity);

  return {
    primary: rankings[0],
    secondary: rankings[1],
    rankings,
    mode: 'normal'
  };
};

export const getResultMode = () => {
  return 'normal';
};
