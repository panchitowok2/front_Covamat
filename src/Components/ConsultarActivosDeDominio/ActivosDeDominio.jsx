import React from "react";
import { GET_CASES_SIMILAR_TO_REUSE_CASE, CREATE_REUSE_CASE } from '../../Querys/Querys.jsx'
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
//import CasoDeReuso from "./CasoDeReuso.jsx";
import RenderComponentWithDelay from "./RenderComponentWithDelay.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

const ActivosDeDominio = ({ contexto, dominio, showAlertMessage }) => {

    // Datos del caso que estoy creando 
    const [nombreCaso, setNombreCaso] = useState(''); // nombre del caso que se esta creando
    const [descripcion, setDescripcion] = useState(''); // descripcion del caso que se esta creando
    const [datasheetInstances, setDatasheetInstances] = useState([]); // variable para almacenar las datasheet instances

    const { loading: loadingCases, error: errorCases, data: dataCases, refetch } = useQuery(GET_CASES_SIMILAR_TO_REUSE_CASE, {
        variables: contexto,
        fetchPolicy: "network-only"
    });
    const [createReuseCase, { loading: loadingCreateReuseCase, error: errorCreateReuseCase, data: dataCreateReuseCase }] = useMutation(CREATE_REUSE_CASE);

    const handleNombreCasoChange = (event) => {
        setNombreCaso(event.target.value);
    };

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const setDatasheetInstance = (data) => {
        // Verifica si la propiedad "getDatasheetInstancesById" existe en "data"
        if (data && data.getDatasheetInstancesById) {
            data.getDatasheetInstancesById.forEach((dat) => {
                let auxDatasheet = {
                    "_id": dat._id,
                    "domain": {
                        "name": dat.domain.name
                    },
                    "name": null,
                    "variationPoint": {
                        "name": dat.variationPoint.name
                    },
                    "varietyType": {
                        "name": dat.varietyType.name
                    },
                    "variations": [
                    ]
                }

                // Recorre las variaciones y agrega cada una al arreglo "variations"
                dat.variations.forEach((variation) => {
                    const auxVar = { name: variation.name }; // Crea el objeto auxVar
                    auxDatasheet.variations.push(auxVar); // Agrega auxVar al arreglo
                });

                // Actualiza el estado "datasheetInstances" concatenando los nuevos datos
                setDatasheetInstances((prevInstances) => [
                    ...prevInstances, // Mantiene los datos existentes
                    auxDatasheet, // Agrega los nuevos datos
                ]);
            })
        }
    };

    /*
    Evento que se invoca cuando presionas el boton Agregar Caso Reuso.
    Primero crea el caso con los datos ingresados, y luego procede a crear las datasheet instances
    con los VP y Vs que el usuario eligio para el reuso.
    */
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que el submit refresque la página

        // Crear una copia de datasheetInstances sin el atributo _id
        const datasheetInstancesSinId = datasheetInstances.map((instance) => {
            const { _id, ...rest } = instance; // Elimina el atributo _id
            return rest; // Retorna el objeto sin _id
        });

        // Crear el caso de reuso
        createReuseCase({
            variables: {
                inputCase: {
                    name: nombreCaso,
                    domain: { name: dominio },
                    description: descripcion,
                    variety: null,
                },
                inputDatasheetInstance: datasheetInstancesSinId, // Usar el arreglo sin _id
            },
        });
    };

    /*
    Evento que se invoca cuando presionas el boton eliminar variacion,
    debe eliminar la datasheet instance del arreglo de datasheet instance
    */
    const eliminarVariacion = (id, varPointName, varName) => {
        setDatasheetInstances((prevInstances) => {
            // Crear una copia del arreglo previo
            const updatedInstances = prevInstances
                .map((instance) => {
                    // Verificar si el ID y el variationPoint coinciden
                    if (instance._id === id && instance.variationPoint.name === varPointName) {
                        // Filtrar las variaciones para eliminar la que coincide con varName
                        const updatedVariations = instance.variations.filter(
                            (variation) => variation.name !== varName
                        );

                        // Si el arreglo de variaciones no está vacío, retornar la instancia actualizada
                        if (updatedVariations.length > 0) {
                            return {
                                ...instance,
                                variations: updatedVariations, // Actualiza las variaciones
                            };
                        }
                        // Si el arreglo de variaciones está vacío, retornar null para eliminar esta instancia
                        return null;
                    }
                    // Si no coincide, retornar la instancia sin cambios
                    return instance;
                })
                .filter((instance) => instance !== null); // Filtrar las instancias que no sean null

            // Retornar el arreglo actualizado
            return updatedInstances;
        });
    };

    useEffect(() => {
        if (dataCases) {
            console.log("encontro un caso " + JSON.stringify(dataCases));
        }
        if (errorCases) {
            console.log("error  " + errorCases);
        }
        if (datasheetInstances) {
            console.log("se actualizo la variable datasheet instances  " + JSON.stringify(datasheetInstances));
        }
    }, [errorCases, datasheetInstances]);

    useEffect(() => {
        if (dataCreateReuseCase) {
            if (dataCreateReuseCase.createReuseCase) {
                console.log("Creo el caso " + dataCreateReuseCase.createReuseCase);
                showAlertMessage('Éxito', 'success', 'El caso y las datasheet instance fueron creados con éxito.');
            } else {
                showAlertMessage('Error', 'danger', 'Error al crear el caso.');
            }
        }
    }, [dataCreateReuseCase]);


    return (
        (dataCases && dataCases.getCasesSimilarToReuseCase.length > 0) ?
            <>
                {/* Acá voy a mostrar los casos que instancian esos contextos*/}
                <div className='row align-items-start'>
                    <div className='card col-md-4 ml-3 p-0'>
                        <Form onSubmit={handleSubmit}>
                            <h5 className='fw-bold card-header w-100' >Seleccionar variedades para reuso</h5>
                            <div className='card-body'>

                                <Form.Group className="mb-2" controlId="nombreCaso">
                                    <FloatingLabel
                                        controlId='floatingInput'
                                        label='Ingresar nombre del caso'
                                        className='mb-2'>
                                        <Form.Control placeholder="Ingresar nombre" value={nombreCaso}
                                            onChange={handleNombreCasoChange} required />

                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="dominio">
                                    <Form.Control
                                        placeholder="Dominio"
                                        value={dominio}
                                        readOnly
                                        className='mb-2'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="Descripción">
                                    <FloatingLabel
                                        controlId='floatingTextarea'
                                        label='Ingresar descripcón'
                                        className='mb-2'>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Ingresar descripción"
                                            value={descripcion}
                                            onChange={handleDescripcion}
                                            required
                                            style={{ height: '20vh' }} />
                                    </FloatingLabel>
                                </Form.Group>
                                <Button className='float-end mb-2 mt-2'
                                    variant="success"
                                    type="submit"
                                    disabled={nombreCaso === '' || descripcion === '' || datasheetInstances.length === 0} >
                                    Crear Caso Reuso
                                </Button>
                                {/* Muestro los casos que matchearon con ese contexto
                                {dataCases && dataCases.getCasesSimilarToReuseCase && dataCases.getCasesSimilarToReuseCase.length > 0 &&
                                    dataCases.getCasesSimilarToReuseCase.map((reuseCase) => (
                                        <CasoDeReuso caso={reuseCase} setDatasheetInstance={setDatasheetInstance} eliminarVariacion={eliminarVariacion} />
                                    ))}
                                */}
                                <RenderComponentWithDelay
                                    dataCases={dataCases}
                                    setDatasheetInstance={setDatasheetInstance}
                                    eliminarVariacion={eliminarVariacion}
                                />
                            </div>
                        </Form>
                    </div>
                    <div className='card col-md-4 ml-3 p-0'>
                        <Form>
                            {/* Datasheet instances seleccionados */}
                            <h5 className='fw-bold card-header w-100'>Puntos de variación + Variaciones seleccionadas:</h5>
                            {datasheetInstances && datasheetInstances.length > 0 ? (
                                datasheetInstances.map((dataIns, idx) => (
                                    <div className='ml-3' key={idx}>
                                        <div>
                                            <strong>Tipo de variedad: {dataIns.varietyType.name}</strong>
                                            <br />
                                        </div>
                                        <div className="triangle-container">
                                            <div className="triangle"></div>
                                            <span className="triangle-text">
                                                <strong>VP:</strong>
                                                <br />
                                                {dataIns.variationPoint.name}
                                            </span>
                                        </div>
                                        {dataIns.variations && dataIns.variations.map((variation, index) => (
                                            <div className="rectangle ml-2 mr-2" key={index}>
                                                <span><strong>Variación:</strong> {variation.name}</span><br />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos seleccionados.</p>
                            )}
                        </Form>
                    </div>
                </div>
            </> :
            <>
                {/* Hubo un error al buscar los casos para los parametros seleccionados*/}
                <h2>No se encontraron casos de reuso</h2>
            </>

    )

};

export default ActivosDeDominio;