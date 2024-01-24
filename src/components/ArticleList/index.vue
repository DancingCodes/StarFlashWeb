<template>
    <transition name="el-fade-in-linear">
        <el-scrollbar class="scrollbar" v-if="articleList.length">
            <div class="articleList" v-infinite-scroll="infiniteCcroll" :infinite-scroll-immediate="false"
                :infinite-scroll-distance="100">
                <Article v-for="item in articleList" :article="item" :removeShow="removeShow" :modifyShow="removeShow"
                    class="Article" />
            </div>
        </el-scrollbar>
        <Empty v-else />
    </transition>
</template>

<script setup>
import Article from "@/components/Article/index.vue";
import Empty from "@/components/Empty/index.vue";


const prop = defineProps({
    articleList: {
        required: true,
    },
    removeShow: {
        type: Boolean,
        default: false
    },
    modifyShow: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['addArticleList'])
const infiniteCcroll = () => {
    emits('addArticleList')
}
</script>

<style lang="scss" scoped>
.scrollbar {

    // 解决父级flex:1时，滚动条默认不显示的问题 
    :deep(.el-scrollbar__view) {
        height: 100%;
    }

    .articleList {
        padding: 0 20px;
        margin: 0 auto;

        .Article {
            padding: 16px 0;
        }

        .Article:first-child {
            padding-top: 0;
        }

        .Article:last-child {
            padding-bottom: 0;
        }
    }
}
</style>