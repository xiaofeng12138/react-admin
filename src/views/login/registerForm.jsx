import React ,{Fragment } from 'react'
import './index.scss'

import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
//引入获取验证码组件
import Code from '../../components/code/index'

class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state ={
            username:''
        }
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
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

    render(){
        const { username } = this.state
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
                        onFinish={()=> this.onFinish}
                        >
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input value={username} onChange={this.getUserName} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Username"/>
                        </Form.Item>

                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="password"/>
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Username!' }]}>
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} placeholder="password"/>
                        </Form.Item>

                          <Form.Item  name="code" rules={[{ required: true, message: 'Please input your Username!' }]} >
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
                            <Button type="primary" htmlType="submit" block className="login-form-button">注 册</Button>
                        </Form.Item>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}


export default RegisterForm