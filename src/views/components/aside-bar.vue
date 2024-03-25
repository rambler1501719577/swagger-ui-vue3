<template>
    <div class="sidebar-container">
        <div class="sidebar-logo-container">
            <h1>
                微服务接口列表, <span>版本:{{ version }}</span>
            </h1>
        </div>
        <div class="sidebar-services-container">
            <div class="servivce-choose">
                <el-select
                    v-model="currentService"
                    placeholder="选择微服务"
                    @change="handleServiceChange"
                >
                    <el-option
                        v-for="service in services"
                        :key="service.serviceUrl"
                        :label="service.serviceUrl"
                        :value="service.serviceUrl"
                    />
                </el-select>
            </div>
            <div class="service-api-list">
                <el-menu default-active="1" unique-opened @select="handleMenuSelect">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><Location /></el-icon>
                            <span>实体定义</span>
                        </template>
                        <!-- 通过route开启路由模式, 实体路由匹配方式为/defination/{实体名称} -->
                        <el-menu-item
                            :index="'defination--' + defination"
                            :key="defination"
                            v-for="defination of Object.keys(currentServiceInfo.definations)"
                            >{{ defination }}</el-menu-item
                        >
                    </el-sub-menu>
                    <el-sub-menu
                        :index="tag.name"
                        :key="tag.name"
                        v-for="tag of currentServiceInfo.tags"
                    >
                        <template #title>
                            <el-icon><Location /></el-icon>
                            <span>{{ tag.name }}</span>
                        </template>
                        <!-- 通过route开启路由模式, api路由匹配方式为/{tag}/{method}/{url} -->
                        <el-menu-item
                            :index="tag.name + '--' + detail.method + '--' + encodeURI(detail.url)"
                            :key="detail.url + detail.method"
                            v-for="detail of tag.urls"
                        >
                            <template #title>
                                <request-method :method="detail.method"></request-method>
                                {{ detail.url }}
                            </template>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </div>
    </div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
import { Location } from '@element-plus/icons-vue'
import { inject, computed, defineProps } from 'vue'
const currentService = inject('currentService')
const eventHandler = defineProps(['service-change', 'url-change', 'define-change'])

// 版本
const version = swaggerService.getVersion()
const services = swaggerService.getServices()

// // 文档详情
let currentServiceInfo = computed(() => {
    return services.find(v => v.serviceUrl == currentService.value)
})

// 版本切换后更新到父组件currentService
const handleServiceChange = val => {
    eventHandler.serviceChange(val)
}

const handleMenuSelect = index => {
    if (index.startsWith('defination')) {
        eventHandler.defineChange(index)
    } else {
        eventHandler.urlChange(index)
    }
}
</script>
<style lang="less" scoped>
.sidebar-container {
    width: 100%;
    height: 100%;
    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #fff;
        overflow: hidden;
    }
    .sidebar-services-container {
        width: 100%;
        height: calc(100% - 60px);
        background: #ddd;
        .servivce-choose {
            padding: 10px;
            box-sizing: border-box;
        }
    }
}
</style>
