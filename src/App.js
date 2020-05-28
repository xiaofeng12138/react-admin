import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './styles/App.scss';


import Login from './views/login/index.jsx'

function App() {
  return (
    <div>
    <HashRouter>
         <Switch>
            <Route exact component={Login} path='/' />
         </Switch>
    </HashRouter>
    </div>
  );
}

export default App;
