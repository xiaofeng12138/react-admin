import React,{ Component} from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadToken } from '@api/common.js'
class UploadCom extends Component{

    constructor(props){
        super(props)
        this.state ={
            imageUrl:'',
            loading:false,
            uploadKey:{
                token:'',
                key:''
            }
        }
    }

    componentDidMount(){
        this.getQiNiuToken()
    }
   

    //获取七牛云token
    getQiNiuToken=()=>{
        let requsetData ={
            ak:'DDinTpKdKIJi9NA0q2nMoJV-296wps2DYD5JUxb8',
            sk:'POvLMBoC-EnwHWvwaJVkCjzLVvYuGl9TOVnzBpRv',
            buckety:'xiaofenggeg'
         }
         return uploadToken(requsetData).then(res=>{
             return res.data.data.token
            //  this.setState({
            //     uploadKey:{
            //        token:res.data.data.token
            //     }
            //  })
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

    // 文件上传之前处理函数
    beforeUpload = async (file)=>{
        const token = await this.getQiNiuToken()
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        let fileName = file.name;
        let key = encodeURI(`${fileName}`)
        this.setState({
            uploadKey:{
                token,
                key
            }
        })
        return isJpgOrPng && isLt2M;
    }

    handleChange = (info)=>{
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
              const fileInfo = info.file.response
              const imageUrl = `http://llc.xiaofenggege.com/${fileInfo.key}`;
              this.setState({
                imageUrl,
                loading:false
              },()=>{
                this.triggerChange(this.state.imageUrl)   //将值返回给父组件
              })
            // Get this url from response in real world.
            // this.getBase64(info.file.originFileObj, imageUrl =>
            //   this.setState({
            //     imageUrl,
            //     loading: false,
            //   },()=>{
            //       this.triggerChange(imageUrl)   //将值返回给父组件
            //   }),
            // );
          }
    }

   
   
    render(){
        const {imageUrl,loading} = this.state
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
            return (
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    data = {this.state.uploadKey}
                    action= "http://up.qiniup.com"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    { imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

                </Upload>
            )
    }
}

export default UploadCom