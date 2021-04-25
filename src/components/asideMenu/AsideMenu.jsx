import React from 'react'
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {GetRoleAction} from '../../store/action/App'
import { bindActionCreators } from 'redux';
const { SubMenu } = Menu;

class layoutaside extends React.Component{
    constructor(){
        super()
        this.state ={
            selectedKeys:[],
            openKeys:[],
        }
    }

  

    //组件挂载完成之前 DOM元素渲染完成之后  UNSAFE_componentWillMount
    UNSAFE_componentWillMount (){
        this.props.actions.handlerGetRole().then(res=>{})
    }

    //生命周期钩子函数  使用withRouter  可以获取当前路劲的url
    UNSAFE_componentDidMount(){
        let pathName = this.props.location.pathname
        let openPathName = pathName.split('/').splice(0,3).join('/')
        let meunHigh = {
            selectedKeys:pathName,
            openKeys:openPathName
        }
        this.setMenuHigh(meunHigh)
    }

    selectMenu = ({ item, key, keyPath, domEvent })=>{
        let meunHigh = {
            selectedKeys:key,
            openKeys:keyPath[keyPath.length - 1]
        }
        this.setMenuHigh(meunHigh)
    }

    //打开父集菜单
        openMenu=(openKey)=>{
            this.setState({
                openKeys:[openKey[openKey.length - 1]]
            })
        }

    
    //菜单高亮选中的处理函数
    setMenuHigh = ({selectedKeys,openKeys})=>{
        this.setState({
            selectedKeys:[selectedKeys],
            openKeys:[openKeys]
        })
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
        const {selectedKeys,openKeys} = this.state
        const {routers} = this.props
        return(
            <div>
                <Menu
                    onOpenChange ={this.openMenu}
                    onClick = {this.selectMenu}
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%' }}
                      >
                    {
                        routers && routers.map(firstItem =>{
                            return  firstItem.children && firstItem.children.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    routers:state.config.routers
})

const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators({
           handlerGetRole:GetRoleAction
        },dispatch)
      }
   }
   
export default connect(
       mapStateToProps,
       mapDispatchToProps
   )(withRouter(layoutaside));

