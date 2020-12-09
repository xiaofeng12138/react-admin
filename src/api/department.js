import service from '../utils/requset'

/**部门添加*/
export function DepartmentAddApi(data){
    return service.request({
        url:"/department/add/",
        method:'POST',
        data
    })
}

/**部门列表*/
export function GetdepartmentList(data){
    return service.request({
        url:"/department/list/",
        method:'POST',
        data
    })
}

/**部门删除*/
export function Deletepartment(data){
    return service.request({
        url:"/department/delete/",
        method:'POST',
        data
    })
}

/**部门状态*/
export function Statuspartment(data){
    return service.request({
        url:"/department/status/",
        method:'POST',
        data
    })
}

/**部门详情*/
export function Detailedpartment(data){
    return service.request({
        url:"/department/detailed/",
        method:'POST',
        data
    })
}


/**部门编辑*/
export function Editdpartment(data){
    return service.request({
        url:"/department/edit/",
        method:'POST',
        data
    })
}

