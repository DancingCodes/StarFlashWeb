import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserData = defineStore('useUserData', () => {
    const loginState = ref(false)
    const userInfo = ref({})

    const setLoginState = (state) => {
        loginState.value = state
    }

    const setUserInfo = (info) => {
        userInfo.value = info
    }

    const logOut = () => {
        loginState.value = false
        userInfo.value = {}
    }

    return { loginState, userInfo, setLoginState, setUserInfo, logOut }
})