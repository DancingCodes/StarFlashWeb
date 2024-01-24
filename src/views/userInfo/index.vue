<template>
    <div class="userInfo">
        <div class="user">
            <div class="left">
                <el-avatar :src="userData.userInfo.userPcture" class="userPcture" />
                <div class="info">
                    <div>{{ userData.userInfo.userName }}</div>
                    <div>{{ userData.userInfo.userAccount }}</div>
                </div>
            </div>
            <div class="button">
                <el-button @click="logoffUser">注销</el-button>
                <el-button @click="modifyUser">修改信息</el-button>
                <el-button @click="passwordModify">修改密码</el-button>
            </div>
        </div>
        <div class="title">信息通知</div>
        <div class="messageList">
            <el-scrollbar class="scrollbar">
                <div v-infinite-scroll="abc" :infinite-scroll-immediate="false" :infinite-scroll-distance="200">
                    <div class="message">
                        <div class="content">张三收藏了您的文章</div>
                        <div class="time">2022-12-27 10:00:00</div>
                    </div>
                    <div class="message">
                        <div class="content">张三收藏了您的文章</div>
                        <div class="time">2022-12-27 10:00:00</div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()

import { logoff } from '@/api/user'
import { useUserData } from '@/store/useUserData'
const userData = useUserData()
import { useLoginDialog } from '@/store/useLoginDialog'
const loginDialog = useLoginDialog()

const logoffUser = async () => {
    try {
        await logoff()
    } catch (error) {
        console.log(error)
    }
    userData.logOut()
    localStorage.removeItem('token');
    router.push('/')
}

const modifyUser = async () => {
    loginDialog.setDialogType('1')
    loginDialog.setDialogState(true)
}

const passwordModify = async () => {
    loginDialog.setDialogType('2')
    loginDialog.setDialogState(true)
}

const abc = () => {
    console.log(1)
}
</script>

<style lang="scss" scoped>
.userInfo {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    box-sizing: border-box;

    .user,
    .title,
    .scrollbar {
        padding: 0 20px;
    }

    .user {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;

            .userPcture {
                width: 54px;
                height: 54px;
            }

            .info {
                height: 54px;
                margin-left: 8px;
                font-size: 18px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }

    .title {
        font-size: 20px;
        margin-top: 8px;
    }

    .messageList {
        flex: 1;
        overflow: hidden;

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


    }
}
</style>