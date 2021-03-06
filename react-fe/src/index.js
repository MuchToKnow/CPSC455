import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styling/Theme.js';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
