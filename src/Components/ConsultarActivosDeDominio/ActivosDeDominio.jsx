import React from "react";
import { GET_CASES_SIMILAR_TO_REUSE_CASE, CREATE_CASE } from '../../Querys/Querys.jsx'
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import CasoDeReuso from "./CasoDeReuso.jsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';

const ActivosDeDominio = ({ contexto, dominio }) => {

    // Datos del caso que estoy creando
    const [nombreCaso, setNombreCaso] = useState(''); // nombre del caso que se esta creando
    const [descripcion, setDescripcion] = useState(''); // descripcion del caso que se esta creando
    const [datasheetInstances, setDatasheetInstances] = useState([]); // variable para almacenar las datasheet instances

    const { loading: loadingCases, error: errorCases, data: dataCases, refetch } = useQuery(GET_CASES_SIMILAR_TO_REUSE_CASE, {
        variables: contexto,
        fetchPolicy: "network-only"
    });
    const [createCase, { loading: loadingCreateCase, error: errorCreateCase, data: dataCreateCase }] = useMutation(CREATE_CASE);

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
                    "datasheetInstance": {
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
                }
                // Recorre las variaciones y agrega cada una al arreglo "variations"
                dat.variations.forEach((variation) => {
                    const auxVar = { name: variation.name }; // Crea el objeto auxVar
                    auxDatasheet.datasheetInstance.variations.push(auxVar); // Agrega auxVar al arreglo
                });

                // Actualiza el estado "datasheetInstances" concatenando los nuevos datos
                setDatasheetInstances((prevInstances) => [
                    ...prevInstances, // Mantiene los datos existentes
                    auxDatasheet, // Agrega los nuevos datos
                ]);
            })
        }
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

    /*
    Evento que se invoca cuando presionas el boton Agregar Caso Reuso.
    Primero crea el caso con los datos ingresados, y luego procede a crear las datasheet instances
    con los VP y Vs que el usuario eligio para el reuso.
    */
    const handleSubmit = async (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        // Creo el caso de reuso
        createCase({
            variables: {
                inputCase: {
                    name: nombreCaso,
                    domain: { name: dominio },
                    description: descripcion,
                    variety: null
                }
            }
        })
    }

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
                                {/* Muestro los casos que matchearon con ese contexto*/}
                                {dataCases.getCasesSimilarToReuseCase.map((reuseCase, index) => (
                                    <CasoDeReuso caso={reuseCase} key={index} setDatasheetInstance={setDatasheetInstance} />
                                ))}

                                <Button className='float-end mb-2'
                                    variant="primary"
                                    type="submit"
                                    disabled={false} >
                                    Crear Caso Reuso
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </> :
            <>
                {/* Acá voy a mostrar los casos que instancian esos contextos*/}
                No encontro casos de reuso
                {JSON.stringify(contexto)}
                {dominio}
            </>

    )

};

export default ActivosDeDominio;