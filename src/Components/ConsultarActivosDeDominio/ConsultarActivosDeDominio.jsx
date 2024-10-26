import SeleccionContexto from './SeleccionContexto';
//import Alert from 'react-bootstrap/Alert';

function ConsultarActivosDeDominio() {
    //const [contexto, setContexto] = useState([]);
    let contexto = [];

    const agregarContexto = (con) => {
        if(con != ''){
            contexto.push(con)
            console.log('El valor del arreglo en el componente padre: ', contexto)
            return true
        }else{
            return false
        }
        
    }

    return (
        <>
            <h2>Consultar Activos de Dominio</h2>
            <p>Busqueda de casos que compartan contextos similares</p>
            <SeleccionContexto agregarContexto={agregarContexto}/>
            
        </>

    )
}

export default ConsultarActivosDeDominio;