<template>
    <ArticleList :articleList="articleList.list" @addArticleList="addArticleList" class="userCollect" />
</template>

<script setup>
import { getCollectArticleList } from '@/api/user'
import { reactive } from "vue";

const initArticleListData = {
    pageNo: 1,
    pageSize: 10,
    list: [],
    total: 0,
}

const articleList = reactive({ ...initArticleListData })

const setArticleList = async () => {
    try {
        const res = await getCollectArticleList({
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

</script>

<style lang="scss" scoped>
.userCollect {
    padding-top: 20px;
    box-sizing: border-box;
}
</style>