import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import App from './App';

import ThemeCustomization from './theme';

// eslint-disable-next-line prettier/prettier
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeCustomization>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeCustomization>
    </StrictMode>
  </BrowserRouter>
);
