import * as Engine from './engine.js'
import { createQuiz } from './quiz.js'
import { renderResult } from './result.js'
import './style.css'

async function loadJSON(path) {
  const res = await fetch(path)
  return res.json()
}

async function init() {
  // 1. 加载所有数据
  const [questions, types, config] = await Promise.all([
    loadJSON(new URL('../data/questions.json', import.meta.url).href),
    loadJSON(new URL('../data/types.json', import.meta.url).href),
    loadJSON(new URL('../data/config.json', import.meta.url).href),
  ])

  const pages = {
    intro: document.getElementById('page-intro'),
    quiz: document.getElementById('page-quiz'),
    result: document.getElementById('page-result'),
  }

  function showPage(name) {
    Object.values(pages).forEach((p) => {
      if (p) p.classList.remove('active')
    })
    if (pages[name]) pages[name].classList.add('active')
    window.scrollTo(0, 0)
  }

  // 2. 核心修正：统一调用 Engine 导出的方法
  function onQuizComplete(answers) {
    // 使用之前在 engine.js 里对齐过的别名函数
    const scores = Engine.calcDimensionsScores(answers, questions)
    const levels = Engine.scoresToLevels(scores, config)
    
    // 获取人格匹配结果
    const dimOrder = config.dimensions || ['C', 'F', 'A', 'L']
    const result = Engine.determineResult(levels, dimOrder, types)
    
    // 渲染结果页面
    renderResult(result, levels, dimOrder, config.dimDefs, config)
    showPage('result')
  }

  // 3. 启动测验
  const quiz = createQuiz(questions, config, onQuizComplete)

  const btnStart = document.getElementById('btn-start')
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      quiz.start()
      showPage('quiz')
    })
  }

  const btnRestart = document.getElementById('btn-restart')
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      quiz.start()
      showPage('quiz')
    })
  }
}

init().catch(err => console.error("Init Error:", err))
