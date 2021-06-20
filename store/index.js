// import Vue from 'vue'
// import Vuex from 'vuex'
// import { auth } from './auth/auth.js'
// import { cardInfo } from './cards/cards.js'
// import { loadout } from './loadout/loadout.js'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     auth,
//     cardInfo,
//     loadout,
//   },
// })

export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}
