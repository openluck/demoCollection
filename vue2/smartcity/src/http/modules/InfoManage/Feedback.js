/* 
 * 意见反馈
 */
import axios from '../../axios'

// 获取意见反馈列表
export const getFeedbackList = (data) => {
    return axios({
        url: '/feedback/list',
        method: 'post',
        data
    })
}

// 意见反馈 编辑
export const updateFeedback = (data) => {
    return axios({
        url: '/feedback/update',
        method: 'post',
        data
    })
}

// 意见反馈 删除（单个，批量）
export const deleteFeedback = (data) => {
    return axios({
        url: '/feedback/delete',
        method: 'post',
        data
    })
}
