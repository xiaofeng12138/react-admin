import React from 'react'
import './aside.scss'
import AsideMenu from '../../../components/asideMenu/AsideMenu'


class layoutaside extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <div >
                 <AsideMenu />
            </div>
        )
    }
}

export default layoutaside
