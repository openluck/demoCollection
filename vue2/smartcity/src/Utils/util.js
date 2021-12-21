/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
const timestampToTime = (timestamp, type) => {
    if (timestamp === '' || !timestamp) {
        return ''
    }
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())

    let s =
        date.getSeconds() < 10 ? ':' + '0' + date.getSeconds() : ':' + date.getSeconds()
    if (type === 0) return Y + M + D + h + m + s
    else if (type === 1) return Y + M + D
    else if (type === 2) return M + D
    else if (type === 3) return D
    else if (type === 4) return h + m + s
    else if (type === 5) return h + m
};
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}
/**
 * 一维数组遍历成树
 **/
function filterArray(data, parentcode) {
    var tree = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
        if (parseInt(data[i].parentcode) === parseInt(parentcode)) {
            var obj = data[i];
            temp = filterArray(data, data[i].orgcode);
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}

/**
 * 防抖函数
 * @param {Function} func  需要防抖的函数
 * @param {Number} wait  时间
 */
const debounce = (func, wait) => {
    // console.log("inininin")
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        console.log("arguments", arguments)
        if (timeout) clearTimeout(timeout);
        let callNow = !timeout;
        timeout = setTimeout(() => {
            timeout = null;
        }, wait)

        if (callNow) func.apply(context, args)
    }
}
/**
 * 表格同值合并
 * @param {String} text 要合并的列的数据
 * @param {Array} array 表格数据
 * @param {String} 要合并的列名
 */
const temp = {} // 当前重复的值,支持多列
const mergeCellKey = (text, array, columns) => {
    let i = 0
    if (text !== temp[columns]) {
        temp[columns] = text
        array.forEach((item) => {
            if (item[columns] === temp[columns]) {
                i += 1
            }
        })
    }
    return i
}

/**
 * 导出 
 **/
export {
    timestampToTime,
    setStore,
    getStore,
    removeStore,
    filterArray,
    debounce,
    mergeCellKey
}