import service from '../utils/requset'


export function LoadTable(params){
    return service.request({
        url:params.url,
        method:params.method || 'POST',
        data:params.data
    })
}


//删除接口
export function DeleteTable(params){
    return service.request({
        url:params.url,
        method:params.method || 'POST',
        data:params.data
    })
}


//Form 公用 接口
export function submitForm(params){
    return service.request({
        url:params.url,
        method:params.method || 'POST',
        data:params.data
    })
}


//公用请求接口
export function requestDataFn(params){
    return service.request({
        url:params.url,
        method:params.method || 'POST',
        data:params.data
    })
}


//七牛云获取Token接口
export function uploadToken(data){
    return service.request({
        url:'/uploadIToken/',
        method:'POST',
        data
    })
}



