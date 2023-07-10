import { createStore, ActionContext } from 'vuex'
import { Question, Status } from './../types'
import Utils from '@/utils'

export interface State {
  attemp: number
  bestScore: number
  status: Status
  score: number
  current: number
  checkedId: number | null
  enabled: boolean
  questions: Question[]
}

export default createStore<State>({
  state: {
    attemp: 1,
    bestScore: 0,
    status: 'start',
    score: 0,
    current: 0,
    checkedId: null,
    enabled: false,
    questions: [],
  },
  getters: {
    getProgressWidth(state) {
      let progressStep = 100 / state.questions.length
      return `width: ${state.current * progressStep + progressStep}%`
    },
  },
  mutations: {
    setStatus(state, payload: Status) {
      state.status = payload
    },
    setScore(state) {
      state.score++
    },
    setCurrent(state) {
      state.current++
    },
    clearScore(state) {
      state.score = 0
      state.current = 0
    },
    setRatio(state, payload: number): void {
      state.checkedId = payload
      state.enabled = true
    },
    restart(state) {
      state.status = 'start'
      state.score = 0
      state.current = 0
      state.attemp++
      localStorage.setItem('attemp', state.attemp + '')
    },
    nextQuestionHandler(state) {
      if (state.enabled) {
        if (state.checkedId === state.questions[state.current].right) {
          state.score++
        }

        if (state.current < state.questions.length - 1) {
          state.current++
        } else {
          state.status = 'finished'
          if (state.score > state.bestScore) {
            state.bestScore = state.score
            localStorage.setItem('bestScore', state.bestScore + '')
          }
        }
        state.enabled = false
        state.checkedId = null
      }
    },
    setQuestions(state, payload) {
      state.questions = payload
    },
    setBestScoreAndAttemp(state, payload) {
      state.bestScore = payload.bestScore
      state.attemp = payload.attemp
    },
  },
  actions: {
    async fetchData(context: ActionContext<State, State>) {
      try {
        const response = await fetch(
          'https://640c55b7a3e07380e8f1f0b6.mockapi.io/questions'
        )
        const data: Question[] = await response.json()
        context.commit('setQuestions', Utils.shuffleArray(data))
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      }
    },
  },
})
