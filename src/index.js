import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import CartContextProvider from './pokedex/context/CartContext'
import Routes from './pokedex/Router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from "./pokedex/redux/store";
import {Provider} from "react-redux"

ReactDOM.render(

  <HelmetProvider>
    <Provider store={store}>
      <CartContextProvider>
        <Routes />
      </CartContextProvider>
    </Provider>
  </HelmetProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
