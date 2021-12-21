/**  
 * @param{object} data
 * @return{promise}
*/
import axios from '../../axios'

/* 
 * APP更新
*/

// APP更新-获取APP更新版本列表
export const getAppUpdateList = (data) => {
    return axios({
        url: "/appUpdate/list",
        method: "post",
        data
    })
}

// APP更新-发布/修改新版本
export const createAndUpdateApp = (data) => {
    return axios({
        url: "/appUpdate/createAndUpdate",
        method: "post",
        data
    })
}

// APP更新-删除/批量删除APP更新版本
export const deleteAppUpdate = (data) => {
    return axios({
        url: "/appUpdate/delete",
        method: "post",
        data
    })
}

// APP更新-更改版本上架状态
export const changeAppState = (data) => {
    return axios({
        url: "/appUpdate/changeState",
        method: "post",
        data
    })
}