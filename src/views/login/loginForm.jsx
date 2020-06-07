import React ,{Fragment } from 'react'
import './index.scss'

import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import {valid_password} from '../../utils/valid_password'
import {Login,getCode} from '../../api/account'

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:'',
            code_button_text:'获取验证码',
            code_button_loading:false,
            code_button_disabled:false,
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

      //点击获取验证码函数
      getCodeFn=()=>{
          if(!(this.state.username)){
               message.warning('邮箱不能为空',1);
               return false;
          }
          this.setState({
            code_button_text:'发送中',
            code_button_loading:true
          })
          let requestData = {
              module: 'login',
              username:this.state.username
          }
          getCode(requestData).then(res=>{
             if(res.data.resCode === 0){
                this.countDown()
             }
          }).catch((err)=>{
              this.setState({
                    code_button_text:'重新获取',
                    code_button_loading:false,
                })
          })
      }

      //倒计时函数
      countDown=()=>{
          let sec = 10;
          let timer = null;
          
          timer = setInterval(() => {
              sec--;
              this.setState({
                code_button_text:`${sec}S`,
                code_button_loading:false, 
                code_button_disabled:true,
            })
              if(sec <= 0){
                this.setState({
                    code_button_text:`重新获取`,
                    code_button_disabled:false,
                })
                clearInterval(timer)
              }
          }, 1000);

      }
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
        const { username,code_button_text,code_button_loading,code_button_disabled } = this.state
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
                                   <Button type="danger" disabled ={code_button_disabled} block loading={code_button_loading}  onClick={this.getCodeFn}>{code_button_text}</Button>
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