import questions from '../data/questions.json';
import config from '../data/config.json';
import types from '../data/types.json';
import { countAnswers, getLevelsFromCounts, calculateSimilarity } from './utils.js';
import { getResult } from './result.js';

// 直接导出 main.js 想要的函数，完全匹配名称
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

// 保持主引擎逻辑
export function solveQuiz(answers) {
  const counts = calcDimensionsScores(answers);
  const userLevels = scoresToLevels(counts);
  return {
    result: determineResult(userLevels),
    userLevels,
    dimOrder: config.dimensions || ['C', 'F', 'A', 'L'],
    dimDefs: config.dimDefs
  };
}

// 导出原始数据
export const questionsData = questions;
export const configData = config;
export const typesData = types;

// 为了防止 main.js 里还有 default import
export default { solveQuiz, calcDimensionsScores, scoresToLevels, determineResult };
