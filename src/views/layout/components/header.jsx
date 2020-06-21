import React from 'react'
import './header.scss'

class layoutheader extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <div className='logo'>
                <h1><span></span></h1>
            </div>
        )
    }
}

export default layoutheader
