<template>
  <div>
    <div class="comment-post">
      <h4>发表评论</h4>
      <hr>
      <textarea name="" id="" cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" maxlength="120" v-model="commentCon"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    </div>
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in commentlist" :key="index">
        <div class="comment-info">
          <span>第{{index+1}}楼</span>
          <span>用户：{{item.user_name}}</span>
          <span>发表时间：{{item.add_time | dateFormat}}</span>
        </div>
        <div class="comment-content">
          {{item.content}}
        </div>
      </div>
      <mt-button type="danger" size="large" :plain="true" @click="getMore" :disabled="hasmore" v-show="commentlist.length>0">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import config from "../../config.js";
export default {
  data() {
    return {
      commentlist: [],
      pageindex: 1,
      hasmore: false,
      commentCon: ""
    }
  },
  props: [
    "articleId"
  ],
  created() {
    //console.log(this.articleId);
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get(config.apiUrl + "/api/getcomments/" + this.articleId, { params: { pageindex: this.pageindex } }).then(function(res) {
        var data = res.body;
        if (data.status == 0) {
          if (data.message.length > 0) {
            //console.log(data);
            this.commentlist = this.commentlist.concat(data.message);
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
    postComment() {
      if (this.commentCon.trim()) {
        this.$http.post(config.apiUrl + "/api/postcomment/" + this.articleId, { content: this.commentCon }, { emulateJSON: true }).then(res => {
          if (res.body.status == 0) {
            //console.log(res.body);
            //this.getData();获取的是分页的数据，这里用这个不准确
            this.commentlist.unshift({
              user_name: "匿名用户",
              add_time: new Date().toGMTString(),
              content: this.commentCon
            });
            this.commentCon = "";
          }
        });
      } else {
        Toast({
          message: "请输入评论内容",
          duration: 1200
        });
      }
    }
  }

}
</script>

<style scoped>
textarea {
  margin-bottom: 0;
}

.comment-info {
  margin: 5px;
  background-color: #aaa;
  line-height: 30px;
}

.comment-content {
  text-indent: 2em;
  margin-bottom: 20px;
}
</style>
