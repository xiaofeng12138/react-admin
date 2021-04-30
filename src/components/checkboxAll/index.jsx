import React from 'react'
import { Fragment } from 'react';
import { Checkbox, } from 'antd';
import { PropTypes } from 'prop-types'
import { withRouter } from "react-router-dom";  //添加白名单
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {RoleMenuAction} from '../../store/action/App'

const CheckboxGroup = Checkbox.Group;

class CheckBoxAll extends React.Component {
    constructor(){
        super()
        this.state = {
            checkValueArr:[],
            check_default:[],
            check_length:0,
            indeterminate:false,
            checkAll:false
        
        }
    }

    UNSAFE_componentWillMount(){
        let check_list = this.props.data.child_item;
        let check_value = null
        if(check_list && check_list.length > 0){
            check_value = check_list.map(item =>item.value)
        }
        this.setState({
            check_list:check_value,
            check_length:check_value.length

        })

    }

    UNSAFE_componentWillUnmount(){
        this.props.actions.handerRoleMenu({})
    }

    checkBoxChange =(e)=>{
        let check_status = e.target.checked;

        this.updateStatus({
            checkValueArr:check_status ? this.state.check_list : []
        })
        this.checkedAll(check_status)
        this.indeterminateFn(false)

    }

    //单个选中事件
    onChange =(e)=>{

        const old_length = this.state.check_length;  //默认长度
        const new_length = e.length;

        if(old_length !== new_length){    //部分选中
            this.checkedAll(false)
            this.indeterminateFn(true)
        }

        if(old_length === new_length){          //全部选中    全选打钩  部分选中取消
            this.checkedAll(true)
            this.indeterminateFn(false)

        }
        if(new_length === 0){    //部分选中
            this.checkedAll(false)
            this.indeterminateFn(false)
        }
        
        this.updateStatus({
            checkValueArr:e
        })
    }

    //全选状态下的判断
    checkedAll=(value)=>{
        this.setState({
            checkAll:value
        })
    }

     //部分选中状态下的判断
     indeterminateFn=(value)=>{
        this.setState({
            indeterminate:value
        })
    }

    //

    updateStatus = (data)=>{
        this.setState({
            ...data
        },()=>{
            this.updateRoleMeun()
        })
    }

    updateRoleMeun =()=>{

        //本地选中的 
        const check_list = this.state.checkValueArr

        //store的存储
        let role_menu = this.props.menu

        //第一层
        let first = this.props.data

        //判断对象是否存在
        if(!role_menu[first.value]){ role_menu[first.value] = {} }

        //如果又被选中的情况下
        if(check_list.length > 0 ){

            //需要文本

            // const object = {}
            // check_list.forEach((item)=>{
            //   let options =   first.child_item.filter((child) => child.value === item )
            // //   console.log(options)
            //   if(options.length > 0){
            //     object[item] = options[0]
            //   }
            // })
             //更新数据
             //role_menu[first.value] = object


            //不需要文本

            role_menu[first.value] = check_list

        }

        //没有被选中的情况下
        if(check_list.length  === 0 ){
            delete role_menu[first.value]
        }

        console.log(role_menu)

        this.props.actions.handerRoleMenu(role_menu)
    }



    render(){
        const {label,child_item} = this.props.data
        const {indeterminate,checkAll} = this.state
        return (
            <Fragment>
                <Checkbox indeterminate={indeterminate} onChange ={ this.checkBoxChange } checked={checkAll} >
                   { label } 
                </Checkbox><br/>
                <CheckboxGroup options={child_item} value={this.state.checkValueArr} onChange={this.onChange} /><br/><br/>
            </Fragment>
        )
    }
}

//定义父组件传参过来的类型
CheckBoxAll.propTypes ={
     data:PropTypes.object,
}


//定义组件的默认值
CheckBoxAll.defaultProps ={
     data:{}
}


const mapStateToProps = (state) =>( {
        menu:state.config.newRole
    }
)

const mapDispatchToProps = (dispatch)=>{
 return {
     actions: bindActionCreators({
        handerRoleMenu:RoleMenuAction,
     },dispatch)
   }
}
// export default withRouter(LoginForm)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CheckBoxAll));
   