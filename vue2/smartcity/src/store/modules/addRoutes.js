import router from '../../router'
import addDynamicRoutes from './addDynamicRoutes'
import VueRouter from "vue-router";
/**
 * 动态添加路由
 * author:qlx
 */
const addRoutes = {
    state: {
        rootRoute: [],
        routeParam: []//这里必须持久化参数,重新生成路由,因为里边的require方法没法持久化
    },
    mutations: {
        add_Routes(state, routeParam) {
            let dynamicRoutes = addDynamicRoutes(routeParam)
            router.options.routes[0].children.length = 1;
            router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
            //保存路由参数到store中
            state.routeParam = routeParam;
            state.rootRoute = router.options.routes[0].children;
            if (routeParam) {
                sessionStorage.setItem("routerInfo", JSON.stringify(routeParam))
            }
            //动态添加路由
            router.matcher = new VueRouter({ mode: 'hash', routes: router.options.routes }).matcher;
           // router.addRoutes(router.options.routes);
        }
    },
    actions: {
        add_Routes({ commit }, routeParam) {
            commit('add_Routes', routeParam)
        }
    }
}
export default addRoutes