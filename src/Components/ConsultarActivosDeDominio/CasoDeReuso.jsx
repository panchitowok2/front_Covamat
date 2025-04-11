import React, { useEffect } from "react";
import { GET_DATASHEET_INSTANCES_BY_ID } from '../../Querys/Querys.jsx';
import { useQuery } from '@apollo/client';
import CloseButton from 'react-bootstrap/CloseButton';

const CasoDeReuso = ({ caso, setDatasheetInstance, eliminarVariacion }) => {

    const { loading: loadingDatasheetInstances, error: errorDatasheetInstances, data: dataDatasheetInstances, refetch } = useQuery(GET_DATASHEET_INSTANCES_BY_ID, {
        variables: { "ids": caso.variety },
        fetchPolicy: "network-only"
    });
/*
    const handleDeleteVariation = (varPointName, varName ) => {
        console.log("nombre variacion: ", varName, " VP ", varPointName);
        // Lógica para eliminar la variación o actualizar el estado
    };
*/
    useEffect(() => {
        if (dataDatasheetInstances && dataDatasheetInstances.getDatasheetInstancesById) {
            console.log('Recupero datasheets instances: ' + JSON.stringify(dataDatasheetInstances))
            setDatasheetInstance(dataDatasheetInstances)
        }
    }, [dataDatasheetInstances]);

    // Efecto para manejar el error y hacer refetch
    useEffect(() => {
        if (errorDatasheetInstances) {
            console.error("Error en la consulta:", errorDatasheetInstances.message);
            refetch(); // Intenta hacer refetch si hay un error
        }
    }, [loadingDatasheetInstances, errorDatasheetInstances, refetch]);

    if (loadingDatasheetInstances) {
        return <p>Cargando...</p>;
    }
    
    if (errorDatasheetInstances) {
        return <p>Error: {errorDatasheetInstances.message}</p>;
    }

    return (
        caso && dataDatasheetInstances && dataDatasheetInstances.getDatasheetInstancesById &&
        <>
            {/* Datos del caso*/}
            <h5>Caso </h5>
            <strong>Dominio: </strong> {caso.domain.name} <br />
            {/* <strong>Nombre: </strong> {datasheet.name} <br />*/}
            <strong>Nombre: </strong> {caso.name} <br />

            <strong>Descripción: </strong> {caso.description} <br />

            {dataDatasheetInstances && dataDatasheetInstances.getDatasheetInstancesById &&
                dataDatasheetInstances.getDatasheetInstancesById.map((datasheetInstance, index) => (
                    <div className="mt-1" key={index}>

                        <div>
                            <strong>Tipo de variedad: {datasheetInstance.varietyType.name}</strong>
                            <br />
                        </div>
                        <div className="triangle-container">
                            <div className="triangle"></div>
                            <span className="triangle-text">
                                <strong>VP:</strong>
                                <br />
                                {datasheetInstance.variationPoint.name}
                            </span>
                        </div>

                        {datasheetInstance.variations && datasheetInstance.variations.map((variation, index) => (
                            <div className="rectangle d-flex justify-content-between align-items-center mt-2 ml-2" key={index}>
                                <span><strong>Variación:</strong> {variation.name}</span><br />
                                <CloseButton onClick={() => eliminarVariacion(datasheetInstance._id, datasheetInstance.variationPoint.name, variation.name )}/>
                            </div>
                        ))}
                    </div>
                ))}
                <hr style={{ borderTop: "3px solid #000" }} className="my-3" />
        </>
    )

};

export default CasoDeReuso;