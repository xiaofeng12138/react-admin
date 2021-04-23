import { createStore, combineReducers,applyMiddleware} from 'redux'

import departmentReducer from './reducer/department'
import appConfig from './reducer/config'
import jobReducer from './reducer/job'

//引入开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
//引入中间件
import thunk from 'redux-thunk'


const allReducer = {
    department:departmentReducer,
    config:appConfig,
    job:jobReducer,
}

//combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
const rootReducer = combineReducers(allReducer)


//创建store对象
const store  = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store;