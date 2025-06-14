import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Saludo from './Inicio/Saludo.jsx';
import DocumentarVariedad from './DocumentarVariedad/DocumentarVariedad.jsx';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer/footer.jsx';
import DocumentarCaso from './DocumentarCaso/DocumentarCaso.jsx'
import ConsultarActivosDeDominio from './ConsultarActivosDeDominio/ConsultarActivosDeDominio.jsx'
import logo from '../logo COVAMATSinFondo.png'; // Asegúrate de ajustar la ruta al logo
import MenuPrincipal from './MenuPrincipal.jsx';
import { useState } from 'react';
import LogIn from './Login.jsx';
import AdminLogIn from './AdminLogIn.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AdminLogIn />
    </ApolloProvider>
  );
}
