import React,{Fragment} from 'react'
import {message,Row,Col,Radio,DatePicker} from 'antd';
//定义语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

//API
import {submitForm} from '@api/common'
import { GetJobDetail } from '@api/job'
import { requestDataFn ,Upload} from '@api/common.js'  //公用接口请求

import requestUrl from '@api/requestUrl'  //引入接口地址

//导入select的数据
import {face,education,nation} from '@/utils/data.js'
import {checkPhone} from '@/utils/valid_password.js'

//引入富文本
import { Editor } from '@tinymce/tinymce-react'

 
//引入form组件
import FormCom from '@c/Form'
class StaffAdd extends React.Component{
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
                {
                    type:'Column',
                    label:'个人信息'
                },
                {
                    type:'Input',
                    label:'姓名',
                    name:'1',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写姓名'
                },
                {
                    type:'Radio',
                    label:'性别',
                    name:'status',
                    required:true,
                    options:[
                        {label:'男',value:true},
                        {label:'女',value:false},
                    ],
                },
                
                {
                    type:'Input',
                    label:'身份证号',
                    name:'2',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写身份证号'
                },
                {
                    type:'Date',
                    label:'出生年月',
                    name:'3',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写出生年月',
                    format:'YYYY/MM/DD',
                    mode:'date'
                },
                {
                    type:'Upload',
                    label:'头像',
                    name:'a34',
                    required:true,
                },
                {
                    type:'Select',
                    label:'民族',
                    name:'4',
                    required:true,
                    style:{width:'200px'},
                    options:nation,
                    placeholder:'请选择民族'
                },
                {
                    type:'Input',
                    label:'手机号码',
                    name:'a1',
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
                    name:'333',
                    required:true,
                    style:{width:'200px'},
                    options:face,
                    placeholder:'请选择政治面貌'
                },
                {
                    type:'Input',
                    label:'毕业院校',
                    name:'5',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写毕业院校'
                },
                {
                    type:'Input',
                    label:'所学专业',
                    name:'6',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写所学专业'
                },
                {
                    type:'Select',
                    label:'学历',
                    name:'7',
                    required:true,
                    style:{width:'200px'},
                    options:education,
                    placeholder:'请选择学历'
                },
                {
                    type:'Input',
                    label:'微信号',
                    name:'8',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写微信号'
                },
                {
                    type:'Input',
                    label:'个人邮箱',
                    name:'9',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写个人邮箱'
                },
                {
                    type:'Column',
                    label:'就职信息'
                },
                {
                    type:'Select',
                    label:'职位',
                    name:'01',
                    required:true,
                    style:{width:'200px'},
                    options:[
                        {value:'1',label:'前端'},
                        {value:'2',label:'后端'},
                    ],
                    placeholder:'请选择职位'
                },
                {
                    type:'Slot',
                    label:'职位状态',
                    name:'15',
                    SlotName:'jobStatus',
                    required:true,
                    // style:{width:'200px'}
                },
                {
                    type:'Input',
                    label:'公司邮箱',
                    name:'19',
                    required:true,
                    style:{width:'200px'},
                    placeholder:'请填写公司邮箱'
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
    
    //富文本编辑事件
    handleEditorChange =(value)=>{
        console.log(value)
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
        const editorObj={
            height: '800px',
            language: 'zh_CN',
            plugins: 'table lists link image preview code',
            toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
            relative_urls: false,
            file_picker_types: 'image',
            images_upload_url: 'http',
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler:(blobInfo, success, failure)=>{
                var formData;
                var file = blobInfo.blob();//转化为易于理解的file对象
                formData = new FormData();
                formData.append('file', file, file.name );//此处与源文档不一样
                
                Upload(formData).then(response => {
                    console.log(response.data.data)
                    const data = response.data.data.url;
                    success(data);
                }).catch((error)=>{
                    const data = response.data
                    failure(data.message)
                })
            }
        }
        return (
            <Fragment>
                    <FormCom  formItem ={formItem} formLayout= {this.state.formLayout} FormConfig ={this.state.FormConfig} >
                        <div  ref='jobStatus'>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <div >
                                    <Radio value={1}>在职</Radio>
                                    <div className='mt-15'></div>
                                    <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                            <div >
                                    <Radio value={1}>离职</Radio>
                                    <div className='mt-15'></div>
                                    <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={8}>
                            <div >
                                    <Radio value={1}>休假</Radio>
                                    <div className='mt-15'></div>
                                    <DatePicker size={'default'} locale ={locale} />
                                </div>
                            </Col>
                        </Row>
                        </div>
                        
                    </FormCom>
                    <Editor
                            inline={false}
                            selector='editorStateRef'  // 选择器
                            apiKey='官网上申请的key值'
                            initialValue={"1111"}
                            init={{...editorObj}}
                            onEditorChange={this.handleEditorChange}
                            />
            </Fragment>
        )
    }
}

export default StaffAdd;