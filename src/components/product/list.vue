<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item,index) in prolist" :key="index" @click="goto(item.id)">
      <img v-lazy="item.img_url" alt="">
      <h4>{{item.title}}</h4>
      <div class="info">
        <p class="price">
          <span class="nowPrice">￥{{item.sell_price}}</span>
          <span>
            <del>￥{{item.market_price}}</del>
          </span>
        </p>
        <p class="sale">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" :plain="true" @click="getMore" :disabled="hasmore" v-show="prolist.length>0">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import config from "../../config.js";
export default {
  data() {
    return {
      pageindex: 1,
      prolist: [],
      hasmore: false
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get(config.apiUrl + "/api/getgoods?pageindex=" + this.pageindex).then(res => {
        var data = res.body;
        if (data.status == 0) {
          if (data.message.length > 0) {
            //console.log(data);
            this.prolist = this.prolist.concat(data.message);
          } else {
            this.hasmore = true;
            if (this.pageindex > 1) {
              Toast({
                message: "没有更多内容了",
                duration: 1200
              });
            }

          }
        }

      });
    },
    getMore() {
      this.pageindex++;
      this.getData();
    },
    goto(id) {
      this.$router.push("/product/detail/" + id);
    }
  }
}
</script>


<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 3px;
}

.goods-list .goods-item {
  width: 48%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-list .goods-item img {
  width: 100%;
  border: 0;
}

.goods-list .goods-item h4 {
  font-size: 14px;
}

.goods-list .goods-item .info {
  background-color: #eee;
}

.goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.goods-list .goods-item .info p:nth-child(1) .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}
</style>

