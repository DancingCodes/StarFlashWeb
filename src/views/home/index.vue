<template>
    <div class="home" v-if="articleList.list.length">
        <ArticleList :articleList="articleList.list" @addArticleList="addArticleList" class="ArticleList" />
        <div class="right">
            <div class="filings">
                <a class="filingsCodes" href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2024059990号</a>
            </div>
            <div class="filings">
                <el-image :src="filings" class="icon" />
                <a class="filingsCodes" href="https://beian.mps.gov.cn/#/query/webSearch?code=37010202700167"
                    rel="noreferrer" target="_blank">鲁公网安备37010202700167</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch } from "vue";
import ArticleList from "@/components/ArticleList/index.vue";
import { getArticleList } from '@/api/article'

import { reactive } from "vue";

import filings from "@/assets/images/filings/filings.png"

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
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .filings {
            display: flex;
            align-items: center;

            .filingsCodes {
                text-decoration: none;
            }

            .icon {
                width: 14px;
            }
        }


    }

}
</style>