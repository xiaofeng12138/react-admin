const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(createProxyMiddleware("/devApi",{
      target:"http://www.web-jshtml.cn/api/react",  //配置服务器的请求地址
      changeOrigin:true,
      pathRewrite:{
          "^/devApi":""
      }
  }))
}