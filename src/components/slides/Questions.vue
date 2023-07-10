<script lang="ts">
import { defineComponent } from 'vue'
import Answers from '../blocks/Answers.vue'

export default defineComponent({
  components: {
    Answers,
  },
  methods: {
    onClickHandler() {
      this.$store.commit('nextQuestionHandler')
    }
  },
  computed: {
    buttonClassList() {
      if (this.$store.state.enabled) {
        return 'button question__button'
      } else {
        return 'button question__button button_disabled'
      }
    },
  },
})
</script>

<template>
  <div class="question">
    <div class="wrapper wrapper_block">
      <h1>Тестирование</h1>
      <div class="content__wrapper">
        <p class="question__title">
          {{ $store.state.questions[$store.state.current].title }}
        </p>
      </div>

      <Answers
        :answers="$store.state.questions[$store.state.current].answers"
      />

      <button
        :class="buttonClassList"
        :disabled="!$store.state.enabled"
        @click="onClickHandler"
      >
        Принять
      </button>
    </div>
  </div>
</template>

<style></style>
