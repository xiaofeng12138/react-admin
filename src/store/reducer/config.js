

//全局配置
const config = {
    status:[
        {label:'启用',value:true},
        {label:'禁用',value:false},
    ],
}

//Reducer
const configReducer = function(state = config,action){
    switch(action.type){
        case 'ADD_STATUS':{
            return {
                ...state,
                status:[...state.status,action.payload]
            }
        }
        default :
           return state
    }
       
    // if(action.type === 'ADD_STATUS'){
    //     let stateData = JSON.parse(JSON.stringify(state))
    //     stateData.status.push(action.payload)
    //     return stateData
    // }

    // if(action.type === 'UPDATE_STATUS'){
        
    // }
    // return state
}


export default configReducer

