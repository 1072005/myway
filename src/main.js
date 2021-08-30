import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



import { faEye } from '@fortawesome/free-regular-svg-icons'
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import {faFileAlt} from '@fortawesome/free-solid-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import {faSignal} from '@fortawesome/free-solid-svg-icons'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {faDollarSign} from '@fortawesome/free-solid-svg-icons'
import {faCopy} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import qs from 'qs'

import * as api from './store/api.js'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
library.add(faEye,faDownload,faFileAlt,faPen,faCloudUploadAlt,faTrash,faSignOutAlt,faFile,faSignal,faCheckCircle,faDollarSign,faCopy)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.use(VueAxios, axios);
Vue.prototype.$api = api
Vue.prototype.$qs = qs;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
