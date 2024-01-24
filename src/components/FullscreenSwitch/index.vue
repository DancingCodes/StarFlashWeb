<template>
    <el-icon size="16">
        <i-ep-Monitor v-show="!isFull" />
        <i-ep-CopyDocument v-show="isFull" />
    </el-icon>
</template>

<script setup lang="ts">
const props = defineProps({
    isFull: {
        type: Boolean,
        required: true,
    },
})
</script>

<style scoped lang="scss"></style>