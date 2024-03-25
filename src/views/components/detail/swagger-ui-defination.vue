<template>
    <div class="swagger-ui-detail">{{ docDefination }}</div>
</template>

<script setup>
// import { inject } from 'vue'
// const currentService = inject('currentService')
// const currentDefination = inject('currentDefination')

import swaggerService from '@/utils/swagger'
import { inject, reactive, watch } from 'vue'
const currentService = inject('currentService')
const currentDefination = inject('currentDefination')
const services = swaggerService.getServices()

const docDefination = reactive({})

watch(
    currentDefination,
    (newVal, _) => {
        let doc = null
        const aimService = services.find(s => s.serviceUrl == currentService.value)
        const key = newVal.split('--')[1]
        docDefination.value = aimService.definations[key]
    },
    { immediate: true }
)
</script>

<style lang="less" scoped></style>
