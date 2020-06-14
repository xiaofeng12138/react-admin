import React ,{Fragment } from 'react'
import './index.scss'

import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
//引入获取验证码组件
import Code from '../../components/code/index'
import {validata_passwordFn} from '../../utils/valid_password'

import {Register} from '../../api/account'

class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:'',
            password:'',
            code:'',
            module: 'register'
        }
    }
    onFinish = values => {
         let requsetData ={
               username:this.state.username,
               password:this.state.password,
               code:this.state.code,
           }
       Register(requsetData).then(res=>{
           console.log(res)
           if(res.resCode === 0){
               message.success(res.data.message);
               this.toggleForm()
           }else{
               message.error(res.data.message);
               this.toggleForm()
           }
       }).catch(error=>{
           console.log(error)
           message.error(error.data.message);
       })
    
      };
      toggleForm=()=>{
        //调用父组件的方法
       this.props.switchForm('login')
     }
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

    render(){
        const { username,password,code ,module} = this.state
        return (
                  <Fragment>
                    <div className="formHeader">
                        <h4 className="column">注 册</h4>
                        <span onClick={this.toggleForm}>账号登录</span>
                    </div>
                    <div className="fromContentt">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item name="username" rules={[
                            { required: true, message: '邮箱不能为空！！' },
                            {type:'email',message: '请输入正确的邮箱'}
                        ]}>
                            <Input value={username} onChange={this.getUserName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="请输入邮箱"/>
                        </Form.Item>

                        <Form.Item name="password" rules={[
                            { required: true, message: '密码不能为空' },
                            ({getFieldValue}) => ({
                                validator(role,value){
                                    if(!validata_passwordFn(value)){
                                          return Promise.reject('密码格式不正确！！')
                                    }
                                    if(getFieldValue('repassword') && value !== getFieldValue('repassword')){
                                          return Promise.reject('两次输入不一致')
                                    }
                                     return Promise.resolve()
                                }
                            })
                        ]}>
                            <Input value={password} onChange={this.getPassword} prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item name="repassword" rules={[
                            { required: true, message: '确认密码不能为空' },
                              ({getFieldValue}) => ({
                             
                                validator(role,value){
                                    if(value !== getFieldValue('password')){
                                          return Promise.reject('两次输入密码不一致')
                                    }
                                     return Promise.resolve()
                                }
                            })
                        ]}>
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="请输入确认密码"/>
                        </Form.Item>

                          <Form.Item  name="code" rules={[
                              { required: true, message: '验证码不能为空' }
                            ]} >
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
                            <Button type="primary" htmlType="submit" block className="login-form-button" >注 册</Button>
                        </Form.Item>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}


export default RegisterForm