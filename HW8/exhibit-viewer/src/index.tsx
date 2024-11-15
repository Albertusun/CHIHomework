import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import store from "./store/store";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const BASE_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/'

axios.interceptors.response.use(function (response) {
    console.log(response);
    return response;
}, function (error) {
    console.log('Error handle', error);
    return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
    console.log("Handle request", config);
    config.url = BASE_URL + config.url;
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
