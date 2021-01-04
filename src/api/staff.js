import service from '../utils/requset'

/**职员添加*/
export function staffAdd(data){
    return service.request({
        url:"/staff/add/",
        method:'POST',
        data
    })
}