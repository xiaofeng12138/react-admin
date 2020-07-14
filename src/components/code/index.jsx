import React, { Component} from 'react'
import { message,Button } from 'antd';
import {getCode} from '../../api/account'
import { validata_email} from '../../utils/valid_password'
let timer = null;

class Code extends Component{
    constructor(props){
        super(props)
        this.state ={
            username:'',
            code_button_text:'获取验证码',
            code_button_loading:false,
            code_button_disabled:false,
            module:props.module
        }
    }

    //获取props生命周期函数
    componentWillReceiveProps({username}){
        this.setState({
            username
        })
    }
    //点击获取验证码函数
     getCodeFn=()=>{
         let username = this.state.username
        if(!username){
             message.warning('邮箱不能为空',1);
             return false;
        }
        if(!(validata_email(username))){
            message.warning('邮箱格式不正确',1);
            return false;
        }
        this.setState({
          code_button_text:'发送中',
          code_button_loading:true
        })
        let requestData = {
            module: this.state.module,
            username
        }
        getCode(requestData).then(res=>{
           if(res.data.resCode === 0){
              message.success(res.data.message);
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
    componentWillUnmount(){
        clearInterval(timer)
    }

    render(){
       return  <Button type="danger" disabled ={this.state.code_button_disabled} block loading={this.state.code_button_loading}  onClick={this.getCodeFn}>{this.state.code_button_text}</Button>
    }
}

export default Code;