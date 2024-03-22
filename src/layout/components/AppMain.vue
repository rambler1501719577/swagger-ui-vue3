<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="routerKey" />
        </transition>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routerKey = computed(() => {
    return route.path
})
</script>

<style scoped>
.app-main {
    height: 100%;
    overflow: hidden;
    flex: 1;
}
</style>

