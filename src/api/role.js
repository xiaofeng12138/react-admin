import service from '../utils/requset'

/**添加*/
export function GetUserRole(data){
    return service.request({
        url:"/role/",
        method:'POST',
        data
    })
}
