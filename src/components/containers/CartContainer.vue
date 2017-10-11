<template>
  <div>
    <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.isSelect"></mt-switch>
            <img :src="picUrl + item.thumb_path" class="thumb_img">
            <div class="info">
              <h4>{{item.title}}</h4>
              <div class="box">
                <span class="price">￥{{item.sell_price}}</span>
                <div data-numbox-min="0" class="mui-numbox" style="height: 28px;">
                  <button type="button" class="mui-btn mui-btn-numbox-minus" disabled="" @click="minusCount(item.id)">-</button>
                  <input type="number" :value="$store.getters.counts[item.id]" class="mui-input-numbox">
                  <button type="button" class="mui-btn mui-btn-numbox-plus" @click="addCount(item.id)">+</button>
                </div>
                <a href="#" @click.prevent="del(item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="amount">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="red">{{totalCount}}</span> 件 总价：
                <span class="red">￥{{totalPrice}}</span>
              </p>
            </div>
            <button class="mint-button mint-button--danger mint-button--normal">
              <!---->
              <label class="mint-button-text">去结算</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config.js";
import mui from "../../../lib/mui/js/mui.js"
import Vue from "vue";
export default {
  data() {
    return {
      goodsList: [],
      picUrl: config.picUrl
    }
  },
  created() {
    //从vuex store 中获取所有商品的id，拼成字符串
    var ids = this.$store.state.carts.map(v => {
      return v.id;
    }).join(",");

    if(!ids) {
      return;
    }
    this.$http.get(config.apiUrl + "/api/goods/getshopcarlist/" + ids).then(res => {
      var data = res.body;
      if (data.status == 0) {
        //console.log(data);
        data.message.forEach(v => {
          v.isSelect = true;
        });
        this.goodsList = data.message;
        //数据更新之后才有numbox,才能做mui初始化
        Vue.nextTick(function() {
          mui(".mui-numbox").numbox();
        });
      }
    });
  },
  methods: {

    minusCount(id) {
      //告诉vuex帮忙修改localStorage中存的购物车商品数据
      this.$store.commit("minusCount", id);
    },
    addCount(id) {
      this.$store.commit("addCount", id);
    },
    del(id){
      this.$store.commit("del", id);
      var index = this.goodsList.findIndex(v=>{
        return v.id == id;
      });
      this.goodsList.splice(index,1);
    }
  },
  computed: {
    totalCount() {
      //获取被选中的商品信息
      var seletedGoods = this.goodsList.filter(v => {
        return v.isSelect;
      });
      //console.log(seletedGoods);
      //获取被选中的商品数量
      var totalCounts = 0;
      seletedGoods.forEach(v => {
        totalCounts += this.$store.getters.counts[v.id];
      });
      //console.log(totalCounts);
      return totalCounts;
    },
    totalPrice() {
      //获取被选中的商品信息
      var seletedGoods = this.goodsList.filter(v => {
        return v.isSelect;
      });
      //console.log(seletedGoods);
      //获取被选中的商品数量
      var totalPrice = 0;
      seletedGoods.forEach(v => {
        totalPrice += this.$store.getters.counts[v.id] * v.sell_price;
      });
      //console.log(totalPrice);
      return totalPrice;
    }
  }
}
</script>

<style>
.goods-list .mui-card-content-inner {
  display: flex;
}


.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}

.goods-list .mui-card-content-inner .info {
  flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
  font-size: 16px;
  color: red;
}

.mui-card-content-inner .amount {
  flex: 1;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
