<template>
    <span v-if="props.method == 'get'" class="type-primary">GET</span>
    <span v-else-if="props.method == 'post'" class="type-success">POST</span>
    <span v-else-if="props.method == 'put'" class="type-warning">PUT</span>
    <span v-else-if="props.method == 'delete'" class="type-danger">DEL</span>
    <span v-else-if="props.method == 'info'" class="type-info">OPTIONS</span>
    <span v-else>其他</span>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['method'])
</script>
<script>
export default {
    name: 'RequestMethod'
}
</script>

<style lang="less" scoped>
.type-primary {
    color: #409eff;
}
.type-success {
    color: #67c23a;
}
.type-warning {
    color: #e6a23c;
}
.type-danger {
    color: #f56c6c;
}
.type-info {
    color: #909399;
}
</style>
