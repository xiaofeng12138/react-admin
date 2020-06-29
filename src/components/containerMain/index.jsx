import React from 'react'


import UserAdd from '../../views/user/useradd'
import UserList from '../../views/user/userlist'
//私有组价方法 类似导航守卫
import  PrivateRouter from '../../views/layout/privateRouter/index'
import { Switch } from 'react-router-dom'
class ContainerMain extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <Switch>
                <PrivateRouter exact path='/index/user/add' component={UserAdd} />
                <PrivateRouter exact path='/index/user/list' component={UserList} />
            </Switch>
        )
    }
}

export default ContainerMain
