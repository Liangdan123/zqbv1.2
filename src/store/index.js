require('babel-polyfill')
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import storeMess from './modules/storeMess'
import commodity_state from './modules/commodity_state'
import mallSet from './modules/mallSet'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({paths:["user","storeMess","commodity_state"]})
export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules: {
		user,storeMess,commodity_state,mallSet
  },
  strict: debug,
  plugins: debug ? [createLogger(),persistedState] : [persistedState],
})
