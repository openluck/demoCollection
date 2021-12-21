/* 
 * 消息推送
 */
import axios from '../../axios'

// 获取消息推送列表
export const getInformationPushList = (data) => {
    return axios({
        url: '/informationPush/list',
        method: 'post',
        data
    })
}

// 消息推送 新增
export const addInformationPush = (data) => {
    return axios({
        url: '/informationPush/add',
        method: 'post',
        data
    })
}

// 消息推送 详情
export const detailsInformationPush = (data) => {
    return axios({
        url: '/informationPush/details',
        method: 'post',
        data
    })
}

// 消息推送 删除（单个，批量）
export const deleteInformationPush = (data) => {
    return axios({
        url: '/informationPush/delete',
        method: 'post',
        data
    })
}
