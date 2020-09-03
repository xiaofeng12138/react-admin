import React from 'react'
import { Form, Input, Button, Radio ,InputNumber,message} from 'antd';
import {DepartmentAddApi,Detailedpartment,Editdpartment} from '../../api/department'

class departmentAdd extends React.Component{
    constructor(){
        super()
        this.state ={
            loading:false,
            id:'',
            formLayout:{
                labelCol:{span:2},
                wrapperCol:{span:10}
            },
            tailLayout:{
              wrapperCol: { offset: 2, span: 2 },
            }
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
    
    onFinish = (value)=>{
        if(!value.name){message.error("部门名称不能为空"); return false}
        if(value.number === 0){message.error("部门人数不能为0"); return false}
        if(!value.content ){message.error("部门描述不能为空"); return false}
        this.setState({
             loading: true
        })
        if(this.state.id){
           value.id = this.state.id
           this.updateFn(value)
        }else{
            DepartmentAddApi(value).then(res =>{
                message.success(res.data.message)
                this.setState({loading: false})
                this.refs.Form.resetFields()
            }).catch(()=>{
                this.setState({loading: false})
            })
        }
    }

    //获取部门详情函数
    getDetailedFn(){
        let id = this.state.id
        if(id){
            Detailedpartment({id}).then(res=>{
                console.log(res)
                this.refs.Form.setFieldsValue(res.data.data)
            })
        }
    }
    updateFn(value){
        Editdpartment(value).then(res=>{
            message.success(res.data.message)
            this.setState({loading: false})
            this.refs.Form.resetFields()
        }).catch(()=>{
            this.setState({loading: false})
        })
    }

    render(){
        return (
            
            <Form
                ref ='Form'
                onFinish={this.onFinish}
                {...this.state.formLayout}
                initialValues = {
                    {number:0,status:true}
                }
            >
                <Form.Item label="部门名称" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="部门人数" name="number">
                    <InputNumber  min={0} max={100} />
                </Form.Item>
                <Form.Item label="是否启用" name="status" >
                <Radio.Group>
                    <Radio value={true}>启用</Radio>
                    <Radio value={false}>禁用</Radio>
                </Radio.Group>
                </Form.Item>
                <Form.Item label="部门描述" name="content">
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item  {...this.state.tailLayout}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default departmentAdd;