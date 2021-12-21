/* 
 * 移动端Banner
 */
import axios from '../../axios'

//获取banner列表
export const getBannerList = (data) => {
    return axios({
        url: '/banner/list',
        method: 'post',
        data
    })
}

//banner 新增或编辑
export const createAndUpdateBanner = (data) => {
    return axios({
        url: '/banner/createAndUpdate',
        method: 'post',
        data
    })
}

// banner 删除（单个，批量）
export const deleteBanner = (data) => {
    return axios({
        url: '/banner/delete',
        method: 'post',
        data
    })
}

// 修改 展现状态
export const changeBannerState = (data) => {
    return axios({
        url: '/banner/changeState',
        method: 'post',
        data
    })
}

//  修改 展现顺序
export const changeBannerOrder = (data) => {
    return axios({
        url: '/banner/changeOrder',
        method: 'post',
        data
    })
}
