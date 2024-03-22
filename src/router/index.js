import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
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

export default router
