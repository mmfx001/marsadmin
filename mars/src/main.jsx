import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import store from './store'; // Ensure your store is correctly configured in './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter> {/* Bu yerda BrowserRouter dan foydalaning */}
      <App />
    </BrowserRouter>
  </Provider>
);
