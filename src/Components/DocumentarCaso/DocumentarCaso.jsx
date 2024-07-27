import DatosCaso from './DatosCaso';
import DatosDatasheetInstance from './DatosDatasheetInstance';
import { useState, useEffect } from 'react';

function DocumentarCaso() {
const [datosCasoIngresados, setDatosCasoIngresados] = useState(false);
const [nombreCaso, setNombreCaso] = useState('');
const [dominio, setDominio] = useState('');
    const actualizarCasoIngresado = (nombreCaso, dominio) =>{
        console.log('se llamo al metodo actualizar caso ingresado')
        setDatosCasoIngresados(true);
        setNombreCaso(nombreCaso)
        setDominio(dominio)
    }

    return (
        <>
        <h2>Documentar Caso</h2>
        <p>Almacene un caso de estudio.</p>
        {!datosCasoIngresados ?
            <DatosCaso actualizarCasoIngresado={actualizarCasoIngresado}/>
            :
            <DatosDatasheetInstance dominio={dominio} nombreCaso={nombreCaso}/>
        }
            </> 

    )
}

export default DocumentarCaso;