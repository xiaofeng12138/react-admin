import React from 'react'
import './header.scss'
import {MenuUnfoldOutlined } from '@ant-design/icons'

class layoutheader extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
    toggleMenu =()=>{
        this.props.toggle()
    }
    render(){
        return(
            <span className='toggle_icon' onClick={this.toggleMenu}><MenuUnfoldOutlined /></span>
        )
    }
}

export default layoutheader
