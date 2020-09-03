
import React ,{ Component,Fragment} from 'react'
import { Link} from 'react-router-dom'
import { Form, Input, Button,Table,Switch ,message,Modal} from 'antd';
import { GetdepartmentList ,Deletepartment,Statuspartment} from '../../api/department.js'
class departmentList extends React.Component{
    constructor(){
        super()
        this.state ={
            pageSize:10,
            pageNumber:1,
            keyWord:'',
            //复选框
            selectedRowKeys:[],
            //弹出框
            visible:false,
            id:'',
            columns:[
                {title: '部门名称', dataIndex:'name', align: 'center', key: 'name',},
                {title: '禁启用',
                 dataIndex:'status',
                  align: 'center', 
                  key: 'status',
                  render:(text,rowData)=>{
                     return    <Switch onClick={()=>this.changeStatus(rowData)} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked = {rowData.status == '1'? true :false} />
                  }
                },
                {title: '人数', dataIndex:'number', align: 'center', key: 'number',},
                {title: '操作',  align: 'center', width:215,
                 render:(text,rowData)=>{
                     return (
                         <div className='inline-button'>
                             <Button type='primary' onClick={()=>this.openConfirm(rowData.id)}>
                                 <Link to={{pathname:"/index/department/add",state:{id:rowData.id}}}>编辑</Link>
                             </Button>
                             <Button type='danger' onClick={()=>this.openConfirm(rowData.id)} >删除</Button>
                         </div>
                     )
                 }
            },
            ],
            tableData:[]
        }
    }
    //打开弹出框
    openConfirm=(id)=>{
       if(!id){return false}
       this.setState({
           visible:true,
           id
       })
    }
    onFinish =(value)=>{
        this.setState({
            pageSize:10,
            pageNumber:1,
            keyWord:value.name,
        })
        this.loadData()
    }
    onHanderDelete =(id)=>{
        Deletepartment({id}).then(res=>{
            message.success(res.data.message)
            this.setState({
                visible:false,
                id:''
            })
            this.loadData()
        })
    }
    loadData =()=>{
        const {pageNumber,pageSize,keyWord} = this.state
        const reqestData ={
            pageNumber,
            pageSize
        }
        if(keyWord){reqestData.name = keyWord}
        GetdepartmentList(reqestData).then(res=>{
            let data = res.data.data.data
            if(data.length > 0){
                this.setState({
                    tableData:data
                })
            }
        })
    }
    componentDidMount(){
       this.loadData()
    }
    onChageBox = (selectedRowKeys)=>{
        this.setState({
            selectedRowKeys
        })
        // console.log(selectedRowKeys )
    }
    submitDelete =()=>{
        this.onHanderDelete(this.state.id)
    }
    //修改状态
    changeStatus =(rowData)=>{
        console.log(rowData.status)
        const requsetData ={
            id:rowData.id,
            status:rowData.status === '1' ?false:true
        }
        Statuspartment(requsetData).then(res=>{
            message.success(res.data.message)
            this.loadData()
        })
        console.log(rowData.status)
    }
    render(){
        const {columns,tableData} = this.state
        const rowSelection = {
            onChange:this.onChageBox
        }
        return (
            <Fragment>
                <Form   layout="inline" onFinish={this.onFinish}>
                <Form.Item name="name" label='部门名称'>
                    <Input  placeholder="请输入部门名称" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">搜索 </Button>
                </Form.Item>
                </Form>
               <div className='table-wrap'>
                  <Table rowSelection ={rowSelection} rowKey="id" columns ={columns}  dataSource ={tableData} bordered></Table>
               </div>
               <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.submitDelete}
                    onCancel={()=>{this.setState({visible:false})}}
                    okText="确认"
                    cancelText="取消"
                    >
                    <p className='text_center'>确定删除此信息吗？ <strong className='color_red'>删除后不可恢复</strong></p>
                   
                   
                    </Modal>
            </Fragment>
            
        )
    }
}

export default departmentList;