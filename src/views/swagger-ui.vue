<template>
    <div class="rambler-layout-container">
        <div class="sidebar">
            <aside-bar
                :service-change="handleServiceChange"
                :url-change="handleUrlChange"
                :define-change="handleDefineChange"
            ></aside-bar>
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
import swaggerService from '@/utils/swagger'
import { provide, ref, computed } from 'vue'
const services = swaggerService.getServices()

// 当前选择的微服务
let currentService = ref(services[0].serviceUrl)
// 当前访问的url
let currentReqUrl = ref('')
// 当前访问的实体定义
let currentDefination = ref('')
let mode = ref('api')

const hasDetail = computed(() => {
    return currentReqUrl.value !== '' || currentDefination.value !== ''
})

const handleServiceChange = val => (currentService.value = val)
const handleUrlChange = newUrl => {
    currentReqUrl.value = newUrl
    mode.value = 'api'
}
const handleDefineChange = newDefination => {
    currentDefination.value = newDefination
    mode.value = 'defination'
}
provide('currentService', currentService)
provide('currentReqUrl', currentReqUrl)
provide('currentDefination', currentDefination)
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
