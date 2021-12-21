//移动端用户管理
import axios from '../../axios'

// 获取 移动端用户 列表
export const getAPPUserList = (data) => {
    return axios({
        url: '/APPUser/list',
        method: 'post',
        data
    })
}

//  新增编辑 移动端用户
export const APPUserCreateAndUpdate = (data) => {
    return axios({
        url: '/APPUser/createAndUpdate',
        method: 'post',
        data
    })
}

// 删除 移动端用户
export const APPUserDelete = (data) => {
    return axios({
        url: '/APPUser/delete',
        method: 'post',
        data
    })
}

// 获取 移动端用户授权应用 列表
export const getAPPUserAuthList = (data) => {
    return axios({
        url: '/APPUser/authList',
        method: 'post',
        data
    })
}

//  解除 移动端用户授权应用
export const APPUserAuthDelete = (data) => {
    return axios({
        url: '/APPUser/authDelete',
        method: 'post',
        data
    })
}

//  获取 移动端用户登录记录 列表
export const getAPPUserLogList = (data) => {
    return axios({
        url: '/APPUser/logList',
        method: 'post',
        data
    })
}