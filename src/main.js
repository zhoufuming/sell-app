// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';// 引入路由
import VueResource from 'vue-resource';// 引入resource插件
import goods from './components/goods/goods';// 引入goods组件
import ratings from './components/ratings/ratings';// 引入ratings组件
import seller from './components/seller/seller';// 引入seller组件

Vue.config.productionTip = false;/* 关闭生产模式给出的提示 */

Vue.use(VueRouter);/* 注册路由 */
Vue.use(VueResource);/* 注册resouce */

const routes = [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller},
    {path: '*', redirect: '/goods'} // 默认显示goods
];

const router = new VueRouter({
	routes: routes,  // 注意是routes而不是routers,坑就在这里
	linkActiveClass: 'active'	// 自定义选中时的class名，默认值为v-link-active
});

export default router;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
});
