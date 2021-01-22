import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import BagContextProvider from './pokedex/context/BagContext'
import Routes from './pokedex/Router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from "./pokedex/redux/store";
import {Provider} from "react-redux"

ReactDOM.render(

  <HelmetProvider>
    <Provider store={store}>
      <BagContextProvider>
        <Routes />
      </BagContextProvider>
    </Provider>
  </HelmetProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
