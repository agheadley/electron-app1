import Vue from 'vue'
import router from './router'
import App from './App'

import vuetify from './plugins/vuetify' // path to vuetify export

const serverURL='http://localhost:3000/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
})







