import React from 'react'
import { Layout } from 'antd';
import LayoutHeader from './components/header'
import LayoutAside from './components/aside'

import './index.scss'
const { Header, Sider, Content } = Layout;

class Index extends React.Component{
    constructor(){
        super()
        this.state ={}
    }
    render(){
        return(
            <div>
                   <Layout className='layout-wrap'>
                    <Header className='layout-header'>
                        <LayoutHeader />
                    </Header>
                        <Layout>
                            <Sider width='250px' className='aside'><LayoutAside /></Sider>
                            <Content className='layout-content'>Content</Content>
                        </Layout>
                    </Layout>

            </div>
        )
    }
}

export default Index
