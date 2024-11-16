import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import store from './services/store';
import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ErrorBoundary>
          <BrowserRouter>
              <Provider store={store}>
                  <App />
              </Provider>
          </BrowserRouter>
      </ErrorBoundary>
  </React.StrictMode>
);
