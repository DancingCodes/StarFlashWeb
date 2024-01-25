import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRefetchUserCollectList = defineStore('useRefetchUserCollectList', () => {
    const shouldRefetchState = ref(false)

    const setShouldRefetchState = (state) => {
        shouldRefetchState.value = state
    }

    return { shouldRefetchState, setShouldRefetchState }
})