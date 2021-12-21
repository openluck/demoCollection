import { queryCodeTable } from '../../http/modules/init'
const codeTable = {
  state: {
    options: []
  },
  mutations: {
    // 码表排序
    sortCodeTable(state, data) {
      data.sort((a, b) => {
        return a.codeTableSort - b.codeTableSort
      })
    }
  },
  actions: {
    queryCodeTable(context, type) {
      return new Promise((resolve, reject) => {
        queryCodeTable({ type }).then(res => {
          if (res.code === "200" && res.result) {
            if (res.data.length || Object.keys(res.data).length) {
              // codeTableSort进行排序
              context.commit('sortCodeTable', res.data)
              resolve(res.data)
            }
          } else {
            reject(res.message)
          }
        })
      })
    }
  }
}
export default codeTable