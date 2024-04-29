import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App.jsx';
import reportWebVitals from './reportWebVitals';
//import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));

const onRedirectCallback = (appState) => {
  // Aquí puedes realizar acciones después de la redirección, como actualizar el estado de autenticación o redirigir a una página específica.
  console.log("Redirección completada");
  console.log(appState);
};

root.render(
  <Auth0Provider
      domain = "dev-cqsr2j8hnf0nlf0n.us.auth0.com"
      clientId="QX3zw12LYoK5cfYRGzjfozR3V1NUA0o2"
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>,
  );
reportWebVitals();
