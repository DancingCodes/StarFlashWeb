<template>
    <el-dropdown trigger="click">
        <el-icon size="20" class="settingIcon">
            <i-ep-Setting />
        </el-icon>
        <template #dropdown>
            <el-dropdown-menu class="dropdownMenu">
                <el-dropdown-item @click="toggleDarkMode()">
                    <div class="title">
                        <span v-if="isDark">明亮模式</span>
                        <span v-else>暗黑模式</span>
                    </div>
                    <div class="button">
                        <DarkModeSwitch :isDark="isDark" />
                    </div>
                </el-dropdown-item>
                <el-dropdown-item @click="toggleFull()">
                    <div class="title">
                        <span v-if="isFull">普通模式</span>
                        <span v-else>大屏模式</span>
                    </div>
                    <div class="button">
                        <FullscreenSwitch :isFull="isFull" />
                    </div>
                </el-dropdown-item>
                <el-dropdown-item v-if="userData.loginState" @click="logOutUser">
                    <div class="title">
                        账号退出
                    </div>
                    <div class="button">
                        <el-icon size="16">
                            <i-ep-SwitchButton />
                        </el-icon>
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
import DarkModeSwitch from '@/components/DarkModeSwitch/index.vue'
import FullscreenSwitch from '@/components/FullscreenSwitch/index.vue'

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
import changeDarkMode from '@/utils/changeDarkMode'

import { useUserData } from '@/store/useUserData'
const userData = useUserData()

const toggleDarkMode = () => {
    toggleDark()
    changeDarkMode(isDark.value)
}

import { useFullscreen } from '@vueuse/core'
const { toggle } = useFullscreen();
const isFull = ref(false)

const toggleFull = () => {
    if (document.fullscreenElement) {
        isFull.value = false
    } else {
        isFull.value = true
    }
    toggle()
}

const logOutUser = () => {
    userData.logOut()
    localStorage.removeItem('token');
    router.push('/')
}

</script>

<style lang="scss" scoped>
.settingIcon {
    margin-left: 10px;
}

.dropdownMenu {
    :deep(.el-dropdown-menu__item) {
        background-color: unset !important;
    }

    .button {
        i {
            margin-right: unset;
        }
    }

    .title {
        width: 60px;
        text-align: center;
    }

    .button {
        width: 30px;
        display: flex;
        justify-content: center;
    }
}
</style>