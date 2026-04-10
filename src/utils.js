// 计算相似度
export function calculateSimilarity(userLevels, targetCode, dimOrder) {
  let score = 0;
  const targetArray = targetCode.split('');
  const levelMap = { 'H': 3, 'M': 2, 'L': 1 };
  
  dimOrder.forEach((dim, index) => {
    const userLevel = userLevels[dim] || 'M';
    const targetLevel = targetArray[index] || 'M';
    const dist = Math.abs(levelMap[userLevel] - levelMap[targetLevel]);
    score += (2 - dist);
  });
  
  return Math.max(0, Math.round((score / (dimOrder.length * 2)) * 100));
}

// 统计各维度得分
export function countAnswers(answers, questions) {
  const counts = {};
  answers.forEach((ans, index) => {
    const q = questions[index];
    if (q && q.options && q.options[ans]) {
      const type = q.options[ans].type;
      counts[type] = (counts[type] || 0) + 1;
    }
  });
  return counts;
}

// 转换等级
export function getLevelsFromCounts(counts, config) {
  const levels = {};
  const dims = config.dimensions || ['C', 'F', 'A', 'L'];
  dims.forEach(dim => {
    const score = counts[dim] || 0;
    if (score >= 6) levels[dim] = 'H';
    else if (score <= 3) levels[dim] = 'L';
    else levels[dim] = 'M';
  });
  return levels;
}
