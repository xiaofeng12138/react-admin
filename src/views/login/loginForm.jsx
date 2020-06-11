import React ,{Fragment } from 'react'
import './index.scss'

import { Form, Input, Button, Row, Col, } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import {valid_password} from '../../utils/valid_password'
import {Login} from '../../api/account'

//引入获取验证码组件
import Code from '../../components/code/index'

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:'',
        }
    }
    onFinish = values => {
        Login().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        console.log('Received values of form: ', values);
      };

     

    
      //获取输入框邮箱
      getUserName =(e)=>{
          let emailValue = e.target.value
          this.setState({
              username:emailValue
          })
      }

      toggleForm=()=>{
          //调用父组件的方法
       this.props.switchForm('register')
    }

    render(){
        const { username } = this.state
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
                            <Input value={username} onChange={this.getUserName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="email"/>
                        </Form.Item>

                        <Form.Item name="password" rules={
                            [
                                { required: true, message: '密码不能为空' },
                                {pattern:valid_password,message: '数字+密码且长度大于6位小于20位'}
                            ]
                        }>
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="password"/>
                        </Form.Item>

                        <Form.Item  name="code" rules={
                            [
                                { required: true, message: '验证码不能为空' }
                            ]
                        } >
                            <Row gutter={13}>
                                <Col span={15} >
                                   <Input prefix={<LockOutlined  className="site-form-item-icon" />}  placeholder="code"/>
                                </Col>
                                <Col span={9} >
                                    <Code username = {username} />
                                   
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


export default LoginForm