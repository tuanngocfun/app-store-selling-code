import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CartProvider>
    <BrowserRouter>
      <Loading status="true"></Loading>
      <ScrollToTop></ScrollToTop>
      <App />
    </BrowserRouter>
  </CartProvider>
);
