import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/reset.css'
import '@/styles/global.less'
import '@/styles/variable.less'

import RequestMethod from '@/components/request-method'
import EventBus from '@/event/event-bus'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(RequestMethod)
app.use(EventBus)

app.mount('#app')
