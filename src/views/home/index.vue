<template>
    <div class="home" v-if="articleList.list.length">
        <ArticleList :articleList="articleList.list" @addArticleList="addArticleList" class="ArticleList" />
        <div class="right">
            <a href="https://beian.miit.gov.cn/" target="_blank" class="filingsCodes">鲁ICP备2024059990号</a>
        </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
import ArticleList from "@/components/ArticleList/index.vue";
import { getArticleList } from '@/api/article'

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

import { useRefetchArticleList } from '@/store/useRefetchArticleList'
const refetchArticleList = useRefetchArticleList()
watch(() => refetchArticleList.shouldRefetchState, (newValue) => {
    if (newValue) {
        initArticleList()
        refetchArticleList.setShouldRefetchState(false)
    }
})

</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    position: relative;

    .ArticleList {
        padding: 20px 20% 0;
        box-sizing: border-box;
    }

    .right {
        position: absolute;
        right: 0;
        top: 0;
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        .filingsCodes {
            text-decoration: none;
        }
    }
}
</style>