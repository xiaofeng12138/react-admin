import React ,{Fragment } from 'react'
import './index.scss'
import { withRouter } from "react-router-dom";  //添加白名单

import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import {valid_password} from '../../utils/valid_password'
import {Login} from '../../api/account'
//导入存储函数
import {setToken} from '../../utils/token.js'

//引入获取验证码组件
import Code from '../../components/code/index'

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:'',
            password:'',
            code:'',
            module: 'login'
        }
    }
    onFinish = values => {
        let requestData = {
            username:this.state.username,
            password:this.state.password,
            code:this.state.code,
        }
        Login(requestData).then(res=>{
            if(res.data.resCode === 0){
               message.success(res.data.message)
            }
            const token = res.data.data.token
            setToken(token)
            this.props.history.push('/index')
        }).catch(err=>{
            console.log(err)
        })
      };
      //获取输入框邮箱
      getUserName =(e)=>{
          let emailValue = e.target.value
          this.setState({
              username:emailValue
          })
      }
       //获取输入框密码
      getPassword =(e)=>{
          let password = e.target.value
          this.setState({
              password
          })
      }
       //获取输入框验证码
      getCode =(e)=>{
          let code = e.target.value
          this.setState({
              code
          })
      }

      toggleForm=()=>{
          //调用父组件的方法
       this.props.switchForm('register')
    }

    render(){
        const { username,password,code,module } = this.state
        return (
                  <Fragment>
                    <div className="formHeader">
                        <h4 className="column">登 录</h4>
                        <span onClick={this.toggleForm}>账号注册</span>
                    </div>
                    <div className="fromContentt">

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item name="username" rules={
                            [
                                { required: true, message: '邮箱不能为空' },
                                {type:'email',message: '请输入正确的邮箱'}
                            ]
                        }>
                            <Input value={username} onChange={this.getUserName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="请输入邮箱"/>
                        </Form.Item>

                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空' },
                                {pattern:valid_password,message: '数字+密码且长度大于6位小于20位'}
                            ]
                        }>
                            <Input value={password} onChange={this.getPassword} prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="请输入密码"/>
                        </Form.Item>

                        <Form.Item  name="code" rules={
                            [
                                { required: true, message: '验证码不能为空' }
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15} >
                                   <Input value={code} onChange={this.getCode} prefix={<LockOutlined  className="site-form-item-icon" />}  placeholder="请输入验证码"/>
                                </Col>
                                <Col span={9} >
                                    <Code username = {username} module = {module} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" block className="login-form-button">登 录</Button>
                        </Form.Item>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}


export default withRouter(LoginForm)