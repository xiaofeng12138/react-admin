import React,{Fragment} from 'react'
import {message} from 'antd';
import {DepartmentAddApi,Detailedpartment,Editdpartment} from '../../api/department'

//引入form组件
import FormCom from '@c/Form/index'
class departmentAdd extends React.Component{
    constructor(){
        super()
        this.state ={
            loading:false,
            id:'',
            FormConfig:{
                url:'departmentAdd',
                initialValues:{
                    number:0,
                    status:true
                },
                setFieldsValue:{},
            },
            formLayout:{
                labelCol:{span:2},
                wrapperCol:{span:10}
            },
            tailLayout:{
              wrapperCol: { offset: 2, span: 2 },
            },
            formItem:[
                {type:'Input',label:'部门名称',name:'name',required:true,style:{width:'200px'},placeholder:'请输入部门名称'},
                // {
                //     type:'Select',
                //     label:'部门名称',
                //     name:'name',
                //     required:true,
                //     options:[
                //         {label:'研发部',value:'研发部'},
                //         {label:'技术部',value:'技术部'},
                //         {label:'人事部',value:'人事部'},
                //     ],
                //     style:{width:'200px'}
                // },
                {type:'InputNumber',label:'部门人数',name:'number',required:true,min:0,max:500,style:{width:'200px'}},
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
                    label:'部门描述',
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
                id
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
        DepartmentAddApi(value).then(res=>{
            message.success(res.data.message)
        })
    }

    //获取部门详情函数
    getDetailedFn(){
        let id = this.state.id
        if(id){
            Detailedpartment({id}).then(res=>{
                this.setState({
                   FormConfig:{
                        ...this.state.FormConfig,
                        setFieldsValue:res.data.data,
                   }
                })
            })
        }
    }

    updateFn(value){
        let requestData = {...value,id:this.state.id}
        Editdpartment(requestData).then(res=>{
            message.success(res.data.message)
        })
    }

    render(){
        const { formItem } = this.state
        return (
            <Fragment>
                    <FormCom formItem ={formItem} formLayout= {this.state.formLayout} FormConfig ={this.state.FormConfig} onFinish ={this.onFinish} />
            </Fragment>
        )
    }
}

export default departmentAdd;