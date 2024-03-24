<template>
    <div class="sidebar-logo-container">
        <h1>
            微服务接口列表, <span>版本:{{ version }}</span>
        </h1>
    </div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
const version = swaggerService.getVersion()
</script>

<style lang="less" scoped>
.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #fff;
    overflow: hidden;
}
</style>
