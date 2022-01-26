import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './Context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT
};

ReactDOM.render(
  <React.StrictMode>
      <UserContextProvider>
        <BrowserRouter>
            <Provider template={AlertTemplate} {...options}>
                <App />
            </Provider>
        </BrowserRouter>
      </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
