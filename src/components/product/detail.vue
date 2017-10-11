<template>
  <div class="good-details">

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="reddot" v-show="isRedDotShow"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :images="images"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{proinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span>市场价：
              <del>￥ {{proinfo.market_price}}</del>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>销售价：
              <span class="sale_price">￥ {{proinfo.sell_price}}</span>
            </span>
          </div>
          <div class="count">
            <span>购买数量：</span>
            <div data-numbox-min="1" class="mui-numbox" :data-numbox-max="proinfo.stock_quantity" style="height: 28px;">
              <button type="button" disabled="" class="mui-btn mui-btn-numbox-minus">-</button>
              <input type="number" value="1" class="mui-input-numbox">
              <button type="button" class="mui-btn mui-btn-numbox-plus">+</button>
            </div>
          </div>
          <div class="operate">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header mui-card-media">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{proinfo.goods_no}}</p>
          <p>库存情况: {{proinfo.stock_quantity}}件</p>
          <p>上架时间: {{proinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer1">
        <mt-button type="primary" plain size="large" @click="$router.push('/product/desc/' + proinfo.id)">图文介绍</mt-button>
        <br>
        <mt-button type="danger" plain size="large" @click="$router.push('/product/comment/' + proinfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config.js";
import swiper from "../subcomps/swiper.vue";
import mui from "../../../lib/mui/js/mui.js"

export default {

  data() {
    return {
      images: [],
      picUrl: config.picUrl,
      proinfo: {},
      isRedDotShow: false
    }
  },
  mounted() {
    //初始化numbox
    mui(".mui-numbox").numbox()
  },
  created() {
    //商品详情页轮播图图片
    this.$http.get(config.apiUrl + "/api/getthumimages/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        //console.log(data);
        data.message.forEach(v => {
          v.img = this.picUrl + v.src;
        });
        this.images = data.message;
      }
    });

    //商品详细信息
    this.$http.get(config.apiUrl + "/api/goods/getinfo/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        console.log(data);
        this.proinfo = data.message[0];
        //设置numbox的最大值为商品的库存
        mui(".mui-numbox").numbox().setOption("max", this.proinfo.stock_quantity);
      }
    });
  },
  components: {
    swiper
  },
  methods: {
    addToCart() {
      this.isRedDotShow = !this.isRedDotShow;
      //console.log(this);
      //console.log(this.$store); 
      //获取用户选择好的购买数量 - mui插件的自己的api
      var buyCount = mui(".mui-numbox").numbox().getValue();
      //商品信息存入购物车
      this.$store.commit("addToCart", { id: this.$route.params.id, count: buyCount});
      //更新购物车图标的小圆点 - 在 App.vue文件里面
      
    },
    beforeEnter(el) {
      el.style.transform = "translate(0px,0px)"
    },
    enter(el) {
      el.offsetWidth;//触发页面重绘
      el.style.transform = "translate(110px, " + (window.pageYOffset + 320) + "px)";
    },
    afterEnter(el) {
      this.isRedDotShow = !this.isRedDotShow;
    }
  }
}
</script>


<style scoped>
.mui-card-media {
  color: #000;
}

.sale_price {
  color: red;
  font-size: 18px;
}

.count {
  margin: 10px auto;
}

p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}

.mui-card-footer1 {
  position: relative;
  min-height: 44px;
  padding: 10px 15px;
  color: #6d6d72;
  border-radius: 0 0 2px 2px;
  border-top: 1px solid #ccc;
}

.reddot {
  width: 20px;
  height: 20px;
  background-color: red;
  position: absolute;
  top: 320px;
  left: 145px;
  z-index: 999;
  border-radius: 50%;
  transition: all .1s cubic-bezier(0, 1.64, .67, -0.65);
}

.good-details {
  position: relative;
}
</style>

