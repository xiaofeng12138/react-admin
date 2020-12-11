import React , {Fragment} from 'react'
import {message,} from 'antd';
//引入数据类型校验
import PropTypes from 'prop-types'

import { LoadTable,DeleteTable } from '@api/common.js'
import requestUrl from '@api/requestUrl'
import TableCofig from './table'
import FormSearch from '@c/Formsearch/index'

class TableComponents extends React.Component{
    constructor(props){
        super()
        this.state ={
            pageSize:10,
            pageNumber:1,
            tableData:[], //数据
            laodingTable:false,
            total:0,
            modalVisible:false,
            checkBoxValue:[],
            keyWord:'',
        }
    }
    componentDidMount(){
        this.loadData()
        //返回子组件实例
        this.props.onRef(this)
     }

    loadData =()=>{
        const {pageNumber,pageSize,keyWord} = this.state
        const reqestData ={
            method:this.props.config.method,
            data:{
                pageSize,
                pageNumber,
            }
        }
        if(keyWord){reqestData.data.name = keyWord}
        reqestData.url = requestUrl[this.props.config.url]
        LoadTable(reqestData).then(res=>{
            let data = res.data.data.data
            if(data.length > 0){
                this.setState({
                    tableData: res.data.data.data,
                    total: res.data.data.total
                })
            }
        }).catch((error)=>{
            this.setState({laodingTable:false})
        })
    }
    //复选框
    onChageBox = (val)=>{
        this.setState({checkBoxValue:val})
    }

    onChangeCurrent =(value)=>{
        console.log(value)
        this.setState({
            pageNumber:value
        },()=>{
            this.loadData()
        })
    }
 //下拉页面
    onShowSizeChange =(value,page)=>{
          console.log(value)
          console.log(page)
    }

    handerDelete (id){
        
        this.setState({ modalVisible:true})
        if(id){this.setState({checkBoxValue:[id]})}
        
    }
    

    // 确认删除事件
    submitDelete = ()=>{
        if(this.state.checkBoxValue.length === 0){
            message.error('请勾选需要删除的选项')
            return false
        }
        let requestData ={
            url:requestUrl[`${this.props.config.url}Delete`],
            data:{
                id:this.state.checkBoxValue.join()
            },
        }
        DeleteTable(requestData).then(res=>{
            message.success(res.data.message)
            this.setState({
                modalVisible:false,
                checkBoxValue:[],
            })
            this.loadData()
        })
    }

    onCancel = ()=>{
        this.setState({modalVisible:false})
    }

    //搜索
    onFinish =(value)=>{
        this.setState({
            pageSize:10,
            pageNumber:1,
            keyWord:value.name,
        })
        this.loadData()
    }

    //搜索事件

    onSearch = (value)=>{
        this.setState({
            pageSize:10,
            pageNumber:1,
            keyWord:value.name,
        })
        this.loadData()
    }


    render(){
        const { laodingTable,total,modalVisible, } = this.state
        const {thead,checkBox,rowKey,formSearch} = this.props.config
        const rowSelection = {
            onChange:this.onChageBox
        }
        
        return (
            <Fragment>
                {/* 搜索框内容 */}
                <FormSearch formItem = {formSearch}  onFinish = {this.onSearch} />


                {/* table组件 */}
                <TableCofig 
                    columns = { thead }  
                    dataSource = { this.state.tableData } 
                    loading = { laodingTable }
                    rowSelection = {checkBox ? rowSelection:null }
                    handerDelete = { ()=>{this.handerDelete()} }
                    total = {total}
                    onChangeCurrent = {this.onChangeCurrent}
                    rowKey = {rowKey}
                    modalVisible = {modalVisible}
                    submitDelete = {this.submitDelete}
                    onCancel = {this.onCancel}
                    batchButton = {true}
                />
            </Fragment>
            )
        
    }
}

//校验数据类型
TableComponents.propTypes = {
    config:PropTypes.object
}


export default TableComponents;