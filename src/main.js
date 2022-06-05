import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 導入 Vant
import '@/assets/reset.min.css'
import 'amfe-flexible'
import vant from './plugins/vant'

// 處理最大寬度
import { handleMaxWidth } from './assets/utils'
handleMaxWidth()
window.addEventListener('resize', handleMaxWidth)

const app = createApp(App)
app.use(vant)
app.use(router)
app.use(createPinia())
app.mount('#app')
