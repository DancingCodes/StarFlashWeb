import request from '@/utils/request'

export const writeArticle = (data) => request.post('/article/writeArticle', data)

export const getArticle = (params) => request.get('/article/getArticle', { params })

export const modifyArticle = (data) => request.put('/article/modifyArticle', data)

export const getArticleList = (params) => request.get('/article/getArticleList', { params })

export const removeArticle = (params) => request.delete('/article/removeArticle', { params })