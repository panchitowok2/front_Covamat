import DatosCaso from './DatosCaso';
import DatosDatasheetInstance from './DatosDatasheetInstance';
import { useState } from 'react';

function DocumentarCaso() {
const [datosCasoIngresados, setDatosCasoIngresados] = useState(false);
    return (
        <>
        {datosCasoIngresados ?
            <DatosCaso setDatosCasoIngresados={setDatosCasoIngresados}/>
            :
            <DatosDatasheetInstance />
        }
            </>

    )
}

export default DocumentarCaso;