import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/Main/Main";
import IsDone from "./components/IsDone/IsDone";
import NotDone from "./components/NotDone/NotDone";
import Deleted from "./components/Deleted/Deleted";

ReactDOM.render((
    <BrowserRouter>
        <App />
        <Switch>
            <Route exact path='/main' component={Main} />
            <Route exact path='/isDone' component={IsDone} />
            <Route exact path='/notDone' component={NotDone} />
            <Route exact path='/deleted' component={Deleted} />
        </Switch>
    </BrowserRouter>),document.getElementById('root'));
