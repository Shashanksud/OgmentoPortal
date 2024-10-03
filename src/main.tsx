import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import ThemeCustomization from './theme';
// eslint-disable-next-line prettier/prettier
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeCustomization>
        <App />
      </ThemeCustomization>
    </React.StrictMode>
  </BrowserRouter>
);
