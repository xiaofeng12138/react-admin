import service from '../utils/requset'

/**职位详情*/
export function GetJobDetail(data){
    return service.request({
        url:"/job/detailed/",
        method:'POST',
        data
    })
}

/**禁启用*/
export function Status(data){
    return service.request({
        url:"/job/status/",
        method:'POST',
        data
    })
}