import React,{ Component } from 'react'
import { message, Modal ,Checkbox } from 'antd';
import FormCom from '@c/Form/index'
import {checkPhone} from '@/utils/valid_password.js'
import { UserAdd,GetDetailed,editUser } from '../../api/user';
import {GetUserRole} from '@/api/role'
class UserAddModal extends Component{

    constructor(props){
        super(props)
        this.state ={
            roleOptions:[],
            isModalVisible:false,
            showTitle:'用户新增',
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
                    required:false,
                    value_Type:'password',
                    shouldUpdate:true,
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
                {
                    type:'Slot',
                    label:'权限',
                    name:'role',
                    // required:true,
                    slotName:'roleCheckBox'
                },
            ],
            user_id:"",
            chooseRoleArr:[]
        }
    }

    componentDidMount(){
       this.props.onRef(this)
    }

    handleOk=()=>{}

    visibleModal =(params)=>{
        if(params.User_id){
            this.setState({
                isModalVisible: params.status,
                user_id:params.User_id,
                showTitle:"编辑用户"
            },()=>{
                this.getDetailedFn()
                this.updateItem(params.User_id)
            })
        }else{
            this.setState({
                isModalVisible: params.status,
                user_id:'',
                showTitle:"新增用户"
            },)
        }
        this.GetUserFn()
    }

    //获取用户权限函数
    GetUserFn =()=>{
        GetUserRole().then(res=>{
            let data = res.data.data
            this.setState({
                roleOptions:data
            })
        })
    }

    //修改数据对象
    updateArrayItem = (index,key)=>{
        this.setState({
            formItem : this.state.formItem.map((item,_index )=>index.includes(_index) ? {...item,...key[index] }: item )
        })
    }

    //修改对象
    updateItem = (id)=>{
        this.updateArrayItem(
            [2],
            {
               2:{
                   required: id ? false : true,
               }
            }
        )
    }

    //获取详情
    getDetailedFn =()=>{
        if(! this.state.user_id ) return false
        GetDetailed({id:this.state.user_id}).then(res=>{
            let newStr = res.data.data.role
            this.setState({
                FormConfig:{
                    setFieldsValue:res.data.data,
                }   ,
                chooseRoleArr:newStr ? newStr.split(','):[] 
            })
        })
    }

    handleCancel=()=>{
       this.visibleModal(false)
       this.child.onReset() //关闭弹窗 重置表单函数
    }

    onFinish=(value)=>{
        this.state.user_id ? this.handEdit(value) : this.AddFn(value)
        
    }
    onFormRef=(ref)=>{
       this.child = ref
    }

    AddFn =(value)=>{
        let roleStr = this.state.chooseRoleArr ? this.state.chooseRoleArr.join():''
        value.role = roleStr
        UserAdd(value).then(res=>{
                message.success(res.data.message)
                this.visibleModal(false)
            })
    }

    handEdit =(value)=>{
        let roleStr = this.state.chooseRoleArr ? this.state.chooseRoleArr.join():''
        value.id = this.state.user_id
        value.role = roleStr
        editUser(value).then(res=>{
            message.success(res.data.message)
            this.visibleModal(false)
        })
    }

    //rolechange时间
    onChange= (value)=>{
        this.setState({
            chooseRoleArr: value
        })
    }


   
    render(){
        const {isModalVisible,showTitle,roleOptions ,chooseRoleArr} = this.state
            return (
                <Modal  title={showTitle} visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} footer ={null} maskClosable={false}>
                     <FormCom 
                        formItem ={this.state.formItem}
                        formLayout= {this.state.formLayout} 
                        FormConfig ={this.state.FormConfig}
                        onFinish ={this.onFinish} 
                        onRef ={this.onFormRef}
                     >
                            <div ref='roleCheckBox'>

                            <Checkbox.Group
                                options={roleOptions}
                                onChange={this.onChange}
                                value ={chooseRoleArr}
                                />
                            </div>
                   </FormCom> 
                     
                </Modal>
            )
    }
}

export default UserAddModal