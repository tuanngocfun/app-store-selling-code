import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import ScrollToTop from './components/ScrollToTop';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Loading status = 'true'></Loading>
    <ScrollToTop></ScrollToTop>
    <App />
  </BrowserRouter>
    
  
);

