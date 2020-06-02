import service from '../utils/requset'


export function Login(data){
    return service.request({
        url:"/login/",
        method:'POST',
        data
    })
}