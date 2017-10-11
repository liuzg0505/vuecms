<template>
  <div>
    <div class="news-title">
      <h4 v-text="picdetail.title"></h4>
      <p class='mui-ellipsis'>
        <span>发表时间：{{picdetail.add_time | dateFormat}}</span>
        <span>点击：{{picdetail.click}}次</span>
      </p>
    </div>
    <div class="pic-thumblist">
      <img class="preview-img" v-for="(item, index) in thumbnails" :key="index" :src="item.src" @click="$preview.open(index, thumbnails)">
    </div>
    <div class="news-content" v-html="picdetail.content">
    </div>

    <comments :article-id="this.$route.params.id"></comments>

  </div>
</template>

<script>
import Vue from "vue";
import config from "../../config.js";
import comments from "../subcomps/comments.vue";
import VuePreview from "vue-preview";
Vue.use(VuePreview);
export default {
  data() {
    return {
      picdetail: {},
      thumbnails: [],
      picUrl: config.picUrl
    }
  },
  created() {
    this.$http.get(config.apiUrl + "/api/getimageInfo/" + this.$route.params.id).then(res => {
      var data = res.body;
      if (data.status == 0) {
        //console.log(data);
        this.picdetail = data.message[0];
      }
    });
    this.$http.get(config.apiUrl + "/api/getthumimages/" + this.$route.params.id).then(res => {
      var data=res.body;
      if(data.status == 0) {
        //console.log(data);
        //由于vue-preview要求的数据格式为对象，对象中有三个属性：src,w,h
        //但是请求过来的数据只有src
        //下面是对请求过来的数据加工
        data.message.forEach(v=>{
          v.src=this.picUrl + v.src;
          v.w = 600;
          v.h = 400;
        });
        this.thumbnails = data.message;
      }
    });
  },
  components: {
    comments
  }
}
</script>

<style>
.news-title {
  color: #26a2ff;
}

.news-title,
.news-content {
  padding: 10px;
}

.mui-ellipsis {
  color: #26a2ff;
  display: flex;
  justify-content: space-between;
}

.news-content img {
  width: 100%;
}
.pic-thumblist img {
  margin: 1%;
  width: 23%;
}
</style>
