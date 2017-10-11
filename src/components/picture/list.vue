<template>
  <div>
    <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
        <a class="mui-control-item mui-active" @click.prevent="goCategory(0)">
          全部
        </a>
        <a class="mui-control-item" @click.prevent="goCategory(item.id)" v-for="(item, index) in category" :key="index">
          {{item.title}}
        </a>

      </div>
    </div>
    <div class="pic-list">
      <ul>
        <li v-for="(item, index) in categorylist" :key="index">
          <router-link :to="'/pic/detail/' + item.id">
            <img v-lazy="picUrl + item.img_url" alt="">
            <div>
              <p>{{item.title}}</p>
              <p>{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import mui from "../../../lib/mui/js/mui.js";
import config from "../../config.js";
// import { Lazyload } from 'mint-ui';
export default {
  data() {
    return {
      category: [],
      categorylist: [],
      picUrl: config.picUrl
    }
  },
  created() {
    this.$http.get(config.apiUrl + "/api/getimgcategory").then(function(res) {
      var data = res.body;
      if (data.status == 0) {
        //console.log(data);
        this.category = data.message;
      }
    });
    this.getPicData();
  },
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

  },
  methods: {
    getPicData() {
      this.$http.get(config.apiUrl + "/api/getimages/" + this.$route.params.id).then(function(res) {
        var data = res.body;
        if (data.status == 0) {
          //console.log(data);
          this.categorylist = data.message;
        }

      });
    },
    goCategory(id) {
      //console.log(id);
      this.$router.push({ path: "/pic/list/" + id });

    }
  },
  //要监视路由的变化显示不同的数据
  watch: {
    $route() {
      //console.log(222);
      this.getPicData();
    }
  }
}

</script>

<style scope>
.pic-list ul {
  padding: 0;
}

.pic-list li {
  list-style: none;
  padding: 5px 10px;
  background-color: #ccc;
  position: relative;
}

.pic-list li img {
  width: 100%;
}

.pic-list li img[lazy=loading] {
  display: block;
  width: 40px;
  height: 300px;
  margin: 0 auto;
}

.pic-list li div {
  margin-right: 10px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}

.pic-list li div p:first-child {
  font-size: 16px;
}

.pic-list li div p {
  padding: 4px;
  color: #fff;
}

.mui-scroll-wrapper {
  z-index: 0;
}

.mui-scroll {
  z-index: -1;
}
</style>
