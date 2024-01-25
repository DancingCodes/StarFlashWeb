<template>
    <div v-if="userData.loginState" class="Login" @click="goUserInfo">
        <el-avatar :src="userData.userInfo.userPcture" :size="30" class="userPcture" />
        <span class="userName">{{ userData.userInfo.userName }}</span>
    </div>
    <div v-else class="notLoggedIn" @click="goLogin">
        未登录
    </div>
    <el-dialog v-model="loginDialog.dialogState" width="500px" @open="openDialog" @close="closeDialog">
        <template #header>
            <div class="header">
                <div class="headerTop">
                    <template v-if="loginDialog.dialogType === '0'">
                        <div class="loginBotton" @click="changeIsLogin(true)">登录</div>
                        <div class="slash">/</div>
                        <div class="loginBotton" @click="changeIsLogin(false)">注册</div>
                    </template>
                    <template v-if="loginDialog.dialogType === '1'">
                        修改信息
                    </template>
                    <template v-if="loginDialog.dialogType === '2'">
                        修改密码
                    </template>
                </div>
                <div class="underline" :class="[isLogin ? 'left' : 'right']"></div>
            </div>
        </template>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
            <el-form-item v-if="!isLogin || loginDialog.dialogType === '1'" label="头像" prop="userPcture">
                <UploadImage v-model="form.userPcture" />
            </el-form-item>
            <el-form-item v-if="!isLogin || loginDialog.dialogType === '1'" label="用户名" prop="userName">
                <el-input v-model="form.userName" clearable />
            </el-form-item>
            <el-form-item v-if="loginDialog.dialogType === '0' || loginDialog.dialogType === '2'" label="账号"
                prop="userAccount">
                <el-input v-model="form.userAccount" :disabled="loginDialog.dialogType === '2'" clearable
                    @keyup.enter="submitForm(formRef)" />
            </el-form-item>
            <el-form-item v-if="loginDialog.dialogType === '0' || loginDialog.dialogType === '2'" label="密码"
                prop="userPassword">
                <el-input v-model="form.userPassword" type="password" show-password clearable
                    @keyup.enter="submitForm(formRef)" />
            </el-form-item>
            <el-form-item v-if="loginDialog.dialogType === '2'" label="新密码" prop="newUserPassword">
                <el-input v-model="form.newUserPassword" type="password" show-password clearable
                    @keyup.enter="submitForm(formRef)" />
            </el-form-item>
            <el-form-item class="submitBotton">
                <el-button @click="loginDialog.setDialogState(false)">
                    取消
                </el-button>
                <el-button @click="submitForm(formRef)">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()


import { useUserData } from '@/store/useUserData'
const userData = useUserData()


import { useLoginDialog } from '@/store/useLoginDialog'
const loginDialog = useLoginDialog()


import { useRefetchArticleList } from '@/store/useRefetchArticleList'
const refetchArticleList = useRefetchArticleList()

import { reactive, ref } from 'vue'
import { signUp, login, info, modifyInfo, modifyPassword } from '@/api/user'
import UploadImage from '@/components/UploadImage/index.vue'


const goUserInfo = () => {
    router.push('/user')
}

const openDialog = async () => {
    if (loginDialog.dialogType === '1' || loginDialog.dialogType === '2') {
        Object.assign(form, userData.userInfo)
    }
}

const isLogin = ref(true)
const changeIsLogin = (state) => {
    isLogin.value = state
    resetForm()
}

const formRef = ref()

const initFormData = {
    userPcture: '',
    userName: '',
    userAccount: '',
    userPassword: '',
    // 修改密码使用
    newUserPassword: '',
}
const form = reactive({ ...initFormData })

const rules = {
    userPcture: [
        { required: true, message: '请选择头像', trigger: 'blur' },
    ],
    userName: [
        { required: true, message: '请填写用户名', trigger: 'change' },
        { min: 1, max: 10, message: '用户名位数为1-10', trigger: 'change' },
    ],
    userAccount: [
        { required: true, message: '请填写账号', trigger: 'change' },
        { min: 1, max: 32, message: '账号位数为1-32', trigger: 'change' },
    ],
    userPassword: [
        { required: true, message: '请填写密码', trigger: 'change' },
        { min: 1, max: 32, message: '密码位数为1-32', trigger: 'change' },
    ],
    newUserPassword: [
        { required: true, message: '请填写新密码', trigger: 'change' },
        { min: 1, max: 32, message: '密码位数为1-32', trigger: 'change' },
    ],
}

const goLogin = () => {
    loginDialog.setDialogType('0')
    loginDialog.setDialogState(true)
}

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            try {
                // 登录/注册
                if (loginDialog.dialogType === '0') {
                    let res = null
                    if (isLogin.value) {
                        // 登录
                        res = await login(form)
                    } else {
                        // 注册
                        res = await signUp(form)
                    }
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                }
                // 修改
                if (loginDialog.dialogType === '1') {
                    await modifyInfo(form)
                }
                // 修改密码
                if (loginDialog.dialogType === '2') {
                    await modifyPassword(form)
                }
                getUserInfo()
                loginDialog.setDialogState(false)

                if (loginDialog.dialogType === '0') {
                    refetchArticleList.setShouldRefetchState(true)
                }

            } catch (error) {
                console.log(error)
            }
        }
    })
}

const resetForm = () => {
    Object.assign(form, initFormData)
}

const closeDialog = () => {
    resetForm()

    // 重置状态
    isLogin.value = true
    loginDialog.setDialogType(null)
}

const getUserInfo = async () => {
    try {
        const infoRes = await info()
        userData.setUserInfo(infoRes.data)
        userData.setLoginState(true)
    } catch (error) {
        console.log(error)
    }
}
getUserInfo()


</script>

<style lang="scss" scoped>
.Login {
    display: flex;
    align-items: center;
    cursor: pointer;

    .userPcture {
        margin-right: 4px;
    }

    .userName {
        font-size: 16px;
    }
}

.notLoggedIn {
    cursor: pointer;
}

.header {
    position: relative;
    display: inline-block;
    $bottonWidth: 32px;
    $underlineWidth: 30px;


    .headerTop {
        display: flex;

        .loginBotton {
            width: $bottonWidth;
            text-align: center;
            cursor: pointer;
        }

        .slash {
            width: 14px;
            text-align: center;
        }
    }

    .underline {
        width: $underlineWidth;
        height: 1px;
        background-color: #000000;
        position: absolute;
        transition: left 0.4s;
    }

    .left {
        left: calc(($bottonWidth - $underlineWidth)/2);
    }

    .right {
        left: calc(100% - $bottonWidth + ($bottonWidth - $underlineWidth)/2);
    }


}

:deep(.submitBotton) {
    margin-bottom: unset;

    .el-form-item__content {
        justify-content: flex-end;
    }
}
</style>