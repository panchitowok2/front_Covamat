import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Saludo from './Inicio/Saludo.jsx';
import DocumentarVariedad from './DocumentarVariedad/DocumentarVariedad.jsx';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer/footer.jsx';
import DocumentarCaso from './DocumentarCaso/DocumentarCaso.jsx'
import ConsultarActivosDeDominio from './ConsultarActivosDeDominio/ConsultarActivosDeDominio.jsx'
import logo from '../logo COVAMATSinFondo.png'; // Asegúrate de ajustar la ruta al logo

export default function MenuPrincipal() {
  return (
      <BrowserRouter>
        <nav className="navbar custom-navbar">
          <div className="container">
            <Link to="/">
              <img src={logo} alt="Logo" className="navbar-logo img-fluid" />
            </Link>
            <div className="navbar-nav ml-auto flex-row">
              <Link to="/" className="nav-link mr-2 ">Inicio</Link>
              <Link to="/documentarvariedad" className="nav-link mr-2 ">Documentar Variedad</Link>
              <Link to="/documentarCaso" className="nav-link mr-2 ">Documentar Caso</Link>
              <Link to="/consultarActivosDeDominio" className="nav-link mr-2 ">Consultar Activos</Link>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Saludo />} />
            <Route path="/DocumentarVariedad" element={<DocumentarVariedad />} />
            <Route path="/DocumentarCaso" element={<DocumentarCaso />} />
            <Route path="/ConsultarActivosDeDominio" element={<ConsultarActivosDeDominio />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  );
}
