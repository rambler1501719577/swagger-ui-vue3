<template>
    <div class="rambler-layout-container">
        <div class="sidebar">
            <aside-bar></aside-bar>
        </div>
        <div class="layout-content">
            <div class="header">
                <doc-header></doc-header>
            </div>
            <div class="app-content">
                <swagger-ui-detail v-if="hasDetail" :mode="mode"></swagger-ui-detail>
                <span v-else>空</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DocHeader, AsideBar, SwaggerUiDetail } from './components'
import { computed } from 'vue'
import { useDocStore } from '@/store'
const store = useDocStore()

const hasDetail = computed(() => {
    return store.currentReqUrl == '' || store.currentDefination == ''
})
</script>

<style scoped lang="less">
@import url('./swagger-ui.less');
.rambler-layout-container {
    height: 100%;
    display: flex;
    .sidebar {
        width: 260px;
        height: 100%;
        background: rgb(186, 185, 185);
    }
    .layout-content {
        height: 100%;
        flex: 1;
        .header {
            height: 52px;
        }
        .app-content {
            height: calc(100% - 60px);
        }
    }
}
</style>
