<script lang="ts">
import { mapMutations } from 'vuex'
import { defineComponent } from 'vue'

import Header from './components/blocks/Header.vue'
import Start from './components/slides/Start.vue'
import Questions from './components/slides/Questions.vue'
import Finished from './components/slides/Finished.vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Start,
    Questions,
    Finished,
  },
  methods: {
    ...mapMutations([
      'setStatus',
      'setScore',
      'setCurrent',
      'cleanScore',
      'setBestScoreAndAttemp',
    ]),
    ...mapActions(['fetchData']),
  },
  mounted() {
    this.fetchData()
    let localAttemps = localStorage.getItem('attemp')
    let localBestScore = localStorage.getItem('bestScore')
    if (localAttemps !== null && localBestScore !== null) {
      this.setBestScoreAndAttemp({
        attemp: Number(localAttemps),
        bestScore: Number(localBestScore),
      })
    } else {
      this.setBestScoreAndAttemp({
        attemp: 1,
        bestScore: 0,
      })
    }
  },
})
</script>

<template>
  <Header />
  <section class="content">
    <Start v-if="$store.state.status === 'start'" />

    <Questions v-if="$store.state.status === 'answering'" />

    <Finished v-if="$store.state.status === 'finished'" />

    <div class="lines content__lines">
      <span class="line line_thick line_red"></span>
      <span class="line line_thick line_green"></span>
    </div>
  </section>
</template>
