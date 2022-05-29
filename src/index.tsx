import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.scss'
import { setupStore } from './store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const store = setupStore()

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
)