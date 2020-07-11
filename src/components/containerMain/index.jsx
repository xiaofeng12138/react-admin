import React from 'react'

//私有组件方法 类似Vue导航守卫
import  PrivateRouter from '../../views/layout/privateRouter/index'
import { Switch } from 'react-router-dom'
import Components from './components.js'

class ContainerMain extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <Switch>
               {
                    Components.map(item =>{
                      return  <PrivateRouter exact key={item.path}  path = {item.path} component={item.component} />
                   })
               }
            </Switch>
        )
    }
}

export default ContainerMain
