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
