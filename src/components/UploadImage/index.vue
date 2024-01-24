<template>
    <el-upload class="uploader" :action="`${apiUrl}/uploadFile/uploadImage`" :show-file-list="false"
        :on-success="uploadSuccess" @mouseenter.native="pasteInput.focus()">
        <img v-if="imageSrc" :src="imageSrc" class="avatar" />
        <el-icon v-else class="uploaderIcon">
            <i-ep-Plus />
        </el-icon>
        <input type="text" ref="pasteInput" @paste="getPasteValue" class="none">
    </el-upload>
</template>

<script setup>
const apiUrl = import.meta.env.VITE_APP_API_URL
const imageSrc = defineModel()
const uploadSuccess = (res) => {
    imageSrc.value = res.data.fileUrl
}

import { ref } from 'vue'
import { uploadImage } from '@/api/uploadFile'
const pasteInput = ref()
const getPasteValue = async (file) => {
    const formData = new FormData()
    formData.append('file', file.clipboardData.files[0])

    try {
        const res = await uploadImage(formData)
        uploadSuccess(res)
    } catch (error) {
        console.log(error)

    }
}

</script>

<style lang="scss" scoped>
$uploadWidthAndHeight: 60px;

.uploader {
    width: $uploadWidthAndHeight;
    height: $uploadWidthAndHeight;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    .avatar {
        width: $uploadWidthAndHeight;
        height: $uploadWidthAndHeight;
    }

    .uploaderIcon {
        width: $uploadWidthAndHeight;
        height: $uploadWidthAndHeight;
    }

    .none {
        width: 0;
        height: 0;
        padding: 0;
        border: 0;
    }
}
</style>