import Image from 'react-bootstrap/Image';
import ruta from './FAIF.png'

function Imagen2({ className, style }) {
  return (
    <Image 
      src={ruta} 
      fluid 
      className={className} // Recibe clases del padre
      style={style} // Recibe estilos inline del padre
    />
  );
}

export default Imagen2;