/* 
 * 新闻资讯
 */
import axios from '../../axios'

// 获取新闻资讯列表
export const getNewsList = (data) => {
    return axios({
        url: '/news/list',
        method: 'post',
        data
    })
}

// 新闻 新增或编辑
export const createAndUpdateNews = (data) => {
    return axios({
        url: '/news/createAndUpdate',
        method: 'post',
        data
    })
}

// 新闻 删除（单个，批量）
export const deleteNews = (data) => {
    return axios({
        url: '/news/delete',
        method: 'post',
        data
    })
}
