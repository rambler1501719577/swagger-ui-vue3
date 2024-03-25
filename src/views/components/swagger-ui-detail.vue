<template>
    <div class="swagger-ui-detail-container">
        <swagger-ui-api v-if="props.mode == 'api'"></swagger-ui-api>
        <swagger-ui-defination v-else></swagger-ui-defination>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import SwaggerUiApi from './detail/swagger-ui-api'
import SwaggerUiDefination from './detail/swagger-ui-defination'
const props = defineProps(['mode'])
</script>

<style lang="less" scoped>
.swagger-ui-detail-container {
    height: 100%;
}
</style>
