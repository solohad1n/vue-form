import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueTheMask from 'vue-the-mask'

createApp(App).use(VueTheMask).use(store).use(router).mount('#app');

import 'bootstrap/dist/js/bootstrap.js'