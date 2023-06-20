import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App.js';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
reportWebVitals();
