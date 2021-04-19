import React from 'react'
import './header.scss'
import {MenuUnfoldOutlined} from '@ant-design/icons'
import {Col,Row,Modal} from 'antd'
import { Fragment } from 'react'
import { withRouter } from "react-router-dom";  //添加白名单
import  {removeToken,removeUsername} from '@/utils/cookies'
class layoutheader extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            style:{
                cursor:'pointer'
            },
            visible:false
        }
    }
    toggleMenu =()=>{
        this.props.toggle()
    }

    //用户退出
    logout =()=>{
        this.setState({
            visible:true
        })
    }

    hideModal = ()=>{
        this.setState({
            visible:false
        })
    }
    SunmitLogout =()=>{
        removeToken()
        removeUsername()
        this.props.history.push('/')
    }
    HandSubmit = ()=>{
        this.SunmitLogout()
    }
    render(){
        return(
            <Fragment>
                <Row>
                    <Col span={23}> <span className='toggle_icon' onClick={this.toggleMenu}><MenuUnfoldOutlined /></span></Col>
                    <Col span={1}>
                        <div onClick ={ this.logout } style ={this.state.style}>退出</div>
                    </Col>
                </Row>

                <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={this.HandSubmit}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                        closable = { false }
                        >
                        <p>是否确认退出</p>
                </Modal>
              
            </Fragment>
        )
    }
}

export default withRouter(layoutheader)
