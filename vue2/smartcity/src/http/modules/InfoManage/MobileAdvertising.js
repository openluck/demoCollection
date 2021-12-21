/* 
 * 移动端广告
 */
import axios from '../../axios'

// 获取广告 列表
export const getADList = (data) => {
    return axios({
        url: '/AD/list',
        method: 'post',
        data
    })
}

//广告 新增或编辑
export const createAndUpdateAD = (data) => {
    return axios({
        url: '/AD/createAndUpdate',
        method: 'post',
        data
    })
}

//广告 删除和更改状态
export const deleteAD = (data) => {
    return axios({
        url: '/AD/delete',
        method: 'post',
        data
    })
}