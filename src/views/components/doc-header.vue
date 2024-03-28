<template>
    <div class="layout-header">
        <h2>接口文档</h2>
        <el-tag disable-transitions>{{ store.version }}</el-tag>
    </div>
</template>

<script setup>
import { useDocStore } from '@/store'
const store = useDocStore()
</script>

<style lang="less" scoped>
.layout-header {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: #032970;
    box-sizing: border-box;
    color: #fff;
    h2 {
        margin-right: 10px;
    }
}
</style>
