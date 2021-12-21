//移动端实名认证
import axios from '../../axios'

//_ 获取 实名认证 列表
export const getNameAuthList = (data) => {
    return axios({
        url: '/NameAuth/list',
        method: 'post',
        data
    })
}

// 搜索用户
export const searchAPPUser = (data) => {
    return axios({
        url: '/APPUser/search',
        method: 'post',
        data
    })
}

// 删除实名认证
export const bindingNameAuth = (data) => {
    return axios({
        url: '/NameAuth/binding',
        method: 'post',
        data
    })
}

// CTID实名认证检测
export const CTIDNameAuth = (data) => {
    return axios({
        url: '/NameAuth/CTID',
        method: 'post',
        data
    })
}

// 新增 实名认证
export const createNameAuth = (data) => {
    return axios({
        url: '/NameAuth/create',
        method: 'post',
        data
    })
}

//审核 实名认证
export const updateNameAuth = (data) => {
    return axios({
        url: '/NameAuth/update',
        method: 'post',
        data
    })
}

//OCR 提取
export const OCR = (data) => {
    return axios({
        url: '/NameAuth/OCR',
        method: 'post',
        data
    })
}
