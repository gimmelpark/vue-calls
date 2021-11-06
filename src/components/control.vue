<template>
  <div class="mr-5" style="width: 350px;">
    <v-card>
      <v-card-title>
        <h4 class="grey--text text--darken-2">Укажите параметры звонка</h4>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-select
          :items="srcCountries"
          :value="$store.state.src"
          @change="$store.commit('setSrc', $event)"
          clearable
          label="Звонящая сторона"
        ></v-select>
        <v-select
          :items="desCountries"
          :value="$store.state.des"
          @change="$store.commit('setDes', $event)"
          clearable
          label="Принимающая сторона"
        ></v-select>
        <div class="ml-3">
          <v-checkbox
            label="Все"
            color="blue"
            :input-value="allFiltersSelected"
            @change="selectAllFilters($event)"
          ></v-checkbox>
          <v-checkbox
            label="Прямое соединение"
            color="blue"
            :input-value="filters.direct"
            @change="$store.commit('setFilters', {...filters, direct: $event})"
          ></v-checkbox>
          <v-checkbox
            label="Один дополнтельный узел"
            color="blue"
            :input-value="filters.oneAdditional"
            @change="$store.commit('setFilters', {...filters, oneAdditional: $event})"
          ></v-checkbox>
          <v-checkbox
            label="Два дополнительных узла"
            color="blue"
            :input-value="filters.twoAdditional"
            @change="$store.commit('setFilters', {...filters, twoAdditional: $event})"
          ></v-checkbox>
        </div>
        <v-btn
          color="primary"
          @click="onCalculateClick"
          :disabled="!$store.state.src || !$store.state.des || !isParamsChanged"
        >Посчитать</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "control",
  data: () => ({
    lastFiltersValue: {},
    lastSrc: undefined,
    lastDes: undefined
  }),
  mounted() {
  },
  computed: {
    ...mapGetters({
      filters: 'getFilters',
      srcCountries: 'getSrcCountries',
      desCountries: 'getDesCountries',
    }),
    allFiltersSelected () {
      return this.filters.direct && this.filters.oneAdditional && this.filters.twoAdditional
    },
    isParamsChanged () {
      return (this.lastSrc !== this.$store.state.src ||
        this.lastDes !== this.$store.state.des ||
        JSON.stringify(this.lastFiltersValue) !== JSON.stringify(this.filters))
    }
  },
  methods: {
    onCalculateClick() {
      this.lastFiltersValue = {...this.filters}
      this.lastSrc = this.$store.state.src
      this.lastDes = this.$store.state.des
      this.$store.dispatch('startCalculate')
    },
    selectAllFilters(e) {
      this.$store.commit('setFilters', {direct: e, oneAdditional: e, twoAdditional: e})
    }
  }
}
</script>