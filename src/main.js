//1. 导入Vue模块
import Vue from "vue";

//2. 导入App.vue组件
import App from "./App.vue";

//导入mint-ui
import Mint from "mint-ui";
//关联Mint
Vue.use(Mint);
//引入mint-ui css文件
import "mint-ui/lib/style.css";

//导入mui的css
import "../lib/mui/css/mui.css";
import "../lib/mui/css/icons-extra.css";


//导入vue-resource
import VueResource from "vue-resource";
Vue.use(VueResource);

//导入过滤器
import "./filters/datefilter";

//导入路由配置
import router from "./router/router";

//导入 Vuex
import Vuex from "vuex";
Vue.use(Vuex);
//导入创建的 Vuex store 对象
import store from "./store/store.js";

//3. 声明一个新的Vue对象
var vm = new Vue({
    el: "#app",
    router,
    store,
    render: function(createElement){
        return createElement(App)
    }
});

// console.log(Vue);


//1. 下载了vue-loader   vue-template-compiler
//2. webpack.config.js   为.vue文件配置了加载器（vue-loader）
//3. 创建App.vue
//4. 在App.vue中书写三部分类内容 template   script  style
//5. template中必须包含根元素
//6. script标签中需要用 到出模块的语法 导出一个用来创建组件构造器的对象
//7. 在main.js中 先导入Vue模块
//8. 在main.js中 导入App.vue模块
//9. 创建一个新的vue实例， 将App.vue中的内容作为模板挂载到页面中去
// var vm = new Vue({
//     el: "#app",
//     render: function(createElement){
//         return createElement(App);
//     }
// })