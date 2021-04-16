import service from '../utils/requset'

/**添加*/
export function UserAdd(data){
    return service.request({
        url:"/user/add/",
        method:'POST',
        data
    })
}

/**添加*/
export function Status(data){
    return service.request({
        url:"/user/status/",
        method:'POST',
        data
    })
}

