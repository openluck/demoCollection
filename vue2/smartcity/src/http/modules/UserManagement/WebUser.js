/**  
 * @param{object} data
 * @return{promise}
*/

/* 
 * WEB端用户管理
*/

import axios from '../../axios'

// WEB端用户管理-获取web端用户列表
export const getWebUserList = (data) => {
    return axios({
        url: "/webUser/list",
        method: "post",
        data
    })
}

// WEB端用户管理-添加/修改web端用户
export const createAndUpdateWebUser = (data) => {
    return axios({
        url: "/webUser/createAndUpdate",
        method: "post",
        data
    })
}

// WEB端用户管理-删除/批量删除web端用户
export const deleteWebUser = (data) => {
    return axios({
        url: "/webUser/delete",
        method: "post",
        data
    })
}

// WEB端用户管理-获取角色账号类型
export const getWebUserListRoles = (data) => {
    return axios({
        url: "/webUser/listRoles",
        method: "post",
        data
    })
}