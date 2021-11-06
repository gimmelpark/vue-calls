<template>
  <div class="ml-5" style="width: 700px; min-height: 100%">
    <div v-if="results.length">
      <result-item
        v-for="(route, i) in results"
        :key="i"
        :route="route"
      ></result-item>
    </div>
    <v-pagination
      v-if="pagesCount > 1"
      :value="$store.state.page"
      :length="pagesCount"
      @input="$store.commit('setPage', $event)"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ResultItem from "./result-item";

export default {
  name: "results",
  components: {ResultItem},
  computed: {
    ...mapGetters({
      results: 'getResults',
      pagesCount: 'getPagesCount',
    })
  }
}
</script>
