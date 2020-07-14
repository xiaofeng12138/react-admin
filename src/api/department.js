import service from '../utils/requset'


export function DepartmentAddApi(data){
    return service.request({
        url:"/department/add/",
        method:'POST',
        data
    })
}
