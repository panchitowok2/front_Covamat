import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Saludo from './Inicio/Saludo.jsx';
import DocumentarVariedad from './DocumentarVariedad/DocumentarVariedad.jsx';
import Servicios from './Servicios/Servicios.jsx';
import PantallaLogIn from './PantallaLogIn.js';
import Profile from './profile.js';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer/footer.jsx';
import DatosDatasheet from './/DocumentarVariedad/DatosDatasheet.jsx'
import AgregarOtraVariacion from './DocumentarVariedad/AgregarOtraVariacion.jsx';

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
              <Link to="/servicios" className="nav-link mr-2 text-white">Servicios</Link>
              <Link to="/perfil" className="nav-link mr-2 text-white">Perfil</Link>
              <Link to="/datosDatasheet" className="nav-link mr-2 text-white">DatosDatasheet</Link>
              <Link to="/agregarOtra" className="nav-link mr-2 text-white">Agregar otra variacion</Link>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Saludo />} />
            <Route path="/DocumentarVariedad" element={<DocumentarVariedad />} />
            <Route path="/Servicios" element={<Servicios />} />
            <Route path="/Perfil" element={<Profile />} />
            <Route path="/DatosDatasheet" element={<DatosDatasheet />} />
            <Route path="/AgregarOtra" element={<AgregarOtraVariacion />} />
          </Routes>
        </div>
          <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}
