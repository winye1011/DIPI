import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts } from './utils.js';
import { getResult } from './result.js';

// 直接定义 main.js 想要的这三个函数名
export const calcDimensionsScores = countAnswers;
export const scoresToLevels = getLevelsFromCounts;
export const determineResult = getResult;

/**
 * 核心引擎：处理完整逻辑
 */
export function solveQuiz(answers) {
  const counts = calcDimensionsScores(answers, questions);
  const userLevels = scoresToLevels(counts, config);
  const dimOrder = config.dimensions || ['C', 'F', 'A', 'L'];
  const result = determineResult(userLevels, dimOrder, types);
  
  return {
    result,
    userLevels,
    dimOrder,
    dimDefs: config.dimDefs
  };
}

// 导出数据
export { questions, config, types };
