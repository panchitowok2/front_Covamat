import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
//import Image from 'react-bootstrap/Image';
import Imagen1 from '../Imagenes/Imagen1'
import Imagen2 from '../Imagenes/Imagen2'
import Imagen3 from '../Imagenes/Imagen3'


/*
<Carousel.Caption>
            <p>Context-based Management Variety Tool, es una herramienta desarrollada en conjunto entre la
              Universidad Nacional del Comahue y el INTA. Fue diseñada para permitir almacenar, consultar, modificar
              o visualizar la variedad de un dominio, y todos los casos trabajados, permitiendo su reuso en otros casos
              de estudio. </p>
          </Carousel.Caption>
*/
const Saludo = () => {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item className="text-center">
          <Imagen1 text='CoVaMaT' />
          <Carousel.Caption>
            <p>Context-based Management Variety Tool, es una herramienta desarrollada en conjunto entre la
              Universidad Nacional del Comahue y el INTA. Fue diseñada para permitir almacenar, consultar, modificar
              o visualizar la variedad de un dominio, y todos los casos trabajados, permitiendo su reuso en otros casos
              de estudio. </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="text-center">
          <Imagen2 />
          
        </Carousel.Item>

        <Carousel.Item className="text-center">
          <Imagen3 />
        </Carousel.Item>

      </Carousel>
    </div>
  );
};

export default Saludo;
