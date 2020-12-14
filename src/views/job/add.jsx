import React,{Fragment} from 'react'
import {message,Select} from 'antd';

//API
import {submitForm} from '@api/common'
import { GetJobDetail } from '@api/job'
import { requestDataFn } from '@api/common.js'  //公用接口请求

import requestUrl from '@api/requestUrl'  //引入接口地址

//引入form组件
import FormCom from '@c/Form'
const { Option } = Select;
class departmentAdd extends React.Component{
    constructor(){
        super()
        this.state ={
            loading:false,
            id:'',
            selectItem:[],
            FormConfig:{
                url:'jobAdd',
                editKey:'',  //修改的key
                initialValues:{
                    number:0,
                    status:true
                },
                setFieldsValue:{},
                format:'parentId', //处理字符串

            },
            formLayout:{
                labelCol:{span:2},
                wrapperCol:{span:10}
            },
            tailLayout:{
              wrapperCol: { offset: 2, span: 2 },
            },
            formItem:[
                // {type:'Input',label:'部门名称',name:'parentId',required:true,style:{width:'200px'},placeholder:'请选择部门名称'},
                // {
                //     type:'SelectComponent',
                //     label:'部门名称',
                //     name:'parentId',
                //     url:'getDepartmentList',
                //     propsKey:{  //自定义option 里面的value 和label的属性
                //          value:'id',
                //          label:'name'
                //     },
                //     required:true,
                //     style:{width:'200px'}
                // },
                {
                    type:'Slot',
                    label:'部门名称',
                    name:'parentId',
                    SlotName:'department',
                    required:true,
                    style:{width:'200px'}
                },
                {type:'Input',label:'职位名称',name:'jobName',required:true,style:{width:'200px'},placeholder:'请填写职位名称'},
                
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
                    type:'TextArea',
                    label:'职位描述',
                    name:'content',
                    row:6,
                    style:{width:'500px'}
                },
            ]
        }
    }

    componentWillMount(){
        if(this.props.location.state){
            let id = this.props.location.state.id
            this.setState({
                id,
            })
        }
    }

    componentDidMount(){
         this.getDetailedFn()
         this.GetSelectList()
    }
    
    onFinish = (value )=>{
        this.state.id ? this.updateFn(value) : this.addFn(value)
    }
    

    //获取部门列表
    GetSelectList(){
        const params ={
            url:requestUrl['getDepartmentList'],
            data:{}
        }
        requestDataFn(params).then(res=>{
            this.setState({
                selectItem:res.data.data.data
            })
        })
    }
    

    //添加函数
    addFn=(value)=>{
        let requestData ={
            url:requestUrl[this.state.FormConfig.url],
            data:value
        }
        submitForm(requestData).then(res=>{
            message.success(res.data.message)
        })
    }

    //获取部门详情函数
    getDetailedFn(){
        let id = this.state.id
        if(id){
            GetJobDetail({id}).then(res=>{
                this.setState({
                   FormConfig:{
                        ...this.state.FormConfig,
                        setFieldsValue:res.data.data,
                        url:'jobEdit',
                        editKey:'jobId'
                   }
                })
            })
        }
    }

    // updateFn(value){
    //     let requestData = {...value,id:this.state.id}
    //     Editdpartment(requestData).then(res=>{
    //         message.success(res.data.message)
    //         this.refs.Form.resetFields()
    //     })
    // }

    render(){
        const { formItem } = this.state
        return (
            <Fragment>
                    <FormCom  formItem ={formItem} formLayout= {this.state.formLayout} FormConfig ={this.state.FormConfig} >
                        <Select ref='department'>
                                        {
                                            this.state.selectItem && this.state.selectItem.map((ele,index)=>{
                                                return <Option value = {ele.id} key = {index} >{ele.name}</Option>
                                            })
                                        }
                        </Select>
                    </FormCom>
            </Fragment>
        )
    }
}

export default departmentAdd;