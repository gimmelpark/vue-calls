<template>
  <div id="app">
    <v-app>
      <div class="pt-10 d-flex justify-center align-items-stretch">
        <control></control>
        <results></results>
      </div>
    </v-app>
  </div>
</template>

<script>

import Control from "./components/control";
import Results from "./components/results";
export default {
  name: 'App',
  components: {
    Results,
    Control
  },
  created() {
    this.$store.dispatch('initData')
  }
}
</script>

<style>
</style>
