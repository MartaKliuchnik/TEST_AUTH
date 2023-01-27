import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './components/App';
import { AuthProvider } from './AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>  
  // </Provider>
);

