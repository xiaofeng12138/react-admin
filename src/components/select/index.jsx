import React,{ Component} from 'react'
import { Select } from 'antd';
import { requestDataFn } from '@api/common.js'  //公用接口请求

import requestUrl from '@api/requestUrl'  //引入接口地址

const { Option } = Select;

class SelectCom extends Component{

    constructor(props){
        super(props)
        this.state ={
            propsKey:props.propsKey,
            style:props.style,
            options:[],
            value:'',  //自定义表单属性的值
            name:props.name //自定义动态化传回去的key

        }
    }

    componentDidMount(){
       this.GetSelectList()
    }


    
    //监听数值变化的生命周期函数
    static getDerivedStateFromProps(nextProps,prevProps){  //1、静态的 无法读取this.state   2、必须有返回值
        let { value,name } = nextProps
        //判断value的 类型  是数字类型 还是json 对象
        if(Object.prototype.toString.call(value) === "[object Object]"){
            value = value[name]
            return false
        }
        if(!value) {return false}
        if(value !== prevProps[value] ){
            return {
                value:value   //返回的值直接返回到 this.state 里面
            }
        }
         //直接返回放在最后面
         return null
    }

    GetSelectList(){
        const params ={
            url:requestUrl[this.props.url],
            data:{}
        }
        requestDataFn(params).then(res=>{
            this.setState({
                options:res.data.data.data
            })
        })
    }
   
    //select change 事件
    onChange =(e)=>{
        this.setState({
            value:e
        })
        this.triggerChange(e)
    }

    triggerChange = (changeValue)=>{
         const onChange = this.props.onChange   //这是一个从FormItem 传过来的一个函数
         if(onChange){
            onChange(changeValue)  //将值返回给form组件
         }
    }

   
    render(){
        const {value,label} = this.state.propsKey
            return (
                            <Select style = {this.state.style}   value={this.state.value} onChange={this.onChange}>
                                    {
                                        this.state.options &&  this.state.options.map(ele=>{
                                            return <Option value = {ele[value]} key={ele[value]}>{ele[label]}</Option>
                                        })
                                    }
                            </Select>
            )
    }
}

export default SelectCom