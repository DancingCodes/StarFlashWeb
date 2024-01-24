import { createApp } from 'vue'

// 初始化CSS
import 'normalize.css/normalize.css'

// Element Plus Css
import 'element-plus/dist/index.css'

// Element Plus暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

// 加载暗黑模式过渡效果
import '@/utils/initDarkTransition'

// 进度条
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
nProgress.configure({
    // 关闭转转转
    showSpinner: false
})

// 字体CSS
import '@/assets/css/font.css'

// 引入VueRouter
import router from '@/router'

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Pinia持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate);

import App from './App.vue'

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
