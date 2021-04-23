

//全局配置
const config = {
    status:[
        {label:'启用',value:true},
        {label:'禁用',value:false},
    ],
    routers:[]
}

//Reducer
const appConfig = function(state = config,action){
    console.log(action)
    switch (action.type){
        case 'setRouter' :{
            return {
                ...state,
                routers:action.value
            }
        }
        default:
            return state
    }


    console.log(state)
}
  


export default appConfig

