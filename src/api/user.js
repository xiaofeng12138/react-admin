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


/**用户详情*/
export function GetDetailed(data){
    return service.request({
        url:"/user/detailed/",
        method:'POST',
        data
    })
}


/**用户编辑*/
export function editUser(data){
    return service.request({
        url:"/user/edit/",
        method:'POST',
        data
    })
}



/**用户角色*/
export function getUserRole(data){
    return service.request({
        url:"/user/role/",
        method:'POST',
        data
    })
}

