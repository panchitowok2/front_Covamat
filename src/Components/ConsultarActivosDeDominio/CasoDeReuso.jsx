import React, { useEffect } from "react";
import { GET_DATASHEET_INSTANCES_BY_ID } from '../../Querys/Querys.jsx';
import { useQuery } from '@apollo/client';

const CasoDeReuso = ({ caso, index, setDatasheetInstance }) => {

    const { loading: loadingDatasheetInstances, error: errorDatasheetInstances, data: dataDatasheetInstances, refetch } = useQuery(GET_DATASHEET_INSTANCES_BY_ID, {
        variables: { "ids": caso.variety },
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        if (dataDatasheetInstances && dataDatasheetInstances.getDatasheetInstancesById) {
            console.log('Recupero datasheets instances: ' + JSON.stringify(dataDatasheetInstances))
            setDatasheetInstance(dataDatasheetInstances)
        }
    }, [dataDatasheetInstances]);

    

    return (
        caso &&
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
                            <div className="rectangle" key={index}>
                                <span><strong>Variación:</strong> {variation.name}</span><br />
                            </div>
                        ))}
                    </div>
                ))}
        </>
    )

};

export default CasoDeReuso;