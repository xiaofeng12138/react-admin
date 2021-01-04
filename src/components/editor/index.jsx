import React,{ Component} from 'react'
//引入富文本
import { Editor } from '@tinymce/tinymce-react'
import { Upload} from '@api/common.js'  //公用接口请求

class EditorCom extends Component{

    constructor(props){
        super(props)
        this.state ={}
    }

    componentDidMount(){ }
   

   
    //select change 事件
    onChange =(e)=>{
        this.setState({
            value:e
        })
        this.triggerChange(e)
    }

     
    //富文本编辑事件
    handleEditorChange =(value)=>{
        this.triggerChange(value)
    }

    triggerChange = (changeValue)=>{
         const onChange = this.props.onChange   //这是一个从FormItem 传过来的一个函数
         if(onChange){
            onChange(changeValue)  //将值返回给form组件
         }
    }

   
   
    render(){

        const editorObj={
            height: '800px',
            language: 'zh_CN',
            plugins: 'table lists link image preview code',
            toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
            relative_urls: false,
            file_picker_types: 'image',
            images_upload_url: 'http',
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler:(blobInfo, success, failure)=>{
                var formData;
                var file = blobInfo.blob();//转化为易于理解的file对象
                formData = new FormData();
                formData.append('file', file, file.name );//此处与源文档不一样
                
                Upload(formData).then(response => {
                    console.log(response.data.data)
                    const data = response.data.data.url;
                    success(data);
                }).catch((error)=>{
                    const data = error.data
                    failure(data.message)
                })
            }
        }
            return (
                <Editor
                            inline={false}
                            selector='editorStateRef'  // 选择器
                            apiKey='官网上申请的key值111'
                            initialValue={"1111"}
                            init={{...editorObj}}
                            onEditorChange={this.handleEditorChange}
                            />
            )
    }
}

export default EditorCom