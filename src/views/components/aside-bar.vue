<template>
    <div class="sidebar-container">
        <div class="sidebar-services-container">
            <div class="servivce-choose">
                <el-select
                    v-model="store.currentService"
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
                <el-menu
                    default-active="1"
                    unique-opened
                    @select="handleMenuSelect"
                    background-color="#fff0"
                    text-color="#fff"
                    active-text-color="#0073FF"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><Location /></el-icon>
                            <span>实体定义</span>
                        </template>
                        <!-- 通过route开启路由模式, 实体路由匹配方式为/defination/{实体名称} -->
                        <el-menu-item
                            :index="'defination--' + defination"
                            :key="defination"
                            v-for="defination of store.definations"
                            >{{ defination }}</el-menu-item
                        >
                    </el-sub-menu>
                    <el-sub-menu :index="tag.name" :key="tag.name" v-for="tag of store.tags">
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
import { useDocStore } from '@/store'
import { Location } from '@element-plus/icons-vue'
const store = useDocStore()

const handleMenuSelect = index => {
    // if (index.startsWith('defination')) {
    //     eventHandler.defineChange(index)
    // } else {
    //     eventHandler.urlChange(index)
    // }
}
</script>
<style lang="less" scoped>
.sidebar-container {
    width: 100%;
    height: 100%;
    background: url('../../assets/left_nav_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: bottom;
    overflow: hidden;
    .sidebar-services-container {
        width: 100%;
        height: 100%;
        .servivce-choose {
            padding: 10px;
            box-sizing: border-box;
        }
    }
}
</style>
