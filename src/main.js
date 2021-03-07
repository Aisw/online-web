import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "@/router/index";
import global from '@/common/Global.js'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
Vue.prototype.$bu = new Vue()

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
