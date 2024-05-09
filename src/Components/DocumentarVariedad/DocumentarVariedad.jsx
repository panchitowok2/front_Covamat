import React, { useState } from 'react';
import BusquedaDatasheet from './BusquedaDatasheet.jsx';
import AgregarVariaciones from './AgregarVariaciones.jsx';

function DocumentarVariedad() {
    const [datasheet, setIdDatasheet] = useState(null);

    const asignarId = (id) => {
        setIdDatasheet(id)
    }

    return (
        <>
            <h2>Documentar Variedad</h2>
            <p>Almacene variaciones en un datasheet segun su dominio, tipo de variación y punto de variación.
                Si no encuentra alguno de estos datos, ingresarlo en el campo de texto correspondiente y se creara una nueva datasheet.</p>
            {!datasheet ?
                <BusquedaDatasheet setIdDatasheet={asignarId} /> :
                <AgregarVariaciones datasheet={datasheet}/>}
        </>
    )

}

export default DocumentarVariedad;
