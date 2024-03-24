<template>
    <el-tag v-if="props.method == 'get'" type="primary">GET</el-tag>
    <el-tag v-else-if="props.method == 'post'" type="success">POST</el-tag>
    <el-tag v-else-if="props.method == 'put'" type="warning">PUT</el-tag>
    <el-tag v-else-if="props.method == 'delete'" type="danger">DEL</el-tag>
    <el-tag v-else-if="props.method == 'info'">OPTIONS</el-tag>
    <el-tag v-else>其他</el-tag>
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

<style lang="less" scoped></style>
