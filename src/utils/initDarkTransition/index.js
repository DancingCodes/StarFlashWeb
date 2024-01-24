import changeDarkMode from '@/utils/changeDarkMode'

import { useDark } from '@vueuse/core'
const isDark = useDark()

const htmlEl = document.documentElement
htmlEl.style.transition = 'background-color 0.6s'
changeDarkMode(isDark.value)