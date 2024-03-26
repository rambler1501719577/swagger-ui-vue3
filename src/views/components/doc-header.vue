<template>
    <div class="layout-header">
        <h2>接口文档</h2>
        <el-tag>{{ version }}</el-tag>
    </div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
// 版本
const version = swaggerService.getVersion()
</script>

<style lang="less" scoped>
.layout-header {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #71baff;
    box-sizing: border-box;
}
</style>
