<template>
    <div class="Article">
        <div class="header">
            <div class="ArticleAuthor">
                <el-avatar :src="article.userPcture" :size="30" class="userPcture" />
                <span class="userName">{{ article.userName }}</span>
            </div>
            <span class="ArticleTime">{{ article.createTime }}</span>
        </div>
        <div class="bodyer">
            <span class="articleContent">
                {{ article.articleContent }}
            </span>
        </div>
        <div class="footer">
            <el-image v-if="article.isCollect" :src="collected" class="icon" @click="articleCancelCollect(article)" />
            <el-image v-else :src="collect" class="icon" @click="articleCollect(article)" />
            <el-image v-if="removeShow" :src="remove" class="icon" @click="articleRemove(article)" />
            <el-image v-if="modifyShow" :src="modify" class="icon" @click="articleModify(article)" />
        </div>
    </div>
</template>

<script setup>
import { collectArticle, cancelCollectArticle } from '@/api/user'
import { removeArticle } from '@/api/article'
import collect from "@/assets/images/article/collect.png"
import collected from "@/assets/images/article/collected.png"
import remove from "@/assets/images/article/remove.png"
import modify from "@/assets/images/article/modify.png"


import { useWriteArticleDialog } from '@/store/useWriteArticleDialog'
const writeArticleDialog = useWriteArticleDialog()

import { useRefetchUserArticleList } from '@/store/useRefetchUserArticleList'
const refetchUserArticleList = useRefetchUserArticleList()

const prop = defineProps({
    article: {
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

const articleCollect = async (article) => {
    try {
        await collectArticle(article)
        article.isCollect = true
    } catch (error) {
        console.log(error)
    }
}
const articleCancelCollect = async (article) => {
    try {
        await cancelCollectArticle(article)
    } catch (error) {
        console.log(error)

    }
    article.isCollect = false
}

const articleRemove = async ({ articleId }) => {
    try {
        await removeArticle({ articleId })
        refetchUserArticleList.setShouldRefetchState(true)
    } catch (error) {
        console.log(error)
    }
}


const articleModify = async ({ articleId }) => {
    writeArticleDialog.setDialogType('1')
    writeArticleDialog.setModifyArticleId(articleId)
    writeArticleDialog.setDialogState(true)
}



</script>

<style lang="scss" scoped>
.Article {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .ArticleAuthor {
            display: flex;
            align-items: center;

            .userPcture {
                background-color: unset;
                margin-right: 4px;
            }

            .userName {
                font-size: 16px;
            }
        }

        .ArticleTime {
            font-size: 16px;
        }
    }

    .bodyer {
        font-size: 16px;
        line-height: 1.6;
    }

    .footer {
        display: flex;
        justify-content: flex-end;

        .icon {
            height: 24px;
            cursor: pointer;

        }

        .icon:not(:first-child) {
            margin-left: 4px;
        }
    }
}
</style>