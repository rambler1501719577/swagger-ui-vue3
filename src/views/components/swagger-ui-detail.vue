<template>
    <div class="swagger-ui-detail-container">
        <swagger-ui-api v-if="store.mode == 'api'"></swagger-ui-api>
        <swagger-ui-defination v-else></swagger-ui-defination>
    </div>
</template>

<script setup>
import swaggerUiApi from './detail/swagger-ui-api'
import swaggerUiDefination from './detail/swagger-ui-defination'
import { useDocStore } from '@/store'
const store = useDocStore()
</script>

<style lang="less" scoped>
.swagger-ui-detail-container {
    height: 100%;
}
</style>
