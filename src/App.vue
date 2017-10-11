<template>
    <div class="app">
        <!-- 1.头部 -->
        <mt-header fixed title="固定在顶部">
            <!-- <router-link to="/"> -->
                <mt-button v-if="$route.path!='/'" slot="left" icon="back" @click="$router.go(-1)">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>
        <!-- 2.中间内容 -->
        <router-view></router-view>
        <!-- 3.底部 -->
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" @click='goTo("/")'>
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" @click='goTo("/member")'>
                <span class="mui-icon mui-icon-contact">
                </span>
                <span class="mui-tab-label">会员</span>
            </a>
            <a class="mui-tab-item" @click='goTo("/cart")'>
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">{{$store.getters.totalCount}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </a>
            <a class="mui-tab-item" @click='goTo("/search")'>
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </a>
        </nav>

    </div>
</template>



<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goTo(route) {
            this.$router.push(route);
        }
    }
}
</script>

<style>
body {
    background-color: #fff;
}

.app {
    padding-top: 40px;
    padding-bottom: 50px;
}
</style>

