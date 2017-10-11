<template>
  <div>
    <div class="news-title">
      <h4 v-text="prodesc.title"></h4>
    </div>
    <div class="news-content" v-html="prodesc.content">

    </div>
  </div>
</template>

<script>
import config from "../../config";
export default {
  data() {
    return {
      prodesc: {},
      apiUrl: config.apiUrl
    }
  },
  created() {
    this.$http.get(this.apiUrl + "/api/goods/getdesc/" + this.$route.params.id).then(function(res) {
      var data = res.body;
      if (data.status == 0) {
        this.prodesc = data.message[0];
        //console.log(data);
      }
    })
  }
}
</script>

<style>
.news-title,
.news-content {
  padding: 10px;
}
.news-content p {
  margin: 0;
  line-height: 24px;
}
.news-content img{
  width: 100%;
  display: block;
  margin: 0;
}
</style>
