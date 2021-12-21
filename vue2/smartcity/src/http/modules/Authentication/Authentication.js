//信息统计
// 考点
import axios from '../../axios'


// 获取信息统计
export const getVerifyStatistics = (data) => {
    return axios({
        url: 'verification/getVerifyStatistics',
        method: 'post',
        data
    })
}

// 获取考点统计列表
export const getPointStaticalList = (data) => {
    return axios({
        url: 'verification/getVerifyList',
        method: 'post',
        data
    })
}
// 获取身份验证方式
export const getIdentifyMethod = (data) => {
    return axios({
        url: 'verification/getIdentifyMethod',
        method: 'post',
        data
    })
}
//根据筛选条件获取信号统计列表
export const getVerifyListByCondition = (data) => {
    return axios({
        url: 'verification/getVerifyListByCondition',
        method: 'post',
        data
    })
}