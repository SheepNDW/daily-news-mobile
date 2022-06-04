import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@/assets/reset.min.css'
import 'amfe-flexible'
import vant from './plugins/vant'

const app = createApp(App)
app.use(vant)
app.use(router)
app.use(createPinia())
app.mount('#app')
