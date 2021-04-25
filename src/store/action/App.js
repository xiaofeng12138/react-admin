import {Login} from '../../api/account'
import {getUserRole} from '../../api/user'
import { message } from 'antd';

import Router from '../../router/router'
import {setToken,setUsername} from '../../utils/cookies'

export function updateRoute(data){
    return {
        type:'setRouter',
        value:data
    }
}


export function  hasPresession (role,router){
    if(router.role && router.role.length > 0){
        return role.some(ele => router.role.indexOf(ele) >= 0)
    }
}

//登录逻辑

export const LoginAction = (data)=>dispatch =>{
   return Login(data).then(res=>{
       message.success(res.data.message)
       const token = res.data.data.token
        setToken(token)
        setUsername(res.data.data.username)

    }).catch(error=>{
        console.log(error)
    })
}


//处理用户权限逻辑

export const GetRoleAction = (data)=>dispatch =>{
    return getUserRole(data).then(res=>{
         const role = res.data.data.role.split(',')
         let routerArray = []
 
        if(role.includes('admin')){
           routerArray = Router
        }else{
             routerArray = Router.filter((item)=>{
                 //递归实现数据返回 
                 if(hasPresession(role,item)){
                     if(item.children && item.children.length >0){
                         item.children = item.children.filter((child)=>{
                             if(hasPresession(role,child)){
                                 return child
                             }
                             return false
                         })
                         return item
                     }
                     return item
                 } 
                 return false
             })
 
        }
      
       dispatch(updateRoute(routerArray))
 
     }).catch(error=>{
         console.log(error)
     })
 }

