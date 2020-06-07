import service from '../utils/requset'


export function Login(data){
    return service.request({
        url:"/login/",
        method:'POST',
        data
    })
}

//获取验证码接口
export function getCode(data){
    return service.request({
        url:"/getSms/",
        method:'POST',
        data
    })
}