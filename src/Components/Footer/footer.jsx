// Footer.js
import React from 'react';

function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-6 mb-0 text-body-secondary">&copy; {new Date().getFullYear()} CoVaMaT - Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default Footer;