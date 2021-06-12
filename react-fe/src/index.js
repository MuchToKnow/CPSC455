import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import App from './App';
import { Switch, Route } from 'react-router';
import reportWebVitals from './reportWebVitals';
import Login from './components/organisms/login/Login';

ReactDOM.render(
    <React.StrictMode>
        <App>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
            </Switch>
        </App>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
