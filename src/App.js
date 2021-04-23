import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './styles/App.scss';

//引入redux 的包裹组件
import { Provider } from 'react-redux'

import Login from './views/login/index.jsx'
import Index from './views/layout/index.jsx'
import Store  from '@/store/index.js'
//私有组价方法 类似导航守卫
import  PrivateRouter from './views/layout/privateRouter/index'

function App() {
  return (
    <div>
      <Provider store ={Store}>
        <HashRouter>
            <Switch>
                <Route exact component={Login} path='/' />
                <PrivateRouter component={Index} path='/index' />
            </Switch>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
