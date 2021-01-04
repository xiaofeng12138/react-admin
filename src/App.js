import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './styles/App.scss';


import Login from './views/login/index.jsx'
import Index from './views/layout/index.jsx'

//私有组价方法 类似导航守卫
import  PrivateRouter from './views/layout/privateRouter/index'

function App() {
  return (
    <div>
      <HashRouter>
          <Switch>
              <Route exact component={Login} path='/' />
              <PrivateRouter component={Index} path='/index' />
          </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
