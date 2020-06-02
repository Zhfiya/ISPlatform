exports.install = function (Vue) {
  Vue.prototype.sessionJudge = function () {
    localStorage.setItem('Login', 'false');
    this.$message({
      message: '登录过期，请重新登录',
      type: 'error',
      offset: 70
    });
    window.location.href = '/login';
    this.$store.dispatch('set_Login', false);
  };
};
