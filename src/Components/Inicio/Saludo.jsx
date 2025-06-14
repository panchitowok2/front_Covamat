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
    <div className="mb-5">
      {/* Carrusel con altura fija */}
      <Carousel
        fade
        controls
        indicators
        className="vh-50" // Altura del 50% del viewport (ajusta si es necesario)
      >
        {/* --- Slide 1 --- */}
        <Carousel.Item className="h-100 position-relative">
          <div className="ratio ratio-16x9 h-100">
            <Imagen1
              className="w-100 h-100 object-fit-cover" // Clases para tamaño consistente
              style={{ objectPosition: "center" }} // Opcional: centra la imagen
            />
          </div>
          <Carousel.Caption className="bg-dark bg-opacity-75 p-3 rounded-3">
            <h3 className="fw-bold">CoVaMaT</h3>
            <p className="mb-0">
              Context-based Management Variety Tool, es una herramienta desarrollada en conjunto entre la
              Universidad Nacional del Comahue y el INTA. Fue diseñada para permitir almacenar, consultar, modificar
              o visualizar la variedad de un dominio, y todos los casos trabajados, permitiendo su reuso en otros casos
              de estudio.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* --- Slide 2 --- */}
        <Carousel.Item className="h-100">
          <div className="ratio ratio-16x9 h-100">
            <Imagen2
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </Carousel.Item>

        {/* --- Slide 3 --- */}
        <Carousel.Item className="h-100">
          <div className="ratio ratio-16x9 h-100">
            <Imagen3
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Saludo;
