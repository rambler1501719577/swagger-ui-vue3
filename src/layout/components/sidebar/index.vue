<template>
    <div class="sidebar-container">
        <logo />
        <service-list></service-list>
    </div>
</template>

<script setup>
import Logo from './logo'
import ServiceList from './service-list'
</script>
<style lang="less" scoped>
.sidebar-container {
    width: 100%;
    height: 100%;
}
</style>
