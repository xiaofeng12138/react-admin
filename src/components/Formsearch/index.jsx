import React,{ Component,Fragment} from 'react'
import {Form, Input,Button,InputNumber,Select,Radio, } from 'antd';
import Store from '@/store/index'
import { addStatus } from '@/store/action/config'

const { Option } = Select;

class FormSearch extends Component{

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

    componentDidMount(){
        //获取store里面改变后数据的值
        Store.subscribe(()=>{
            // console.log(Store.getState())
        })
        Store.dispatch(addStatus({label:'所有',value:'all'}))
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
        formItem.forEach((item)=>{
            if(item.type === 'Input'){fromList.push( this.inputElem(item))}
            if(item.type === 'Select'){
                item.options = Store.getState().config[item.optionsKey]
                fromList.push( this.selectElem(item))
            }
            if(item.type === 'InputNumber'){fromList.push( this.inputNumberElem(item))}
            if(item.type === 'Radio'){fromList.push( this.radioElem(item))}
            if(item.type === 'TextArea'){fromList.push( this.TextAreaElem(item))}
        })
        return fromList
    }

    //提交函数
    onFinish = (value)=>{
        this.props.onFinish(value)
      
    }
    render(){
        return (
            <Fragment>
                    <Form  layout="inline" ref ='Form' onFinish={this.onFinish} {...this.props.formLayout}  >
                      {this.initFormItem()}
                        <Form.Item >
                            <Button type="primary" htmlType="submit">搜 索 </Button>
                        </Form.Item>
                    </Form>
            </Fragment>
        )
    }
}

export default FormSearch