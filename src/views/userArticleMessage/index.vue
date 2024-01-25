<template>
    <el-scrollbar class="scrollbar" v-if="articleMessageList.list.length">
        <div v-infinite-scroll="addArticleMessageList" :infinite-scroll-immediate="false" :infinite-scroll-distance="200">
            <div class="message" v-for="item in articleMessageList.list">
                <div class="content">{{ item.initiatorName }}{{ item.content }}:{{ item.articleContent }}</div>
                <div class="time">{{ item.createTime }}</div>
            </div>
        </div>
    </el-scrollbar>
    <Empty v-else />
</template>

<script setup>
import Empty from "@/components/Empty/index.vue";
import { getArticleMessage } from '@/api/user'
import { reactive } from "vue";

const initArticleMessageListData = {
    pageNo: 1,
    pageSize: 20,
    list: [],
    total: 0,
}

const articleMessageList = reactive({ ...initArticleMessageListData })

const setArticleMessageList = async () => {
    try {
        const res = await getArticleMessage({
            pageNo: articleMessageList.pageNo,
            pageSize: articleMessageList.pageSize,
        })
        articleMessageList.list = [...articleMessageList.list, ...res.data.list]
        articleMessageList.total = res.data.total
    } catch (error) {
        console.log(error)
    }
}
const initArticleMessageList = () => {
    Object.assign(articleMessageList, initArticleMessageListData)
    setArticleMessageList()
}
initArticleMessageList()

const addArticleMessageList = () => {
    if (articleMessageList.list.length !== articleMessageList.total) {
        articleMessageList.pageNo += 1
        setArticleMessageList()
    }
}

</script>

<style lang="scss" scoped>
.scrollbar {

    // 解决父级flex:1时，滚动条默认不显示的问题 
    :deep(.el-scrollbar__view) {
        height: 100%;
    }

    .message {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }
}
</style>