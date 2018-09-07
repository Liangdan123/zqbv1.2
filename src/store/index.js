require('babel-polyfill')
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import commodity_state from './modules/commodity_state'
import platform from './modules/platform'
import servicer from './modules/servicer'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({paths:["user","storeMess","commodity_state"]})
export default new Vuex.Store({
  modules: {
		user,commodity_state,platform,servicer
  },
  strict: debug,
  plugins: debug ? [createLogger(),persistedState] : [persistedState],
})
