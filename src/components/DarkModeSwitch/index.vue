<template>
    <el-icon size="20">
        <i-ep-Moon v-show="!isDark" />
        <i-ep-Sunny v-show="isDark" />
    </el-icon>
</template>

<script setup>
const props = defineProps({
    isDark: {
        type: Boolean,
        required: true,
    },
})
</script>

<style scoped lang="scss"></style>