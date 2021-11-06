import Vue from 'vue'
import Vuex from 'vuex'
import callPaths from '../data/call-paths.json'
import { calculate } from '../methods/calculate.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companiesData: [],
    countries: {},
    filters: {
      direct: true,
      oneAdditional: true,
      twoAdditional: true
    },
    src: undefined,
    des: undefined,
    results: [],
    page: 1,
    itemsPerPage: 4,
  },
  getters: {
    getFilters: (state) => state.filters,
    getSrcCountries: (state) => Object.entries(state.countries)
      .filter(el => el[0] !== state.des).map(el => ({text: el[1], value: el[0]})),
    getDesCountries: (state) => Object.entries(state.countries)
      .filter(el => el[0] !== state.src).map(el => ({text: el[1], value: el[0]})),
    getResults: (state) => state.results.slice((state.page - 1) * state.itemsPerPage, (state.page) * state.itemsPerPage),
    getPagesCount: (state) => Math.ceil(state.results.length / state.itemsPerPage)
  },
  mutations: {
    setFilters(state, filters) {
      state.filters = filters
    },
    setCompaniesData(state, data) {
      state.companiesData = data
    },
    setCountriesData(state, data) {
      state.countries = data
    },
    setSrc(state, data) {
      if (state.des === data) state.des = undefined
      state.src = data
    },
    setDes(state, data) {
      if (state.src === data) state.src = undefined
      state.des = data
    },
    setResults(state, results) {
      state.results = results
    },
    setPage(state, page) {
      state.page = page
    }
  },
  actions: {
    initData({commit}) {
      const companiesData = Object.entries(callPaths.data.company)
        .map(el => ({name: el[0], paths: el[1]}))
      commit('setCompaniesData', companiesData)
      commit('setCountriesData', callPaths.data.country)
    },
    startCalculate({state, commit}) {
      const results = calculate(state.src, state.des, state.companiesData, state.filters)
      commit('setPage', 1)
      commit('setResults', results)
    },
  },
})

