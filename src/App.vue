<template>
    <swagger-ui></swagger-ui>
</template>

<script>
import { useDocStore } from './store'
import loadAllSwaggerDoc from '@/api/modules/swagger-ui'
import swaggerUi from './views/swagger-ui.vue'
export default {
    setup() {
        const docStore = useDocStore()
        loadAllSwaggerDoc()
            .then(doc => {
                docStore.toggleData(doc)
                const { services } = doc
                if (services.length > 0) {
                    docStore.setCurrentService(services[0].serviceUrl)
                }
            })
            .catch(e => {
                console.log(e)
            })
    },
    beforeCreate() {},
    components: {
        swaggerUi
    }
}
</script>
