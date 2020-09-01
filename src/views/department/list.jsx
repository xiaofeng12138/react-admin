
import React ,{ Component,Fragment} from 'react'
import { Form, Input, Button,Table,Switch ,message} from 'antd';
import { GetdepartmentList ,Deletepartment} from '../../api/department.js'
class departmentList extends React.Component{
    constructor(){
        super()
        this.state ={
            pageSize:10,
            pageNumber:1,
            keyWord:'',
            //复选框
            selectedRowKeys:[],
            columns:[
                {title: '部门名称', dataIndex:'name', align: 'center', key: 'name',},
                {title: '禁启用',
                 dataIndex:'status',
                  align: 'center', 
                  key: 'status',
                  render:(text,rowData)=>{
                     return    <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked = {rowData.status == '1'? true :false} />
                  }
                },
                {title: '人数', dataIndex:'number', align: 'center', key: 'number',},
                {title: '操作',  align: 'center', width:215,
                 render:(text,rowData)=>{
                     return (
                         <div className='inline-button'>
                             <Button type='primary'>编辑</Button>
                             <Button type='danger' onClick={()=>this.onHanderDelete(rowData.id)} >删除</Button>
                         </div>
                     )
                 }
            },
            ],
            tableData:[]
        }
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
        if(!id){ return false}
        Deletepartment({id}).then(res=>{
            message.success(res.data.message)
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
            </Fragment>
            
        )
    }
}

export default departmentList;