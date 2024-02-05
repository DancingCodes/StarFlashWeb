<template>
    <div class="Main">
        <div class="header">
            <el-image :src="star" class="icon" @click="goArticleList" />
            <div class="headerRight">
                <WriteArticle />
                <Login />
                <Setting />
            </div>
        </div>
        <div class="bodyer">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in-linear">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
import star from "@/assets/images/header/star.png"
import WriteArticle from '@/components/WriteArticle/index.vue'
import Login from '@/components/Login/index.vue'
import Setting from '@/components/Setting/index.vue'
import { useRouter } from "vue-router";
const router = useRouter()
const goArticleList = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.Main {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .header {
        padding: 16px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--el-border-color);

        .icon {
            height: 50px;
        }

        .headerRight {
            display: flex;
            align-items: center;
        }
    }

    .bodyer {
        flex: 1;
        overflow: hidden;
    }
}
</style>