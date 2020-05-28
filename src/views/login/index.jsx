import React from 'react'
import './index.scss'

import LoginForm from './loginForm.jsx'
import RegisterForm from './registerForm.jsx'

class Login extends React.Component{
    constructor(){
        super()
        this.state ={
            formType:'login'
        }
    }
    onFinish = values => {
        console.log('Received values of form: ', values);
      };

      switchForm =(value)=>{
         this.setState({
            formType:value
         })
      }

    render(){
        return (
            <div className='formWrap'>
                <div>
                    {
                        this.state.formType === 'login'? <LoginForm switchForm ={this.switchForm}> </LoginForm>: <RegisterForm switchForm ={this.switchForm}></RegisterForm >
                    }
                </div>
              
            </div>
        )
    }
}


export default Login