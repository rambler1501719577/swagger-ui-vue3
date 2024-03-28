import { createRouter, createWebHashHistory } from 'vue-router'
import loadAllSwaggerDoc from '@/api/modules/swagger-ui'
import { useDocStore } from '../store'
// const docStore = useDocStore()
// docStore.registeService()

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/swagger-ui')
        }
    ]
})

router.beforeEach(async () => {
    try {
        const doc = await loadAllSwaggerDoc()
        // docStore.toggleData()
        localStorage.setItem('doc', JSON.stringify(doc))
    } catch (e) {
        localStorage.removeItem('doc')
    }
    return true
})

export default router
