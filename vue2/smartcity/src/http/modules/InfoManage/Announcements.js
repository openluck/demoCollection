/* 
 * 通知公告
 */
import axios from '../../axios'

// 获取通知公告列表
export const getNoticeList = (data) => {
    return axios({
        url: '/notice/list',
        method: 'post',
        data
    })
}

// 通知公告 新增或编辑
export const createAndUpdateNotice = (data) => {
    return axios({
        url: '/notice/createAndUpdate',
        method: 'post',
        data
    })
}

// 通知公告 删除（单个，批量）
export const deleteNotice = (data) => {
    return axios({
        url: '/notice/delete',
        method: 'post',
        data
    })
}
