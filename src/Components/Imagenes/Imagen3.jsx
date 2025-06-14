import Image from 'react-bootstrap/Image';
import ruta from './informatica.jpg'

function Imagen3({ className, style }) {
  return (
    <Image 
      src={ruta} 
      fluid 
      className={className} // Recibe clases del padre
      style={style} // Recibe estilos inline del padre
    />
  );
}

export default Imagen3;