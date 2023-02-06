import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('react-root');
const root = createRoot(container); // 

root.render(
  <Provider  store={store}>
    <App />
  </Provider>
);