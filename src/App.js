import React from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'
import './styles/App.scss';

import Home from './views/Home'
import About from './views/About'

function App() {
  return (
    <div>
     <h1>这是一个h1的标签</h1>
    <HashRouter>
         <Switch>
            <Route exact component={Home} path='/' />
            <Route component={About} path='/about' />
         </Switch>
    </HashRouter>
    </div>
  );
}

export default App;
