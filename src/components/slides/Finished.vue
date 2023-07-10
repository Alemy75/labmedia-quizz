<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import Utils from '@/utils'

export default defineComponent({
  name: 'Finished',
  methods: {
    ...mapMutations(['restart']),
    ...mapActions(['fetchData']),
    onClickHandler() {
      this.restart()
      this.fetchData()
    },
    score(value: number) {
      return `${value}/${this.$store.state.questions.length}`
    },
    scoreProcents(value: number) {
      return (value / this.$store.state.questions.length) * 100
    },
    isScoreGood(): boolean {
      if (this.scoreProcents(this.$store.state.score) > 80) {
        return true
      } else {
        return false
      }
    },
  },
  computed: {
    message() {
      if (this.isScoreGood()) {
        return 'Курс пройден!'
      } else {
        return 'Не очень хороший результат, рекомендуем изучить курс еще раз.'
      }
    },

    numberColorClasses() {
      if (this.isScoreGood()) {
        return 'results-stats__numbers results-stats__numbers_good'
      } else {
        return 'results-stats__numbers results-stats__numbers_bad'
      }
    },

    resultsStatsClasses() {
      if (this.$store.state.attemp == 1) {
        return 'results-stats results-stats_huge'
      } else {
        return 'results-stats'
      }
    },

    getNowDate() {
      let date = new Date().toLocaleDateString()
      return date
    },
  },
})
</script>

<template>
  <div class="results">
    <div class="wrapper wrapper_block">
      <h1>Результаты тестирования</h1>
      <div class="content__wrapper">
        <span class="results__title"
          >Константин Константинопольский {{ getNowDate }}</span
        >
        <article class="results__wrapper">
          <div :class="resultsStatsClasses">
            <span class="results-stats__attemp"
              >Результаты {{ $store.state.attemp }}-й попытки</span
            >
            <span :class="numberColorClasses"
              >{{ score($store.state.score) }}
              {{ scoreProcents($store.state.score) }}%</span
            >
          </div>
          <div v-if="$store.state.attemp != 1" class="results-stats">
            <span class="results-stats__attemp">Лучший результат</span>
            <span class="results-stats__numbers results-stats__numbers_best"
              >{{ score($store.state.bestScore) }}
              {{ scoreProcents($store.state.bestScore) }}%</span
            >
          </div>
        </article>

        <p class="results__message">{{ message }}</p>
      </div>
      <button class="button results__button" @click="onClickHandler">
        Повторить тест
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="20"
          viewBox="0 0 26 20"
          fill="none"
        >
          <path
            d="M13 1.53846C15.6579 1.53846 18.0329 2.73615 19.6028 4.61538H21.5252C19.7277 1.83976 16.5812 0 13 0C7.51963 0 3.05718 4.30853 2.88948 9.68615L1.10041 7.91749L0 9.00535L3.66264 12.6262L7.32528 9.00535L6.22487 7.91749L4.447 9.67508C4.61973 5.15248 8.38294 1.53846 13 1.53846Z"
            fill="black"
          />
          <path
            d="M6.39746 15.3846H4.475C6.27254 18.1602 9.41906 20 13.0002 20C18.4805 20 22.9429 15.6916 23.1108 10.3141L24.8996 12.0825L26 10.9946L22.3374 7.3738L18.6747 10.9946L19.7751 12.0825L21.5532 10.3247C21.3807 14.8474 17.6174 18.4615 13.0002 18.4615C10.3423 18.4615 7.96736 17.2639 6.39746 15.3846Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style></style>
