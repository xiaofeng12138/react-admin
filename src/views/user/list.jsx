
import React ,{Fragment} from 'react'
import { Link} from 'react-router-dom'
import {Button,Switch ,message} from 'antd';
import TableComponents from '@c/tableData/Index'
import {Status} from '@api/user.js'
import UserAddModal from '@c/modal'

class StaffList extends React.Component{
    constructor(){
        super()
        this.state ={
            pageSize:10,
            pageNumber:1,
            tableConfig:{
                url:'userList',  //请求地址
                method:'POST',  //请求方式 选填 默认使用post
                checkBox:true,  //是否显示多选框 选填
                rowKey:'id',   //table的绑定值
                batchButton:true,
                thead:[  //表头
                    {title: '用户名', dataIndex:'username', align: 'center', key: 'username',},
                    {title: '真实姓名', dataIndex:'truename', align: 'center', key: 'truename',},
                    {title: '电话号码', dataIndex:'phone', align: 'center', key: 'phone',},
                    {title: '角色', dataIndex:'role', align: 'center', key: 'role',},
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
                                        <Link to={{pathname:"/index/staff/add",state:{id:rowData.id}}}>编辑</Link>
                                    </Button>
                                    <Button type='danger' onClick={() =>{this.delete(rowData.id)}} >删除</Button>
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

     //获取弹窗子组件实例
     getUesrAddModal = (ref)=>{
        this.child = ref
    }

    //修改状态
    changeStatus =(rowData)=>{
        const requsetData ={
            id:rowData.staff_id,
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
    openUserModal =()=>{
        this.child.visibleModal(true)
    }


    render(){
        return (
            <Fragment>
                  <TableComponents onRef= {this.getChildRef} batchButton = {true} config = {this.state.tableConfig}>
                    <Button ref='userAdd' type='primary' onClick={this.openUserModal}>新增用户</Button>
                  </TableComponents>
                  <UserAddModal onRef ={this.getUesrAddModal} />
                
            </Fragment>
            
        )
    }
}

export default StaffList;