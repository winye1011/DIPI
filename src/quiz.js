import { shuffle, insertAtRandom, insertAfter } from './utils.js';
import questions from '../data/questions.json';

/**
 * 核心导出：创建测验逻辑
 */
export function createQuiz() {
  // 这里做一个简单的洗牌，确保每次题目顺序不同
  const quizQuestions = shuffle([...questions]);
  
  return {
    questions: quizQuestions,
    currentIndex: 0,
    total: quizQuestions.length
  };
}

// 导出原始题目数据，防止 main.js 其他地方用到
export { questions };

// 默认导出，作为最后的保险
export default { createQuiz, questions };
