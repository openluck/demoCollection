/**  
 * @param {object} data
 * @return {promise}
*/
import axios from '../../axios'

/* 
 * 开放API管理
*/

// 开放API管理-获取API列表
export const getApiManageList = (data) => {
    return axios({
        url: "/apiManage/list",
        method: "post",
        data
    })
}

// 开放API管理-添加/修改API列表
export const createAndUpdateApiManage = (data) => {
    return axios({
        url: "/apiManage/createAndUpdate",
        method: "post",
        data
    })
}

// 开放API管理-删除/批量删除API列表
export const deleteApiManage = (data) => {
    return axios({
        url: "/apiManage/delete",
        method: "post",
        data
    })
}
// 开放API管理-启停该API（更改状态）
export const changeApiState = (data) => {
    return axios({
        url: "/apiManage/changeState",
        method: "post",
        data
    })
}
// 开放API管理-获取调用量详情
export const getApiManageUseNum = (data) => {
    return axios({
        url: "/apiManage/useNum",
        method: "post",
        data
    })
}

// API调用记录-获取API调用记录列表
export const getApiManageUseList = (data) => {
    return axios({
        url: "/apiManage/useList",
        method: "post",
        data
    })
}