<template>
    <ArticleList :articleList="articleList.list" modifyShow removeShow @addArticleList="addArticleList"
        class="userArticle" />
</template>

<script setup>
import { getArticleList } from '@/api/user'
import { reactive, watch } from "vue";


const initArticleListData = {
    pageNo: 1,
    pageSize: 10,
    list: [],
    total: 0,
}

const articleList = reactive({ ...initArticleListData })

const setArticleList = async () => {
    try {
        const res = await getArticleList({
            pageNo: articleList.pageNo,
            pageSize: articleList.pageSize,
        })
        articleList.list = [...articleList.list, ...res.data.list]
        articleList.total = res.data.total
    } catch (error) {
        console.log(error)
    }
}
const initArticleList = () => {
    Object.assign(articleList, initArticleListData)
    setArticleList()
}
initArticleList()

const addArticleList = () => {
    if (articleList.list.length !== articleList.total) {
        articleList.pageNo += 1
        setArticleList()
    }
}


import { useRefetchUserArticleList } from '@/store/useRefetchUserArticleList'
const refetchArticleList = useRefetchUserArticleList()
watch(() => refetchArticleList.shouldRefetchState, (newValue) => {
    if (newValue) {
        initArticleList()
        refetchArticleList.setShouldRefetchState(false)
    }
})

</script>

<style lang="scss" scoped>
.userArticle {
    padding-top: 20px;
    box-sizing: border-box;
}
</style>