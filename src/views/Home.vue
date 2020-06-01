<template>
  <div id="home">
    <div class="loading" v-show="showLoading">
      <loading />
    </div>
    <div v-show="!showLoading" class="home">
      <img :src="imgUrl" alt="">
      <div class="info">
        <span class="title">平台使用说明</span>
        <span>平台分为五个部分：</span>
        <span><b>1.登陆板块。</b>输入用户名和密码进行登陆,忘记密码可找回密码。</span>
        <span><b>2.注册板块。</b>正确输入相关信息，进行注册。</span>
        <span><b>3.AWD板块。</b>点击菜单栏的AWD进入首页。正确登陆后可创建/加入比赛。</span>
        <span>(1)加入已创建的比赛需要输入正确的邀请码。<span class="tip">(邀请码可以在个人中心的最近比赛中查看)</span></span>
        <span>(2)创建比赛需填写比赛相关信息，创建成功后需加入才可进行比赛。<span class="tip">(比赛一旦创建即为开始)</span></span>
        <span><b>4.博客区板块。</b></span>
        <span>(1)博客区左上角可以选择查看对应分类博客。</span>
        <span>(2)输入博客名字进行模糊查询，查找博客。</span>
        <span>(3)点击博客卡片跳转博客详情，可对博客进行点赞或取消点赞</span>
        <span><b>5.个人中心板块。</b></span>
        <span>(1)基本资料。修改除密码邮箱以外的基本信息。</span>
        <span>(2)安全设置。通过邮箱验证后可修改密码和邮箱。</span>
        <span>(3)战队信息。若已有队伍可查看已加入的队伍或退出队伍，无队伍可创建/加入队伍。</span>
        <span>(4)近期比赛。查看平台正在进行的比赛、邀请码和自己曾经参加的比赛及比赛得分。</span>
        <span>(5)个人博客。查看个人所有博客，可对其进行修改删除。</span>
        <span>(6)创建博客。正确选择博客分类，博客名不可重复。</span>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/loading';

export default {
  name: 'home',
  components: {
    loading
  },

  data () {
    return {
      imgUrl: require('../assets/index_background.jpg'),
      showLoading: true
    };
  },

  // 加载图片前展示loading
  mounted () {
    const bgImg = new Image();
    bgImg.src = this.imgUrl; // 获取背景图片的url
    bgImg.onerror = () => {
      console.log('img onerror');
    };
    bgImg.onload = () => { // 等背景图片加载成功后 去除loading
      this.showLoading = false;
    };
  }
};
</script>

<style lang="less" scoped>
#home{
  .home{
    height: 100%;
    width: 100%;
    background-size: cover;
    left: 0;
    top: 0;
    position: fixed;
  }
  .info {
    margin-top: 160px;
    margin-left: 29.5%;
    width: 560px;
    height: 450px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgba(255,255,255,.7);
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
      font-size: 20px;
      margin-left: 230px;
    }
    .tip {
      color: red;
    }
  }

  .loading{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
}
</style>
