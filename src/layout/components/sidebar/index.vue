<template>
    <div class="sidebar-container">
        <logo />
        <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="false"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar> -->
    </div>
</template>

<script setup>
import Logo from './Logo'
// import { useRoute } from 'vue-router'
// import Logo from './Logo'
// import SidebarItem from './SidebarItem'
// import { computed } from 'vue'
// const route = useRoute()
// const activeMenu = computed(() => {
//     const { meta, path } = route
//     // if set path, the sidebar will highlight the path you set
//     if (meta.activeMenu) {
//         return meta.activeMenu
//     }
//     return path
// })
// const isCollapse = true
</script>
<style lang="less" scoped>
.sidebar-container {
    width: 100%;
}
</style>
