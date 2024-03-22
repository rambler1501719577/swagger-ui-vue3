<template>
    <component :is="type" v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script setup>
const type = 'router-link'
const linkProps = () => {
    if (this.isExternal) {
        return {
            href: {},
            target: '_blank',
            rel: 'noopener'
        }
    }
    return {
        to: {}
    }
}
</script>

