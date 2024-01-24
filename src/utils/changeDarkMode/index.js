const darkBgc = '#141414'
const lightBgc = '#ffffff'
const htmlEl = document.documentElement
export default function changeDarkMode(isDark) {
    if (isDark) {
        htmlEl.style.backgroundColor = darkBgc
    } else {
        htmlEl.style.backgroundColor = lightBgc
    }
}