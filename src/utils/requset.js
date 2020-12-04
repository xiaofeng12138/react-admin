import axios from 'axios'
import {getToken,getUsername} from './cookies'
import { message } from 'antd';
//第一步创建实例

const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 50000,
  });

  //第二步请求拦截
  service.interceptors.request.use(function (config) {
    //添加请求头信息
    config.headers["Token"] = getToken()
    config.headers["Username"] = getUsername()
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  //第三步 响应拦截
  service.interceptors.response.use(function (response) {
    //全局性请求拦截
    let data = response.data
    if(data.resCode !== 0){  //响应错误的情况
      message.error(data.message)
      return Promise.reject(data)
    }else{
      return response;
    }
  }, function (error) {
      return Promise.reject(error);
  });


  export default service;