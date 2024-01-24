import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useWriteArticleDialog = defineStore('useWriteArticleDialog', () => {
    const dialogState = ref(false)
    // 0: 新增 1:修改
    const dialogType = ref()
    const modifyArticleId = ref()

    const setDialogState = (state) => {
        dialogState.value = state
    }

    const setDialogType = (state) => {
        dialogType.value = state
    }

    const setModifyArticleId = (id) => {
        modifyArticleId.value = id
    }

    return { dialogState, dialogType, modifyArticleId, setDialogState, setDialogType, setModifyArticleId }
})