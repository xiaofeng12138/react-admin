import {Login} from '../../api/account'


export function updateRoute(data){
    return {
        type:'setRouter',
        value:data
    }
}

//登录逻辑

export const LoginAction = (data)=>dispatch =>{
    Login(data).then(res=>{
        dispatch(updateRoute(111))
    }).catch(error=>{
        console.log(error)
    })
}

