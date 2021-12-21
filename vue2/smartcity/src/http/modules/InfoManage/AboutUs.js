/* 
 * 关于我们
 */
import axios from '../../axios'

// 获取市民云简介
export const getAppIntroduce = (data) => {
    return axios({
        url: '/getAppIntroduce',
        method: 'post',
        data
    })
}

// 获取隐私政策
export const getPrivacyPolicy = (data) => {
    return axios({
        url: '/getPrivacyPolicy',
        method: 'post',
        data
    })
}

// 获取服务协议
export const getServiceAgreement = (data) => {
    return axios({
        url: '/getServiceAgreement',
        method: 'post',
        data
    })
}

// 获取 用户授权协议
export const getEULA = (data) => {
    return axios({
        url: '/getEULA',
        method: 'post',
        data
    })
}

// 修改 市民云介绍
export const updateIntroduce = (data) => {
    return axios({
        url: '/updateIntroduce',
        method: 'post',
        data
    })
}

// 修改 服务协议
export const updateServiceAgreement = (data) => {
    return axios({
        url: '/updateServiceAgreement',
        method: 'post',
        data
    })
}

// 修改 隐私政策
export const updatePrivacyPolicy = (data) => {
    return axios({
        url: '/updatePrivacyPolicy',
        method: 'post',
        data
    })
}

// 修改 用户授权协议
export const updateEULA = (data) => {
    return axios({
        url: '/updateEULA',
        method: 'post',
        data
    })
}
