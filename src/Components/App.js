import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MostrarCasos from './MostrarCasos';
import Saludo from './Saludo';
import CrearCaso from './CrearCaso';
import DocumentarVariedad from './DocumentarVariedad';
import Servicios from './Servicios';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <nav className="navbar custom-navbar">
          <div className="container">
            <div className="navbar-nav mr-auto flex-row">
              <Link to="/" className="nav-link mr-2 text-white">Inicio</Link>
              <Link to="/documentarvariedad" className="nav-link mr-2 text-white">Documentar Variedad</Link>
              <Link to="/crearcaso" className="nav-link mr-2 text-white">Instanciar Caso</Link>
              <Link to="/mostrarcasos" className="nav-link mr-2 text-white">Mostrar Casos</Link>
              <Link to="/servicios" className="nav-link mr-2 text-white">Servicios</Link>
            </div>
          </div>
        </nav>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Saludo />} />
            <Route path="/MostrarCasos" element={<MostrarCasos />} />
            <Route path="/CrearCaso" element={<CrearCaso />} />
            <Route path="/DocumentarVariedad" element={<DocumentarVariedad />} />
            <Route path="/Servicios" element={<Servicios />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}
