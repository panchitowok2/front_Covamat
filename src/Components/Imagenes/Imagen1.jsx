import Image from 'react-bootstrap/Image';
import ruta from './Central-UNCo2-scaled.jpg'

function Imagen1({ className, style }) {
  return (
    <Image 
      src={ruta} 
      fluid 
      className={className} // Recibe clases del padre
      style={style} // Recibe estilos inline del padre
    />
  );
}

export default Imagen1;