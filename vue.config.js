module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {  
      '/api': {
          target: "http://47.99.134.126:7008",  // 配置到服务器后端的API头部
          pathRewrite: { 
              '^/api': '/api'  // 路径重写，第一个与上面相同，第二个/queue-admin 为server.context-path（服务器的上下文）
          },
          // 以下解决https 访问问题。上面的可以访问http
          changeOrigin: true,
          secure: false
      }
    }
  }
}