import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Content100 from '@/views/components/Content100'
import Card100 from '@/views/components/Card100'
import './styles/element-variables.scss'
import axios from 'axios'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$http = axios

Vue.component('content100', Content100)
Vue.component('card100', Card100)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
