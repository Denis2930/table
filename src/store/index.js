import { createStore } from 'vuex'
import { storeCounter } from './storeCounter'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    enterprise: storeCounter,
  }
})
