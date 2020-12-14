//自动化工程生成组件

//第一个参数：查找目录  二个参数：是否查找子目录文件  三个参数：匹配文件类型（可写正则）
const files = require.context('../../views',true,/\.jsx$/)  
const components =[]
files.keys().forEach(key=>{
    const jsonMap ={}
    if(key.includes('layout') || key.includes('login')){return false}
    const splitPath = key.split('.')[1]
    const path = `/index${splitPath.toLowerCase()}`
    const component =files(key).default;
    jsonMap.path = path
    jsonMap.component = component
    components.push(jsonMap)
})

export default components