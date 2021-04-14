import React,{Fragment} from 'react'
import {message,Row,Col,Radio,DatePicker} from 'antd';
//定义语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

//API
import {submitForm} from '@api/common'
import { GetJobDetail } from '@api/job'
import { requestDataFn } from '@api/common.js'  //公用接口请求

import requestUrl from '@api/requestUrl'  //引入接口地址

//导入select的数据
import {face,education,nation} from '@/utils/data.js'
import {checkPhone} from '@/utils/valid_password.js'


 
//引入form组件
import FormCom from '@c/Form'
class StaffAdd extends React.Component{
    constructor(){
        super()
        this.state ={
            job_status:'',  //职位状态
            loading:false,
            id:'',
            selectItem:[],
            FormConfig:{
                url:'staffAdd',
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
                {
                    type:'Column',
                    label:'个人信息'
                },
                {
                    type:'Input',
                    label:'姓名',
                    name:'name',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写姓名'
                },
                
                {
                    type:'Radio',
                    label:'性别',
                    name:'sex',
                    required:true,
                    options:[
                        {label:'男',value:true},
                        {label:'女',value:false},
                    ],
                },
                
                {
                    type:'Input',
                    label:'身份证号',
                    name:'card_id',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写身份证号'
                },
                {
                    type:'Date',
                    label:'出生年月',
                    name:'birthday',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写出生年月',
                    format:'YYYY/MM/DD',
                    mode:'date'
                },
                {
                    type:'Upload',
                    label:'头像',
                    name:'face_img',
                    // required:true,
                },
                {
                    type:'Select',
                    label:'民族',
                    name:'nation',
                    required:true,
                    style:{width:'200px'},
                    options:nation,
                    placeholder:'请选择民族'
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
                    type:'Select',
                    label:'政治面貌',
                    name:'political',
                    required:true,
                    style:{width:'200px'},
                    options:face,
                    placeholder:'请选择政治面貌'
                },
                {
                    type:'Input',
                    label:'毕业院校',
                    name:'school',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写毕业院校'
                },
                {
                    type:'Input',
                    label:'所学专业',
                    name:'major',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写所学专业'
                },
                {
                    type:'Select',
                    label:'学历',
                    name:'education',
                    required:true,
                    style:{width:'200px'},
                    options:education,
                    placeholder:'请选择学历'
                },
                {
                    type:'Input',
                    label:'微信号',
                    name:'wechat',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写微信号'
                },
                {
                    type:'Input',
                    label:'个人邮箱',
                    name:'email',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写个人邮箱'
                },
                {
                    type:'Column',
                    label:'就职信息'
                },
                {
                    type:'SelectComponent',
                    label:'部门名称',
                    url:'departmentListAll',
                    propsKey:{
                        label:'name',
                        value:'id'
                    },
                    name:'departmen_id',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请选择部门'
                },
                {
                    type:'SelectComponent',
                    label:'职位名称',
                    url:'jobListAll',
                    propsKey:{
                        label:'jobName',
                        value:'jobId'
                    },
                    name:'job_id',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请选择职位'
                },
                {
                    type:'Slot',
                    label:'职位状态',
                    name:'job_status',
                    SlotName:'jobStatus',
                    required:true,
                    // style:{width:'200px'}
                },
                // {
                //     type:'FormItemInline',
                //     label:'职位状态',
                //     name:'job_status1',
                //     style:{width:'200px'},
                //     inlineItem:[
                //         {
                //             type:'Date',
                //             label:'入职日期',
                //             name:'job_entry_date',
                //             style:{width:'200px'},
                //             placeholder:'请填写姓名',
                //             col:6
                //         },
                //         {
                //             type:'Date',
                //             label:'转正日期',
                //             name:'job_formal_date',
                //             style:{width:'200px'},
                //             placeholder:'请填写姓名',
                //             col:6
                //         },
                //         {
                //             type:'Date',
                //             label:'离职日期',
                //             name:'job_quit_date',
                //             style:{width:'200px'},
                //             placeholder:'请填写姓名',
                //             col:6
                //         },
                       
                //     ]
                // },
                {
                    type:'Input',
                    label:'公司邮箱',
                    name:'company_email',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写公司邮箱'
                },
                // {
                //     type:'Editor',
                //     label:'描述',
                //     name:'introduce',
                //     style:{width:'800px'},
                // },
                {
                    type:'Input',
                    label:'描述',
                    name:'introduce',
                    style:{width:'200px'},
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
        console.log(333)
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
    onChange = (e)=>{
        this.setState({
            job_status: e.target.value
        })
    }
    

    // updateFn(value){
    //     let requestData = {...value,id:this.state.id}
    //     Editdpartment(requestData).then(res=>{
    //         message.success(res.data.message)
    //         this.refs.Form.resetFields()
    //     })
    // }

    render(){
        
        return (
            <Fragment>
                    <FormCom  formItem ={this.state.formItem} formLayout= {this.state.formLayout} FormConfig ={this.state.FormConfig}  submit = {this.onFinish}>
                        <div  ref='jobStatus'>
                        <Radio.Group value = {this.state.job_status} onChange = {this.onChange} >
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <div >
                                    <Radio value={'online'}>在职</Radio>
                                    <div className='mt-15'></div>
                                    <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div >
                                        <Radio value={'quit'}>离职</Radio>
                                        <div className='mt-15'></div>
                                        <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <div >
                                        <Radio value={'vacation'}>休假</Radio>
                                        <div className='mt-15'></div>
                                        <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                         </Row>
                        </Radio.Group>
                        </div>
                        
                    </FormCom>
            </Fragment>
        )
    }
}

export default StaffAdd;