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
                {/* <div className='logo'>
                    <h1><span>1111</span></h1>
                </div> */}
                 <AsideMenu />
            </div>
        )
    }
}

export default layoutaside
