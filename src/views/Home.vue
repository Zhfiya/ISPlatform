<template>
  <div id="home">
    <div class="loading" v-show="showLoading">
      <loading />
    </div>
    <div v-show="!showLoading" class="home">
      <img :src="imgUrl" alt="">
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
