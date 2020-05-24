import React from 'react'
// import {Switch,Route,Router} from 'react-router-dom'
import { Button } from 'antd';
import MyNav from './MyNav'

class Home extends React.Component{
    constructor(){
        super()
        this.setState ={}
    }

    render(){
        const nav1 = ['天明','少羽','高月']
        const nav2 = ['雪女','石兰','少少']
        return(
            <div>
                 <Button type="primary">Primary</Button>
                 这是一个首页的页面

                <MyNav nav ={nav1} />
                <MyNav nav ={nav2} />
            </div>
            
        )
    }
}


export default Home