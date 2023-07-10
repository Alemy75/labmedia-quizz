<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Answers } from '@/types'
import Utils from '../../utils'

export default defineComponent({
  props: {
    answers: {
      type: Array as PropType<Answers[]>, // Указываем тип PropType с массивом Answers
      required: true,
    },
  },
  methods: {
    setRatio(id: number) {
      this.$store.commit('setRatio', id) // Вызов мутации
    },
    checked(id: number) {
      if (this.$store.state.checkedId == id) {
        return true
      } else {
        return false
      }
    },
  },
  computed: {
    shuffleAnswers() {
      return Utils.shuffleArray(this.answers)
    },
  },
})
</script>

<template>
  <ul class="question__answers">
    <li v-for="item in shuffleAnswers" :key="item.id">
      <div class="control-group">
        <label class="control control-radio">
          {{ item.title }}
          <input
            type="radio"
            name="radio"
            @change="setRatio(item.id)"
            :checked="checked(item.id)"
          />
          <div class="control_indicator"></div>
        </label>
      </div>
    </li>
  </ul>
</template>
