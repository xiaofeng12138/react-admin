import React,{ Component,Fragment} from 'react'
import {Form, Input,Button,InputNumber,Select,Radio,message,DatePicker ,Row,Col} from 'antd';
import { submitForm } from '@api/common'

import requestUrl from '@api/requestUrl'
import SelectCom from '@c/select/index'
import Upload from '@c/upload/index'
import Editor from '@c/editor/index'

//定义语言
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
                'SelectComponent':'请选择',
                'Date':'请选择',
                'Upload':'请上传',
                'Editor':'请输入',
                'Slot':'请选择'
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

    //自定义检验规则
    validatorFn = (rule,value)=>{
        if(value){
           return Promise.resolve()
        }
        return Promise.reject('')
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

    //下拉请求处理函数
    SelectComponentElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={[...rules,{validator:this.validatorFn}]}>
                    <SelectCom url = {item.url} name={item.name}  propsKey ={item.propsKey} style ={item.style}/>
                </Form.Item>
        )
    }

       //插槽处理函数
       SlotElem =(item)=>{
        let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules} >
                   {this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(ele =>ele.ref === item.SlotName)[0]:this.props.children}
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

    //栏目 处理函数
    ColumnElem = (item)=>{
        return (
            <div key={item.label}>
                <h4 className='column-top'>{item.label}</h4>
            </div>
        )
    }

    //日期date 处理函数
    DateElem = (item)=>{
            let rules = this.FormatRules(item)
        return (
                <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                    <DatePicker size={'default'} locale ={locale} format ={item.format} picker ={item.mode} />
                </Form.Item>
        )
    }

     //头像上传 处理函数
     UploadElem = (item)=>{
        let rules = this.FormatRules(item)
            return (
                    <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                       <Upload name={item.name} />
                    </Form.Item>
            )
        }

         //文本框
         EditorElem = (item)=>{
        let rules = this.FormatRules(item)
            return (
                    <Form.Item label={item.label} name={item.name} key ={item.name} rules ={rules}>
                       <Editor  />
                    </Form.Item>
            )
        }


     
        FormItemInlineElem = (item)=>{
            return (
                    <Row key={item.name}> 
                        <Col span={2} className ='ant-form-item' style={{textAlign:'right'}} >
                            <div className='ant-form-item-label'>
                                <label  className='ant-form-item-required' title='姓名'>{item.label}</label>
                            </div>
                        </Col>
                        <Col  span={22} >
                            <Row > 
                               {
                                   item.inlineItem.map((ele)=>{
                                       return (
                                           <Col style={item.style} span={ele.col} key={ele.name} className='form-item-inline-control'>{this.createContral(ele)}</Col>
                                       )
                                   })
                               }
                            </Row> 
                        </Col>
                    </Row> 
            )
        }



    


    //类型判断
    initFormItem =()=>{
        const {formItem} = this.props
        if(!formItem || (formItem && formItem.length === 0)){ return false}
        
        let fromList = formItem.map((item)=>{  // map filter reduce  需要一个返回值 return XXX
          return  this.createContral(item)
        })
        return fromList
    }

    //创建表单控件函数
    createContral=(item)=>{
            if(item.type === 'Input'){ return  this.inputElem(item)}
            if(item.type === 'Select'){return  this.selectElem(item)}
            if(item.type === 'InputNumber'){return  this.inputNumberElem(item)}
            if(item.type === 'Radio'){return  this.radioElem(item)}
            if(item.type === 'TextArea'){return  this.TextAreaElem(item)}
            if(item.type === 'SelectComponent'){return  this.SelectComponentElem(item)}
            if(item.type === 'Slot'){return  this.SlotElem(item)}
            if(item.type === 'Column'){return  this.ColumnElem(item)}
            if(item.type === 'Date'){return  this.DateElem(item)}
            if(item.type === 'Upload'){return  this.UploadElem(item)}
            if(item.type === 'Editor'){return  this.EditorElem(item)}
            if(item.type === 'FormItemInline'){return  this.FormItemInlineElem(item)}
    }


    //数据处理函数
    formatData =(value)=>{
        //请求原始数据
        const requestData = JSON.parse(JSON.stringify(value))   //深度拷贝
        const { editKey,setFieldsValue } = this.props.FormConfig
        const JsonKey = this.props.FormConfig.format
        const keyValue = value[JsonKey]
        if(Object.prototype.toString.call(keyValue) === "[object Object]"){
            requestData[JsonKey] = keyValue[JsonKey]
        }
  
        //判断是否存在编辑状态下的key
        if(editKey){
            requestData[editKey] = setFieldsValue[editKey]
        }
        return requestData;
    }
        

    //提交函数
    onFinish = (value)=>{
        console.log(value)
        //如果外面有传函数则调用外面的，否则调用自己的提交函数
        if(this.props.onFinish){
            this.props.onFinish(value)
            return false
        }

        //数据格式化
        // 
        // if(formatKey && value[formatKey]){
        //     console.log(value[formatKey])
        //     const dataKey = value[formatKey]
        //     delete value[this.props.FormConfig.format]
        //     value = Object.assign(value,dataKey)
        // }

        const dataValue = this.formatData(value)
        let requestData ={
            data:dataValue,
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