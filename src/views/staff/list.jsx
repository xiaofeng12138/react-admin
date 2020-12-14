
import React ,{Fragment} from 'react'
import { Link} from 'react-router-dom'
import {Button,Switch ,message} from 'antd';
import TableComponents from '@c/tableData/Index'
import {Status} from '@api/job.js'

class StaffList extends React.Component{
    constructor(){
        super()
        this.state ={
            pageSize:10,
            pageNumber:1,
            tableConfig:{
                url:'jobList',  //请求地址
                method:'POST',  //请求方式 选填 默认使用post
                checkBox:true,  //是否显示多选框 选填
                rowKey:'jobId',   //table的绑定值
                batchButton:true,
                thead:[  //表头
                    {title: '职位名称', dataIndex:'jobName', align: 'center', key: 'jobName',},
                    {title: '部门名称', dataIndex:'name', align: 'center', key: 'name',},
                    { 
                      title: '禁启用',
                      dataIndex:'status',
                      align: 'center', 
                      key: 'status',
                      render:(text,rowData)=>{
                         return  <Switch onClick={()=>this.changeStatus(rowData)} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked = { rowData.status ? true :false} />
                      }
                    },
                    {title: '操作',  align: 'center', width:215,
                        render:(text,rowData)=>{
                            return (
                                <div className='inline-button'>
                                    {/* <Button type='primary' onClick={()=>this.openConfirm(rowData.id)}> */}
                                    <Button type='primary'>
                                        <Link to={{pathname:"/index/job/add",state:{id:rowData.jobId}}}>编辑</Link>
                                    </Button>
                                    <Button type='danger' onClick={() =>{this.delete(rowData.jobId)}} >删除</Button>
                                </div>
                            )
                        }
                    },
                ],
                formSearch:[
                    {type:'Input',label:'部门名称',name:'name',placeholder:'请输入部门名称'},
                    {type:'Input',label:'职位名称',name:'jobName',placeholder:'请输入职位名称'},
                    
                ]
            },
        }
    }
   
    //获取子组件实例
    getChildRef = (ref)=>{
        this.TableComponent = ref
    }

    //修改状态
    changeStatus =(rowData)=>{
        const requsetData ={
            id:rowData.jobId,
            status:!rowData.status
        }
        Status(requsetData).then(res=>{
            message.success(res.data.message)
        })
    }

    //删除函数
    delete(id){
        this.TableComponent.handerDelete(id)
    }


    render(){
        return (
            <Fragment>
                 <TableComponents onRef= {this.getChildRef} batchButton = {true} config = {this.state.tableConfig} />
              
               {/*
                在父组件获取子组件实例
                    1、在子组件调用父组件的方法，并把子组件实例传回给父组件（已经存储了子组件的实例）
                    2、通关实例调用子组件的方法
               */}
            </Fragment>
            
        )
    }
}

export default StaffList;