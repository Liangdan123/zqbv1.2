// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
Vue.use(VueAreaLinkage)

import App from './App'

import store from './store'
import router from './router'
import axios from './api/http'

import  "./assets/css/common.scss"
import "./assets/css/store.css"
import "./assets/css/commodity.scss"
import "./assets/css/order.css"

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/svg', true, /\.svg$/);
requireAll(req)


const requireComponent = require.context(
  './components/func',
  false,
  /[A-Za-z]\w+\.(vue|js)$/
)


requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
