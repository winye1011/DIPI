import questions from '../data/questions.json'
import config from '../data/config.json'
import types from '../data/types.json'
import { countAnswers, getLevelsFromCounts } from './utils.js'
import { getResult } from './result.js'

/**
 * 核心引擎：处理从题目到结果的完整逻辑
 */
export function solveQuiz(answers) {
  // 1. 统计各维度得分（基于你定义的 C/F/A/L）
  const counts = countAnswers(answers, questions)
  
  // 2. 根据得分转换等级 (H/M/L)
  const userLevels = getLevelsFromCounts(counts, config)
  
  // 3. 匹配最接近的人格类型
  const dimOrder = config.dimensions || ['C', 'F', 'A', 'L']
  const result = getResult(userLevels, dimOrder, types)
  
  return {
    result,
    userLevels,
    dimOrder,
    dimDefs: config.dimDefs
  }
}

// 导出数据供其他组件使用
export { questions, config, types }
