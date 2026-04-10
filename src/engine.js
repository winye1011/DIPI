import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts } from './utils.js';
import { getResult } from './result.js';

// 1. 直接声明 main.js 想要的函数名
export function calcDimensionsScores(answers) {
  return countAnswers(answers, questions);
}

export function scoresToLevels(counts) {
  return getLevelsFromCounts(counts, config);
}

export function determineResult(userLevels) {
  const dimOrder = config.dimensions || ['C', 'F', 'A', 'L'];
  return getResult(userLevels, dimOrder, types);
}

// 2. 保持 solveQuiz 逻辑
export function solveQuiz(answers) {
  const counts = calcDimensionsScores(answers);
  const userLevels = scoresToLevels(counts);
  const result = determineResult(userLevels);
  
  return {
    result,
    userLevels,
    dimOrder: config.dimensions || ['C', 'F', 'A', 'L'],
    dimDefs: config.dimDefs
  };
}

// 3. 导出数据
export { questions, config, types };
