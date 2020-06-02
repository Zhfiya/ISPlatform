<template>
  <div id="menuHeader">
    <div class="title">
      <div @click="GoToIndex" class="title">
        <img src="../assets/security.png" alt="">
        线上AWD
      </div>
    </div>
    <ul>
        <li><a @click="OpenAwd">AWD</a></li>
        <li><a href="/blogArea">博客区</a></li>
        <li><a href="/login" v-if="!isLogin">登录</a></li>
        <li><a href="/register" v-if="!isLogin">注册</a></li>
        <li><a href="/personalCenter" v-if="isLogin">个人中心</a></li>
        <li><a @click="Logout" v-if="isLogin">退出登录</a></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'menuHeader',

  computed: {
    ...mapState(['isLogin'])
  },

  methods: {
    OpenAwd () {
      window.open('http://47.115.18.243/awd-lastest/', '_blank');
    },
    // 退出登录
    async Logout () {
      try {
        const res = await this.$axios.post('/logout', {});
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '退出登录'
          });
          this.$store.dispatch('set_Login', false);
          window.location.href = '/';
        } else if (info.code === 409) {
          this.sessionJudge();
        } else {
          this.$message({
            type: 'error',
            message: info.message
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 返回首页
    GoToIndex () {
      window.location.href = '/';
    }
  }
};
</script>

<style lang="less" scoped>
#menuHeader {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #1B314A;
  display: inline-block;

  img {
    width: 30px;
    height: 30px;
  }
  .title{
    color: white;
    font-size: 22px;
    font-weight: bolder;
    float: left;
    margin-left: 7%;
    line-height: 60px;
    width: 300px;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    text-align: right;
    margin-right: 5%;

    li {
      display: inline;
    }
    a {
      color: white;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      padding: 10px;
      margin-right: 5%;
      font-size: 18px;
    }
  }
}
</style>
