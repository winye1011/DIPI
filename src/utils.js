// 1. 相似度计算
export const calculateSimilarity = (userLevels, targetCode, dimOrder) => {
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
};

// 2. 答案统计
export const countAnswers = (answers, questions) => {
  const counts = {};
  answers.forEach((ans, index) => {
    const q = questions[index];
    if (q && q.options && q.options[ans]) {
      const type = q.options[ans].type;
      counts[type] = (counts[type] || 0) + 1;
    }
  });
  return counts;
};

// 3. 等级转换
export const getLevelsFromCounts = (counts, config) => {
  const levels = {};
  const dims = config.dimensions || ['C', 'F', 'A', 'L'];
  dims.forEach(dim => {
    const score = counts[dim] || 0;
    if (score >= 6) levels[dim] = 'H';
    else if (score <= 3) levels[dim] = 'L';
    else levels[dim] = 'M';
  });
  return levels;
};

// --- 以下是 quiz.js 需要的三个丢失工具，必须补上！ ---

// 4. 洗牌算法 (shuffle)
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 5. 随机插入 (insertAtRandom)
export function insertAtRandom(array, element) {
  const index = Math.floor(Math.random() * (array.length + 1));
  array.splice(index, 0, element);
  return array;
}

// 6. 指定位置插入 (insertAfter)
export function insertAfter(array, element, afterIndex) {
  array.splice(afterIndex + 1, 0, element);
  return array;
}
