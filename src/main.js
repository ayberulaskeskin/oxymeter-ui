import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,//Navigation through screens
  store,//For state management - vuex
  vuetify, //UI Framework
  render: h => h(App)
}).$mount('#app')
