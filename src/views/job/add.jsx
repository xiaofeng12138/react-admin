import React,{Fragment} from 'react'
import {message} from 'antd';
import {submitForm} from '@api/common'
import requestUrl from '@api/requestUrl'
import { GetJobDetail } from '@api/job'

//引入form组件
import FormCom from '@c/Form'
class departmentAdd extends React.Component{
    constructor(){
        super()
        this.state ={
            loading:false,
            id:'',
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
                {
                    type:'SelectComponent',
                    label:'部门名称',
                    name:'parentId',
                    url:'getDepartmentList',
                    propsKey:{  //自定义option 里面的value 和label的属性
                         value:'id',
                         label:'name'
                    },
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
    }
    
    onFinish = (value )=>{
        this.state.id ? this.updateFn(value) : this.addFn(value)
    }
    

    //添加函数
    addFn=(value)=>{
        let requestData ={
            url:requestUrl[this.state.FormConfig.url],
            data:value
        }
        submitForm(requestData).then(res=>{
            console.log(res)
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
                    <FormCom  formItem ={formItem} formLayout= {this.state.formLayout} FormConfig ={this.state.FormConfig}  />
            </Fragment>
        )
    }
}

export default departmentAdd;