import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRefetchArticleList = defineStore('useRefetchArticleList', () => {
    const shouldRefetchState = ref(false)

    const setShouldRefetchState = (state) => {
        shouldRefetchState.value = state
    }

    return { shouldRefetchState, setShouldRefetchState }
})