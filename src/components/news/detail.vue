<template>
  <div>
    <div class="news-title">
      <h4 v-text="newsdetail.title"></h4>
      <p class='mui-ellipsis'>
        <span>发表时间：{{newsdetail.add_time | dateFormat}}</span>
        <span>点击：{{newsdetail.click}}次</span>
      </p>
    </div>
    <div class="news-content" v-html="newsdetail.content">

    </div>

    <comments :article-id="this.$route.params.id"></comments>
    <!-- {{newsdetail.id}} 一开始会一直拿到undefined, 因为newsdetail是发ajax之后更新的，所以是一开始子组件获取不到的-->
    <!-- 所以根据路由参数拿是绝对没问题的 -->
    <!-- <comments :article-id="this.$route.params.id"></comments> -->
  </div>
</template>

<script>
import config from "../../config";
import comments from "../subcomps/comments.vue";
export default {
  data() {
    return {
      newsdetail: {},
      apiUrl: config.apiUrl
    }
  },
  created() {
    this.$http.get(this.apiUrl + "/api/getnew/" + this.$route.params.id).then(function(res) {
      var data = res.body;
      if (data.status == 0) {
        this.newsdetail = data.message[0];
        //console.log(data);
      }
    })
  },
  components: {
    comments
  }
}
</script>

<style>
.news-title,
.news-content {
  padding: 10px;
}
.mui-ellipsis {
  color: #26a2ff;
  display: flex;
  justify-content: space-between;
}
.news-content img{
  width: 100%;
}
</style>
