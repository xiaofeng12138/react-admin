import React,{ Component } from 'react'
import { message, Modal } from 'antd';
import FormCom from '@c/Form/index'
import {checkPhone} from '@/utils/valid_password.js'
import { UserAdd } from '../../api/user';
class UserAddModal extends Component{

    constructor(props){
        super(props)
        this.state ={
            isModalVisible:false,
            FormConfig:{
                url:'departmentAdd',
                initialValues:{
                    number:0,
                    status:true
                },
                setFieldsValue:{},
            },
            formLayout:{
                labelCol:{span:5},
                wrapperCol:{span:10}
            },
            tailLayout:{
              wrapperCol: { offset: 2, span: 2 },
            },
            formItem:[
                {type:'Input',label:'用户名',name:'username',required:true,style:{width:'200px'},placeholder:'请输入邮箱'},
                {type:'Input',label:'真实姓名',name:'truename',required:true,style:{width:'200px'},placeholder:'请输入真实姓名'},
                {
                    type:'Input',
                    label:'密码',
                    name:'password',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请输入密码',
                },
                {
                    type:'Input',
                    label:'手机号码',
                    name:'phone',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写手机号',
                    rules:[
                        ()=>({
                            validator(rule,value){
                                if(checkPhone(value)){
                                    return  Promise.resolve()
                                }
                                return  Promise.reject('手机号格式有误')
                            }
                        })
                    ]

                },
                {
                    type:'Radio',
                    label:'禁启用',
                    name:'status',
                    required:true,
                    options:[
                        {label:'启用',value:true},
                        {label:'禁用',value:false},
                    ],
                },
            ]
        }
    }

    componentDidMount(){
       this.props.onRef(this)
    }

    handleOk=()=>{}

    visibleModal =(status)=>{
        
       
        this.setState({
            isModalVisible: status
        })
       
    }

    handleCancel=()=>{
       this.visibleModal(false)
       this.child.onReset() //关闭弹窗 重置表单函数
    }

    onFinish=(value)=>{
        UserAdd(value).then(res=>{
            message.success(res.data.message)
            this.visibleModal(false)
        })
    }
    onFormRef=(ref)=>{
       this.child = ref
    }


   
    render(){
        const {isModalVisible } = this.state
            return (
                <Modal title="用户添加" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer ={null}>
                     <FormCom 
                      formItem ={this.state.formItem}
                      formLayout= {this.state.formLayout} 
                      FormConfig ={this.state.FormConfig}
                      onFinish ={this.onFinish} 
                      onRef ={this.onFormRef}
                     />
                </Modal>
            )
    }
}

export default UserAddModal