<template>
    <div class="DarkModeSwitch" @click.stop="switchMode" :class="[isDark ? 'rightStyle' : 'leftStyle']">
        <div class="switchBotton" :class="[isDark ? 'right' : 'left']">
            <div class="round" :class="[isDark ? 'openRound' : 'closeRound']"></div>
        </div>
    </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

const darkBgc = '#141414'
const lightBgc = '#ffffff'


const htmlEl = document.documentElement
htmlEl.style.transition = 'all 1s'

const switchMode = () => {
    toggleDark()
    changeBgc()
}

const changeBgc = () => {
    if (isDark.value) {
        htmlEl.style.backgroundColor = darkBgc
    } else {
        htmlEl.style.backgroundColor = lightBgc
    }
}
// 初始化一次，触发过渡效果
changeBgc()

</script>

<style scoped lang="scss">
// 开关宽度
$switchWidth: 36px;
// 开关高度
$switchHeight: calc($switchWidth / 2);

.leftStyle {
    background-color: v-bind(lightBgc);
}

.rightStyle {
    background-color: v-bind(darkBgc);
}

.DarkModeSwitch {
    width: $switchWidth;
    height: $switchHeight;
    border: 1px solid var(--el-border-color);
    border-radius: $switchHeight;
    overflow: hidden;
    transition: all 1s;

    .switchBotton {
        width: $switchHeight;
        height: 100%;
        border-radius: 50%;
        transition: all 1s;

        .round {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: all 1s;
        }

        .closeRound {
            transform: translate(-100%, -100%);
            background-color: v-bind(lightBgc);
        }

        .openRound {
            transform: translate(-36%, -36%);
            background-color: v-bind(darkBgc);
        }
    }

    .left {
        background-color: v-bind(darkBgc);
        transform: translateX(0);
    }

    .right {
        background-color: v-bind(lightBgc);
        transform: translateX(calc($switchWidth - $switchHeight));
    }

}
</style>