import React from 'react';

const Saludo = () => {
  return (
    <div style={{ position: 'fixed', top: 56, left: 0, width: '100%', margin: 0, padding: 0}}>
      <img
        src={process.env.PUBLIC_URL + '/compartirideas.jpg'}
        alt="Compartir Ideas"
        style={{ width: '100%', height: '90%', filter: 'brightness(0.4)', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px', color: 'white' }}>
        <h2>COVAMAT</h2>
        <p>Context-based Management Variety Tool, es una herramienta desarrollada en conjunto entre la 
Universidad Nacional del Comahue y el INTA. Fue diseñada para permitir almacenar, consultar, modificar 
o visualizar la variedad de un dominio, y todos los casos trabajados, permitiendo su reuso en otros casos
de estudio. </p>
      </div>
    </div>
  );
};

export default Saludo;
