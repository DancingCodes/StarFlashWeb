import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
    },
    {
        path: "/user",
        redirect: '/user/userInfo',
        name: "user",
        component: () => import("@/views/user/index.vue"),
        children: [{
            path: 'userInfo',
            component: () => import("@/views/userInfo/index.vue"),
        }, {
            path: 'userArticle',
            component: () => import("@/views/userArticle/index.vue"),
        }, {
            path: 'userCollect',
            component: () => import("@/views/userCollect/index.vue"),
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;