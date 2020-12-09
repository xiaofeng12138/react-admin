import { createStore, combineReducers} from 'redux'

import departmentReducer from './reducer/department'
import configReducer from './reducer/config'
import jobReducer from './reducer/job'


const allReducer = {
    department:departmentReducer,
    config:configReducer,
    job:jobReducer,
}

//combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
const rootReducer = combineReducers(allReducer)

const store  = createStore(rootReducer)

export default store;