import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts } from './utils.js';
import { getResult } from './result.js';

/**
 * 核心引擎：处理从题目到结果的完整逻辑
 */
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

/**
 * 关键兼容层：
 * 将新的函数重命名为 main.js 要求的旧名字，解决 "not exported" 报错
 */
export { 
  countAnswers as calcDimensionsScores, 
  getLevelsFromCounts as scoresToLevels, 
  getResult as determineResult,
  questions, 
  config, 
  types 
};
