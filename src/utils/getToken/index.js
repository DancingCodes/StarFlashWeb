// 获取Token
export default function getToken() {
    return JSON.parse(localStorage.getItem("token"))
}