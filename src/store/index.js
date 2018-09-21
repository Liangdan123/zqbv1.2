require('babel-polyfill')
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import platform from './modules/platform'
import servicer from './modules/servicer'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({paths:["user","storeMess","servicer"]})
export default new Vuex.Store({
  modules: {
		user,platform,servicer
  },
  strict: debug,
  plugins: debug ? [createLogger(),persistedState] : [persistedState],
})
