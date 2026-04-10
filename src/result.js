import { calculateSimilarity } from './utils.js'

/**
 * 获取测试结果
 */
export function getResult(userLevels, dimOrder, types) {
  const userCode = dimOrder.map(dim => userLevels[dim] || 'M').join('')
  
  // 计算所有类型的匹配度
  const rankings = types.map(type => {
    const similarity = calculateSimilarity(userLevels, type.code, dimOrder)
    return {
      ...type,
      similarity
    }
  }).sort((a, b) => b.similarity - a.similarity)

  // 获取最匹配的主类型
  const primary = rankings[0]
  
  return {
    primary,
    secondary: rankings[1],
    rankings,
    mode: 'normal'
  }
}

/**
 * 这里的逻辑已经被简化，确保不会因为找不到 drinkGate 而报错
 */
export function getResultMode(answers, config) {
  return 'normal'
}
