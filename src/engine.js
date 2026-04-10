import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts } from './utils.js';
import { getResult } from './result.js';

// 1. 核心业务逻辑
export function solveQuiz(answers) {
  const counts = countAnswers(answers, questions);
  const userLevels = getLevelsFromCounts(counts, config);
  const dimOrder = config.dimensions || ['C', 'F', 'A', 'L'];
  return {
    result: getResult(userLevels, dimOrder, types),
    userLevels,
    dimOrder,
    dimDefs: config.dimDefs
  };
}

// 2. 导出 main.js 可能在寻找的三个旧函数名
export const calcDimensionsScores = countAnswers;
export const scoresToLevels = getLevelsFromCounts;
export const determineResult = getResult;

// 3. 导出原始数据
export { questions, config, types };

// 4. 终极保险：默认导出，防止 main.js 使用 default import
export default {
  solveQuiz,
  calcDimensionsScores,
  scoresToLevels,
  determineResult,
  questions,
  config,
  types
};
