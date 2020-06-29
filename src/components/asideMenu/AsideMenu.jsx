import React from 'react'
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Router from '../../router/router'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;




class layoutaside extends React.Component{
    constructor(){
        super()
        this.state ={}
    }

    //无子集菜单处理
    renderMenu =({key,title})=>{
       return  <Menu.Item key={key}>
           <Link to={key}>
               <span>{title}</span>
           </Link>
           </Menu.Item>
    }

     //有子集菜单处理
    renderSubMenu =({key,title,children})=>{
         return (
            <SubMenu key={key} icon={ <UserOutlined />} title={title}>
              {
                  children && children.map((item)=>{
                     return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                  })
              }
        </SubMenu>
         )  
    }
    render(){
        return(
            <div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                      >
                    {
                        Router && Router.map(firstItem =>{
                            return  firstItem.children && firstItem.children.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                </Menu>
            </div>
        )
    }
}

export default layoutaside
