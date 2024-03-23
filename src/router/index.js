import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

import loadAllSwaggerDoc from '@/api/modules/swagger-ui'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layout'),
            children: [
                {
                    path: 'example',
                    component: HelloWorld
                }
            ]
        }
    ]
})

router.beforeEach(async () => {
    try {
        const doc = await loadAllSwaggerDoc()
        localStorage.setItem('doc', JSON.stringify(doc))
    } catch (e) {
        localStorage.removeItem('doc')
    }
    return true
})

export default router
