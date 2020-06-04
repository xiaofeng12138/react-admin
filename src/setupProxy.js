const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(createProxyMiddleware([process.env.REACT_APP_API],{
      target:process.env.REACT_APP_BASE_URL,  //配置服务器的请求地址
      changeOrigin:true,
      pathRewrite:{
        [`^${process.env.REACT_APP_API}`]:''
          // "^/devApi":""
      }
  }))
}