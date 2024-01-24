import axios from 'axios'

import nProgress from 'nprogress'

import { ElMessage } from 'element-plus'

import router from '@/router'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
});


// 获取Token
import getToken from '@/utils/getToken'
// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 开启进度条
        nProgress.start()
        // 携带Headers
        config.headers['Authorization'] = `Bearer ${getToken()}`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截器
request.interceptors.response.use(
    response => {
        // 结束进度条
        nProgress.done()
        const res = response.data
        if (res.code !== 200) {
            // 用户未登录
            if (res.code === 401) {
                localStorage.removeItem('token');
                router.push('/')
                ElMessage('请先登录')
                return Promise.reject('请先登录')
            }
            // 后端提示错误
            if (res.code === 500) {
                ElMessage(res.message)
                return Promise.reject(res.message)
            }
            // 后端程序错误
            return Promise.reject('接口错误(X﹏X)')
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
)


export default request