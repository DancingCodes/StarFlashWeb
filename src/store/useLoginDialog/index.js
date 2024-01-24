import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLoginDialog = defineStore('useLoginDialog', () => {
    const dialogState = ref(false)
    // 0: 登录/注册 1: 修改用户信息 2: 修改用户密码
    const dialogType = ref()

    const setDialogState = (state) => {
        dialogState.value = state
    }
    const setDialogType = (state) => {
        dialogType.value = state
    }

    return { dialogState, dialogType, setDialogState, setDialogType }
})