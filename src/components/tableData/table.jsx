import React , {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Table,Button,Row,Col,Pagination,Modal} from 'antd';
//引入数据类型校验


class TableCofig extends React.Component{
    render(){
        const {columns,dataSource,loading,rowSelection,handerDelete,total,onChangeCurrent,rowKey,modalVisible,submitDelete,onCancel,batchButton} = this.props
        return (
            <Fragment>
                 <div className='table-wrap'>
                    <Table 
                        pagination={false} 
                        bordered 
                        columns={columns} 
                        dataSource ={dataSource}
                        loading ={loading}
                        rowSelection ={rowSelection}
                        rowKey= {rowKey}
                        />
                 </div>
                
                
                <Row className="mar-10">
                    <Col span={6}>{ batchButton && <Button type="primary" onClick= { handerDelete }>批量删除 </Button>}</Col>
                    <Col span={18}>
                    <Pagination
                        onChange = {onChangeCurrent}
                        className='pull-right'
                        total={total}
                        showTotal={total => `共 ${total} 条`}
                        defaultCurrent ={1}
                        defaultPageSize ={10}
                        />
                    </Col>
                </Row>
                {/* 弹出提示框 */}
                <Modal
                    title="部门删除"
                    visible={modalVisible}
                    onOk={submitDelete}
                    onCancel={onCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                    <p className='text_center'>确定删除此信息吗？ <strong className='color_red'>删除后不可恢复</strong></p>
                    </Modal>
            </Fragment>
            )
        
    }
}

//校验数据类型
TableCofig.propTypes ={
    columns:PropTypes.array,
    dataSource:PropTypes.array,
    loading:PropTypes.bool,
    rowSelection:PropTypes.object,
    rowKey:PropTypes.string,
    total:PropTypes.number,
    onCancel:PropTypes.func,
    batchButton:PropTypes.bool,
}

//设置默认值
TableCofig.defaultsProps ={
    columns:[],
    dataSource:[],
    total:0,
    batchButton:true,
    rowKey :'id'
}

export default TableCofig;