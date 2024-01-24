<template>
    <div class="user">
        <el-menu :default-active="`${defaultActive}`" class="menu" @select="selectMenu">
            <el-menu-item v-for="item in menuList" :index="`${item.index}`">
                {{ item.title }}
            </el-menu-item>
        </el-menu>
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in-linear">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()


const menuList = [{
    index: 0,
    title: '我的信息',
    routerPath: '/user/userInfo'
}, {
    index: 1,
    title: '我的文章',
    routerPath: '/user/userArticle'
}, {
    index: 2,
    title: '我的收藏',
    routerPath: '/user/userCollect'
}]

const defaultActive = menuList.find((item) => item.routerPath === route.path).index

const selectMenu = (index) => {
    router.push(menuList[index].routerPath)
}



</script>

<style lang="scss" scoped>
.user {
    height: 100%;
    display: flex;

    .menu {
        height: 100%;
    }

    .content {
        flex: 1;
    }
}
</style>