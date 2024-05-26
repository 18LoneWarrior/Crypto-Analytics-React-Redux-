import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import store from './app/store'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
