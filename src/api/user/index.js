import request from '@/utils/request'

export const signUp = (data) => request.post('/user/signUp', data)

export const login = (data) => request.post('/user/login', data)

export const logoff = () => request.delete('/user/logoff')

export const modifyInfo = (data) => request.put('/user/modifyInfo', data)

export const modifyPassword = (data) => request.put('/user/modifyPassword', data)

export const info = () => request.get('/user/info')

export const getArticleList = (params) => request.get('/user/getArticleList', { params })

export const getCollectArticleList = (params) => request.get('/user/getCollectArticleList', { params })

export const collectArticle = (data) => request.put('/user/collectArticle', data)

export const cancelCollectArticle = (data) => request.put('/user/cancelCollectArticle', data)

export const getArticleMessage = (params) => request.get('/user/getArticleMessage', { params })