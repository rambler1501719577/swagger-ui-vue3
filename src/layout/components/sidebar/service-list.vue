<template>
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
            <el-menu default-active="1" unique-opened>
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><Location /></el-icon>
                        <span>实体定义</span>
                    </template>
                    <el-menu-item
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
                    <el-menu-item :key="detail.url + detail.method" v-for="detail of tag.urls">
                        <template #title>
                            <request-method :method="detail.method"></request-method>
                            {{ detail.url }}
                        </template>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>

<script setup>
import { Location } from '@element-plus/icons-vue'

import swaggerService from '@/utils/swagger'
import { ref } from 'vue'
const services = swaggerService.getServices()
let currentService = ref(services[0].serviceUrl)
let currentServiceInfo = ref(services[0])

const handleServiceChange = val => {
    currentServiceInfo.value = services.find(v => v.serviceUrl == val)
}
</script>

<style lang="less" scoped>
.sidebar-services-container {
    width: 100%;
    height: calc(100% - 60px);
    background: #ddd;
    .servivce-choose {
        padding: 10px;
        box-sizing: border-box;
    }
}
</style>
