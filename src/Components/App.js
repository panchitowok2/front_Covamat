import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MostrarCasos from './MostrarCasos';
import Saludo from './Inicio/Saludo';
import CrearCaso from './CrearCaso';
import DocumentarVariedad from './DocumentarVariedad/DocumentarVariedad';
import Servicios from './/Servicios/Servicios.jsx';
import PantallaLogIn from './PantallaLogIn';
import Profile from './profile';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer/footer';

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
            <div className="navbar-nav ml-auto flex-row">
              <Link to="/" className="nav-link mr-2 text-white">Inicio</Link>
              <Link to="/documentarvariedad" className="nav-link mr-2 text-white">Documentar Variedad</Link>
              <Link to="/crearcaso" className="nav-link mr-2 text-white">Instanciar Caso</Link>
              <Link to="/mostrarcasos" className="nav-link mr-2 text-white">Mostrar Casos</Link>
              <Link to="/servicios" className="nav-link mr-2 text-white">Servicios</Link>
              <Link to="/perfil" className="nav-link mr-2 text-white">Perfil</Link>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Saludo />} />
            <Route path="/MostrarCasos" element={<MostrarCasos />} />
            <Route path="/CrearCaso" element={<CrearCaso />} />
            <Route path="/DocumentarVariedad" element={<DocumentarVariedad />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/Perfil" element={<Profile />} />
          </Routes>
        </div>
          <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}
