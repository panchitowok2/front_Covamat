import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MostrarCasos from './MostrarCasos';
import Saludo from './Saludo';
import CrearCaso from './CrearCaso';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-nav mr-auto flex-row">
            <Link to="/" className="nav-link mr-2">Inicio</Link>
            <Link to="/docvariedad" className="nav-link mr-2">Documentar Variedad</Link>
            <Link to="/crearcaso" className="nav-link mr-2">Instanciar Caso</Link>
            <Link to="/mostrarcasos" className="nav-link mr-2">Mostrar Casos</Link>
          </div>
        </nav>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Saludo />} />
            <Route path="/MostrarCasos" element={<MostrarCasos />} />
            <Route path="/CrearCaso" element={<CrearCaso />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}