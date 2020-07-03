import React from 'react'
import { Layout } from 'antd';
import LayoutHeader from './components/header'
import LayoutAside from './components/aside'
import ContainerMain from '../../components/containerMain/index'

import './index.scss'
const { Header, Sider, Content } = Layout;

class Index extends React.Component{
    constructor(){
        super()
        this.state ={
            collapsed:false
        }
    }
    componentDidMount=()=>{
        let collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({
            collapsed
        })
    }
    toggleCollasped = ()=>{
        let collapsed = !this.state.collapsed
        this.setState({ collapsed })
        sessionStorage.setItem('collapsed',collapsed)
    }
    render(){
        return(
            <div>
                   <Layout className='layout-wrap'>
                   <Sider collapsed={this.state.collapsed}  width='250px' className='aside'><LayoutAside /></Sider>
                        <Layout>
                            <Header  className='layout-header'  >
                                <LayoutHeader toggle = {this.toggleCollasped} />
                            </Header>
                            <Content className='layout-content'>
                                <ContainerMain />
                            </Content>
                        </Layout>
                    </Layout>

            </div>
        )
    }
}

export default Index
