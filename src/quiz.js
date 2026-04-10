import { shuffle, insertAtRandom, insertAfter } from './utils.js';
import questions from '../data/questions.json';

/**
 * 核心函数：创建题目逻辑
 * 必须确保名称为 createQuiz，供 main.js 调用
 */
export function createQuiz() {
  // 这里是你的题目处理逻辑，例如洗牌
  const shuffledQuestions = shuffle([...questions]);
  
  // 返回 main.js 预期的结构
  return {
    questions: shuffledQuestions,
    total: shuffledQuestions.length
  };
}

// 如果 main.js 还需要其他东西，也可以在这里导出
export { questions };

// 保险起见，增加默认导出
export default { createQuiz, questions };
