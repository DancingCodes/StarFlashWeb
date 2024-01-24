<template>
    <el-button v-if="userData.loginState" @click="articleWrite" size="small" style="margin-right: 20px">发布文章</el-button>
    <el-dialog v-model="writeArticleDialog.dialogState" :title="title" width="50%" @open="openDialog"
        @close="closeDialog(formRef)">
        <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item label="文章内容" prop="articleContent">
                <el-input v-model="form.articleContent" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="writeArticleDialog.setDialogState(false)">
                    取消
                </el-button>
                <el-button @click="submitForm(formRef)">
                    <span v-if="writeArticleDialog.dialogType === '0'">发布</span>
                    <span v-if="writeArticleDialog.dialogType === '1'">修改</span>
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from "vue-router";
const route = useRoute()
import { writeArticle, getArticle, modifyArticle } from '@/api/article'

import { useWriteArticleDialog } from '@/store/useWriteArticleDialog'
const writeArticleDialog = useWriteArticleDialog()

import { useUserData } from '@/store/useUserData'
const userData = useUserData()

import { useRefetchArticleList } from '@/store/useRefetchArticleList'
const refetchArticleList = useRefetchArticleList()

import { useRefetchUserArticleList } from '@/store/useRefetchUserArticleList'
const refetchUserArticleList = useRefetchUserArticleList()

const articleWrite = () => {
    writeArticleDialog.setDialogType('0')
    writeArticleDialog.setDialogState(true)
}
const title = ref()
const formRef = ref()
const form = reactive({
    articleContent: '',
    // 用于修改
    articleId: null,
})
const rules = {
    articleContent: [
        { required: true, message: '请填写文章', trigger: 'change' },
        { min: 1, max: 9999, message: '用文章位数为1-9999', trigger: 'change' },
    ],
}

const openDialog = async () => {
    if (writeArticleDialog.dialogType === '0') {
        title.value = '发布文章'
    }
    if (writeArticleDialog.dialogType === '1') {
        title.value = '修改文章'
        try {
            const res = await getArticle({ articleId: writeArticleDialog.modifyArticleId })
            form.articleContent = res.data.articleContent
            form.articleId = res.data.articleId
        } catch (error) {
            console.log(error)
        }
    }
}

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            try {
                if (writeArticleDialog.dialogType === '0') {
                    await writeArticle(form)
                }
                if (writeArticleDialog.dialogType === '1') {
                    await modifyArticle(form)
                }
                writeArticleDialog.setDialogState(false)
                refetchList()
            } catch (error) {
                console.log(error)
            }
        }
    })
}

const closeDialog = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    // 重置store
    writeArticleDialog.setDialogType(null)
    writeArticleDialog.setModifyArticleId(null)


}

// 根据不同页面重取文章列表
const refetchList = () => {
    if (route.path === '/') {
        refetchArticleList.setShouldRefetchState(true)
    }
    if (route.path === '/user/userArticle') {
        refetchUserArticleList.setShouldRefetchState(true)
    }
}

</script>

<style lang="scss" scoped></style>