import service from '../utils/requset'

/**职员添加*/
export function staffAdd(data){
    return service.request({
        url:"/staff/add/",
        method:'POST',
        data
    })
}

/**职位详情*/
export function GetStaffDetail(data){
    return service.request({
        url:"/staff/detailed/",
        method:'POST',
        data
    })
}

/**禁启用*/
export function Status(data){
    return service.request({
        url:"/staff/status/",
        method:'POST',
        data
    })
}

/**编辑*/
export function Edit(data){
    return service.request({
        url:"/staff/edit/",
        method:'POST',
        data
    })
}