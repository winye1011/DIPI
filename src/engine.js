import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts } from './utils.js';
import { getResult } from './result.js';

export function solveQuiz(answers) {
  const counts = countAnswers(answers, questions);
  const userLevels = getLevelsFromCounts(counts, config);
  const dimOrder = config.dimensions || ['C', 'F', 'A', 'L'];
  const result = getResult(userLevels, dimOrder, types);
  
  return {
    result,
    userLevels,
    dimOrder,
    dimDefs: config.dimDefs
  };
}

export { questions, config, types };
