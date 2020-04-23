module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://120.78.196.119:1322',
        changeOrigin: true,
        ws: true
      }
    }
  }
};
