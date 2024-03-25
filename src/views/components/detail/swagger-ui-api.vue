<template>
    <div class="swagger-ui-detail">{{ currentReqUrl }}</div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
import { computed, inject, ref } from 'vue'
const currentService = inject('currentService')
const currentReqUrl = inject('currentReqUrl')
const services = swaggerService.getServices()
const apiDoc = computed(() => {
    const aimService = services.find(s => s.serviceUrl == currentService.value)
    console.log(aimService)
    if (aimService) {
        console.log(currentReqUrl)
        const path = currentReqUrl.value.split('--')
    }
    return aimService
})
console.log(apiDoc)
// console.log(currentService, currentReqUrl)
</script>

<style lang="less" scoped></style>
