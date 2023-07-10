<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  methods: {
    ...mapMutations(['setStatus']),
  },
})
</script>

<template>
  <div class="start">
    <div class="wrapper wrapper_block">
      <h1>Тестирование</h1>
      <div class="content__wrapper">
        <p class="start__message">
          Осталось пройти небольшой тест, который покажет, как хорошо ты усвоил
          материал
        </p>
        <aside class="annotation start__annotation">
          <div>
            <span class="marker">-</span>
            Для успешного прохождения нужно правильно ответить минимум на 8
            вопросов из 10
          </div>
          <div>
            <span class="marker">-</span>На прохождение теста дается 3 попытки
          </div>
        </aside>
        <button class="start__button" @click="setStatus('answering')">
          Начать
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M17.9595 11.3738C17.569 10.9833 17.569 10.3501 17.9595 9.95958C18.35 9.56906 18.9832 9.56906 19.3737 9.95958L24.7071 15.2929C25.0976 15.6834 25.0976 16.3166 24.7071 16.7071L19.3737 22.0405C18.9832 22.431 18.35 22.431 17.9595 22.0405C17.569 21.6499 17.569 21.0168 17.9595 20.6262L21.5857 17H8.66663C8.11434 17 7.66663 16.5523 7.66663 16C7.66663 15.4477 8.11434 15 8.66663 15H21.5857L17.9595 11.3738Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
