/* 
 * 短信推送
 */
import axios from '../../axios'

// 获取短信推送列表
export const getNotePushList = (data) => {
    return axios({
        url: '/notePush/list',
        method: 'post',
        data
    })
}

// 短信推送 新增
export const addNotePush = (data) => {
    return axios({
        url: '/notePush/add',
        method: 'post',
        data
    })
}

// 短信推送 详情
export const detailsNotePush = (data) => {
    return axios({
        url: '/notePush/details',
        method: 'post',
        data
    })
}

// 短信推送 删除（单个，批量）
export const deleteNotePush = (data) => {
    return axios({
        url: '/notePush/delete',
        method: 'post',
        data
    })
}
