<template>
  <div id="app">
    <MenuHeader />
    <router-view />
  </div>
</template>

<script>
import MenuHeader from './components/MenuHeader';

export default {
  name: 'app',
  components: {
    MenuHeader
  },

  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Microsoft YaHei";
  color: #2c3e50;
  margin: 0;
}
</style>
