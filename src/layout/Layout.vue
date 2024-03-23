<template>
    <div class="rambler-layout-container">
        <div class="sidebar">
            <side-bar></side-bar>
        </div>
        <div class="layout-content">
            <div class="header">
                <layout-header></layout-header>
            </div>
            <div class="app-content">
                <app-main></app-main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { AppMain, LayoutHeader, SideBar } from './components/'
</script>

<style scoped lang="less">
.rambler-layout-container {
    height: 100%;
    display: flex;
    .sidebar {
        width: 240px;
        height: 100%;
        background: rgb(186, 185, 185);
    }
    .layout-content {
        height: 100%;
        flex: 1;
        .header {
            height: 60px;
            background: #ddd;
        }
        .app-content {
            height: calc(100% - 60px);
        }
    }
}
</style>
