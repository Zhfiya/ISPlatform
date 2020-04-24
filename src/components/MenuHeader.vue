<template>
    <div id="menuHeader">
        <label @click="GoToIndex">Information Security</label>
        <ul>
            <li><a href="">CTF</a></li>
            <li><a href=" ">AWD</a></li>
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
    // 退出登录
    async Logout () {
      try {
        const res = await this.$axios.post(`${this.HOST}/logout`, {});
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '退出登录'
          });
          this.$store.dispatch('set_Login', false);
          window.location.href = '/';
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

  label{
    color: white;
    font-size: 33px;
    float: left;
    margin-left: 10%;
    margin-top: 10px;
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
