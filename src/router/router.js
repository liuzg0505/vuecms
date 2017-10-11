//1. 导入Vue模块
import Vue from "vue";

//4. 导入路由插件 vue-router
import VueRouter from "vue-router";

//5. 将VueRouter和Vue关联起来
Vue.use(VueRouter);

//导入相应的组件文件
import Home from "../components/containers/HomeContainer.vue";
import Member from "../components/containers/MemberContainer.vue";
import Cart from "../components/containers/CartContainer.vue";
import Search from "../components/containers/SearchContainer.vue";

import NewsList from "../components/news/list.vue";
import NewsDetail from "../components/news/detail.vue";

import PicList from "../components/picture/list.vue";
import PicDetail from "../components/picture/detail.vue";

import ProList from "../components/product/list.vue";
import ProDetail from "../components/product/detail.vue";
import ProDesc from "../components/product/desc.vue";
import ProComment from "../components/product/comment.vue";

export default new VueRouter({
    routes: [
        {path: "/", component: Home},
        {path: "/member", component: Member},
        {path: "/cart", component: Cart},
        {path: "/search", component: Search},
        {path: "/news/list", component: NewsList},
        {path: "/news/detail/:id", component: NewsDetail},
        {path: "/pic/list", redirect: "/pic/list/0"},
        {path: "/pic/list/:id", component: PicList},
        {path: "/pic/detail/:id", component: PicDetail},
        {path: "/product/list", component: ProList},
        {path: "/product/detail/:id", component: ProDetail},
        {path: "/product/desc/:id", component: ProDesc},
        {path: "/product/comment/:id", component: ProComment},
    ]
})