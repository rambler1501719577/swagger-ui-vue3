<template>
    <div class="rambler-layout-container">
        <div class="layout-header-container">
            <layout-header></layout-header>
        </div>
        <div class="layout-main-content">
            <side-bar></side-bar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script setup>
import { AppMain, LayoutHeader, SideBar } from './components/'
</script>

<style scoped lang="less">
.rambler-layout-container {
    height: 100%;
    .layout-header-container {
        box-sizing: border-box;
        height: 60px;
        background: #eee;
    }
    .layout-main-content {
        height: calc(100% - 60px);
        box-sizing: border-box;
        display: flex;
        .sidebar {
            width: 240px;
            height: 100%;
            background: rgb(186, 185, 185);
        }
    }
}
</style>
