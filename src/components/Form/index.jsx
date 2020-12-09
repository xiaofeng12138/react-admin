import React,{ Component,Fragment} from 'react'
import {Form, Input,Button,InputNumber,Select,Radio,message } from 'antd';
import { submitForm } from '@api/common'

import requestUrl from '@api/requestUrl'
const { Option } = Select;

class FormCom extends Component{

    constructor(props){
        super(props)
        this.state ={
            loading: false,
            mesPreix :{
                'Input':'请输入',
                'Radio':'请选择',
                'Select':'请选择',
            }
        }
    }


    //类似于 vue的watch 监听功能
    componentWillReceiveProps({FormConfig}){
          this.refs.Form.setFieldsValue(FormConfig.setFieldsValue)
    }

    //校验处理函数
    FormatRules = (item) =>{
        const {mesPreix} = this.state
        let rules = []
        if(item.required){
            let message = item.message || `${mesPreix[item.type]}${item.label}`
            rules.push({required:true,message})
        }
        if(item.rules && item.rules.length > 0){
            rules = rules.concat(item.rules)
        }
        return rules
    }

    //input处理函数
    inputElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                    <Input style={item.style} placeholder={item.placeholder} />
                </Form.Item>
        )
    }

     //TextArea处理函数
     TextAreaElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                    <Input.TextArea rows={item.row} style={item.style} />
                </Form.Item>
        )
    }

     
    //select 处理函数
    selectElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules} >
                    <Select style={item.style} placeholder={item.placeholder}>
                        {
                            item.options.map((ele)=>{
                              return <Option value={ele.value} key={ele.value} >{ele.label}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
        )
    }
    
    //inputNumber 处理函数
    inputNumberElem=(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                    <InputNumber  style={item.style} min={item.min} max={item.max} />
                </Form.Item>
        )
    }
    //radio 处理函数
    radioElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                    <Radio.Group >
                        {
                            item.options.map((ele)=>{
                                 return <Radio value={ele.value} key={ele.value} >{ele.label}</Radio>
                            })
                        }
                    </Radio.Group>
                </Form.Item>
        )
    }


    //类型判断
    initFormItem =()=>{
        const {formItem} = this.props
        if(!formItem || (formItem && formItem.length === 0)){ return false}
        let fromList = []
        formItem.map((item)=>{
            if(item.type === 'Input'){fromList.push( this.inputElem(item))}
            if(item.type === 'Select'){fromList.push( this.selectElem(item))}
            if(item.type === 'InputNumber'){fromList.push( this.inputNumberElem(item))}
            if(item.type === 'Radio'){fromList.push( this.radioElem(item))}
            if(item.type === 'TextArea'){fromList.push( this.TextAreaElem(item))}
        })
        return fromList
    }

    //提交函数
    onFinish = (value)=>{
        //如果外面有传函数则调用外面的，否则调用自己的提交函数
        if(this.props.onFinish){
            this.props.onFinish(value)
            return false
        }
        let requestData ={
            data:value,
            url:requestUrl[this.props.FormConfig.url]
        }
        this.setState({ loading: true})
        submitForm(requestData).then(res=>{
            message.success(res.data.message)
            this.setState({loading: false})
            this.refs.Form.resetFields()
        }).catch(err=>{
            this.setState({loading: false})
        })
       console.log(requestData)
      
    }
    render(){
        return (
            <Fragment>
                    <Form ref ='Form' onFinish={this.onFinish} {...this.props.formLayout}  initialValues = {this.props.FormConfig.initialValues}>
                      {this.initFormItem()}
                        <Form.Item>
                                <Button loading={this.state.loading}  type="primary" htmlType="submit">提 交</Button>
                        </Form.Item>
                    </Form>
            </Fragment>
        )
    }
}

export default FormCom