const path = require('path');

module.exports = {
  // 這樣可以讓部屬出來的檔案指向絕對路徑
  publicPath: './',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
  },
};
