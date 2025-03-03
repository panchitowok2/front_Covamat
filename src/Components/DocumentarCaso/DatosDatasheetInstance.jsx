import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState, useEffect, useRef } from 'react';
import { set, useForm } from 'react-hook-form';
import DatosDatasheet from './DatosDatasheet.jsx'
import {
    GET_IS_DATASHEET_INSTANCE_IN_CASE,
    GET_VARIETYTYPES_BY_DOMAIN,
    GET_IS_DATASHEET_INSTANCE_DATA_IN_CASE,
    GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN,
    GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT,
    CREATE_DATASHEET_INSTANCE,
    GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT,
    ADD_VARIATIONS_TO_INSTANCE,
    ADD_VARIATIONS_TO_CASE,
    GET_DATASHEET_INSTANCES_BY_CASE,
    ADD_VARIATION_TO_CASE
} from '../../Querys/Querys';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';

function DatosDatasheetInstance({ dominio, nombreCaso, mostrarConfirmar, idCaso }) {
    const [variable, setVariable] = useState(null); // nombre de la variable de procesamiento usada
    const [varietyType, setVarietyType] = useState(null);
    const [variationPoint, setVariationPoint] = useState(null);
    const [variation, setVariation] = useState(null);
    const [idDatasheet, setIdDatasheet] = useState(null);
    const [idArr, setIdArr] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
    const [rows, setRows] = useState([{ id: 1, var: '', value: '' }]);


    const addRow = () => {
        const newRow = { id: rows.length + 1, value: '' };
        setRows([...rows, newRow]);
    };

    let auxVar = null
    let variationArr = []

    const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETYTYPES_BY_DOMAIN,
        {
            variables: { domain: { name: dominio } },
            fetchPolicy: "network-only"
        });
    //const seleccionPuntoVariacion = watch("selectorPuntoVariacion"); // Obtener el valor del selector de tipo de variedad
    //const { loadingVP, errorVP, dataVP } = useGetVariationPointsByVarietyTypeAndDomain(dominio);
    const { loading: loadingVP, error: errorVP, data: dataVP } = useQuery(GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN, {
        variables: { varietyType: { name: varietyType }, domain: { name: dominio } },
        fetchPolicy: "network-only"
    });

    const { loading: loadingV, error: errorV, data: dataV } = useQuery(GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        variables: { domain: { name: dominio }, varietyType: { name: varietyType }, variationPoint: { name: variationPoint } },
        fetchPolicy: "network-only"
    });

    const [getDatasheetId, { loading: loadingId, error: errorId, data: dataId }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        fetchPolicy: "network-only"
    });

    // Añade variacion a el caso
    const [addVariationToCase, { loading: loadingAddVariationToCase, error: errorAddVariationToCase, data: dataAddVariationToCase }] = useMutation(ADD_VARIATION_TO_CASE);

    const [getInstances, { loading: loadingInstances, error: errorInstances, data: dataInstances }] = useLazyQuery(GET_DATASHEET_INSTANCES_BY_CASE, {
        variables: { idCase: idCaso },
        fetchPolicy: "network-only"
    });

    // Evento para mostrar mensajes
    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setShowAlert(true)
    }

    function useDataChangeEffect(data, callback) {
        const dataRef = useRef(data);

        if (data !== dataRef.current) {
            callback();
            dataRef.current = data;
        }
    }

    useDataChangeEffect(dataVT, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingVT && !errorVT && dataVT) {
            setVarietyType(dataVT.getVarietyTypesByDomain[0].name)
        }
    });

    useDataChangeEffect(dataVP, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingVP && !errorVP && dataVP && dataVT) {
            setVariationPoint(dataVP.getVariationPointsByVarietyTypeAndDomain[0].name)
            //getInstances()
        }
    });
    useDataChangeEffect(dataV, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingV && !errorV && dataVP && dataVT && dataV.getVariationsByDomainVTVP) {
            setVariation(dataV.getVariationsByDomainVTVP[0].name)
            getDatasheetId({
                variables: {
                    domain: { name: dominio },
                    varietyType: { name: varietyType },
                    variationPoint: { name: variationPoint }

                }
            })
        }
    });
    useDataChangeEffect(dataId, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Obtengo id del datasheet documentado por el servicio 1
        if (!loadingId && !errorId && dataId && dataId.getDatasheetByDomainVTVP) {
            //console.log('obtengo dataId ', dataId.getDatasheetByDomainVTVP[0]._id)
            setIdDatasheet(dataId.getDatasheetByDomainVTVP[0]._id)
        }
    });

    // Verifico si se recuperaron los datos de las datasheet instances cargadas en el caso
    useDataChangeEffect(dataInstances, () => {
        console.log('dataInstances ha cambiado', dataInstances);
        // Aquí puedes llamar a tu método
        if (!loadingInstances && !errorInstances && dataInstances) {
            console.log("cambio el valor de dataInstances: ", dataInstances)
            if (dataInstances.getDatasheetsInstancesByCase) {
                console.log('Recupero las datasheet instances')
            } else {
                console.log('no trajo las intancias')
            }
        }
    });

    // Si agrego algo al caso llamo al metodo que recupera las datasheet instances
    useDataChangeEffect(dataAddVariationToCase, () => {
        console.log('dataAddVariationToCase ha cambiado', dataAddVariationToCase);
        // Aquí puedes llamar a tu método
        if (!loadingAddVariationToCase && !errorAddVariationToCase && dataAddVariationToCase) {
            console.log("cambio el valor de dataAddVariationToCase: ", dataAddVariationToCase)
            if (dataAddVariationToCase.addVariationToCase) {
                console.log('Agrego informacion al caso')
                getInstances()
            } else {
                console.log('no agrego nada al caso')
            }
        }
    });

    useEffect(() => {
        // llamo a los metodos que obtienen datos nuevamente
        //if (dataVT) {
        //console.log('valor dataVT: ', dataVT.getVarietyTypesByDomain[0].name)
        //    setVarietyType(dataVT.getVarietyTypesByDomain[0].name)
        //}

    }, []);

    const handleSelectVT = (event) => {
        //console.log('actualizo variable estado: ', event.target.value)
        setVarietyType(event.target.value);
    };
    const handleSelectVP = (event) => {
        //console.log('actualizo variable estado: ', event.target.value)
        setVariationPoint(event.target.value);
    };
    const handleSelectV = (event) => {
        //console.log('actualizo variable estado: ', event.target.value)
        setVariation(event.target.value);
    };
    const handleInputVar = (event) => {
        //console.log('actualizo campo input var: ', event.target.value)
        setVariable(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        auxVar = { name: variation, variables: null } // aca van tambien las variables
        variationArr = [auxVar];
        //console.log('entro a handleSubmit', idDatasheet)
        if (!loadingAddVariationToCase && !errorAddVariationToCase && idDatasheet) {
            //console.log('evento handleSubmit, valor de dataid: ', dataId)
            // Llamo al metodo que agrega datasheet instance al caso
            const datash = {
                domain: { name: dominio },
                varietyType: { name: varietyType },
                variationPoint: { name: variationPoint },
                name: null,
                id_datasheet: idDatasheet,
                variations: variationArr
            }
            // si la variacion es de tipo procesamiento, añade al datasheet
            // de entrada el arreglo de variables
            if (varietyType === 'procesamiento') {
                if (rows.length > 0) {
                    const valuesArray = {
                        var: variable,
                        valueArray: null
                    }
                    const arr = rows.map(row => ({ var: row.var, value: row.value }));
                    //console.log('values array',valuesArray)
                    valuesArray.valueArray = arr
                    auxVar.variables = valuesArray
                    console.log('auxVar object', auxVar)

                }

            }
            console.log('antes de la llamada a AddVariationToCase', idCaso, datash)
            addVariationToCase({
                variables: {
                    idCase: idCaso,
                    datasheetInstance: datash
                }
            });
        }
    }

    const handleSubmitCase = async (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        console.log('hanldeSubmit de guardar caso: ')
        mostrarConfirmar(true)
    }

    //{...register("selectorTipoVariedad", { required: false })}
    return (
        <>
            <Alert show={showAlert} variant={variant} onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>{msgAlertHeader}</Alert.Heading>
                {msgAlert &&
                    <div>
                        {msgAlert}
                    </div>}
            </Alert>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form onSubmit={handleSubmit}>
                        <h5 className='fw-bold card-header w-100' >Seleccione variedades para el caso</h5>
                        <div className='card-body'>

                            <Form.Group className="mb-2" controlId="tipoVariacion">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Tipo de Variación'>
                                    <Form.Select aria-label='selector-tipo-variacion' onChange={handleSelectVT} >
                                        {!loadingVT && !errorVT && dataVT && dataVT.getVarietyTypesByDomain.map((varietyType, index) => (
                                            <option key={index} value={varietyType.name}>{varietyType.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-2" controlId="puntoVariacion">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Punto de Variación' >
                                    <Form.Select aria-label='selector-punto-variacion' onChange={handleSelectVP}>
                                        {!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypeAndDomain.map((variationPoint, index) => (
                                            <option key={index} value={variationPoint.name}>{variationPoint.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-2" controlId="variedad">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Variedad'>
                                    <Form.Select aria-label='selector-variedad' onChange={handleSelectV}>
                                        {!loadingV && !errorV && dataV && dataV.getVariationsByDomainVTVP.map((variation, index) => (
                                            <option key={index} value={variation.name}>{variation.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>
                            {varietyType == 'procesamiento' ?
                                <>
                                    <Table striped bordered hover size='sm'>
                                        <thead>
                                            <tr>
                                                <th colSpan={3}>Ingresar Variables</th>
                                            </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>
                                        {/*Recorro el arreglo que guarda las cariables almacenadas */}
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><input className='no-outline border-0 bg-transparent w-100' onChange={handleInputVar} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <Table striped bordered hover size='sm'>
                                        <thead>
                                            <tr>
                                                <th colSpan={3}>Ingresar Conjunto de valores</th>
                                            </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre</th>
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        {/*Recorro el arreglo que guarda las cariables almacenadas */}
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{row.id}</td>
                                                    {/* Input para 'var' */}
                                                    <td>
                                                        <input
                                                            className="no-outline border-0 bg-transparent w-100"
                                                            value={row.var || ''}
                                                            onChange={(e) => {
                                                                const newRows = [...rows];
                                                                newRows[index].var = e.target.value; // Actualiza 'var'
                                                                setRows(newRows);
                                                            }}
                                                        />
                                                    </td>
                                                    <td><input className="no-outline border-0 bg-transparent w-100"
                                                        value={row.value || ''}
                                                        onChange={(e) => {
                                                            const newRows = [...rows];
                                                            newRows[index].value = e.target.value;
                                                            setRows(newRows);
                                                        }} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button className='btn btn-primary' onClick={addRow}> Agregar Fila </Button>

                                </>
                                : <></>}

                            <Button className='float-end mb-2' variant="primary" type="submit" disabled={loadingVT || loadingVP || loadingV}>
                                Agregar
                            </Button>

                        </div>
                    </Form>
                </div>
                <div className='card col-md-4 ml-3 p-0 right-column'>
                    <Form onSubmit={handleSubmitCase}>
                        <h5 className='fw-bold card-header w-100'>Datos del Caso</h5>
                        <Form.Group className="mb-2 card-body position-relative" controlId="datosCaso">
                            <div className="position-relative pe-5 me-5 ">
                                <strong>Nombre: </strong>{nombreCaso}
                            </div>
                            <Button className='position-absolute top-0 end-0 m-2'
                                variant="primary"
                                type="submit"
                                disabled={false} >
                                Guardar
                            </Button>
                            <strong>Dominio: </strong>{dominio}<br />
                            <hr className="my-3" />
                            <strong>Variedades:</strong> <br />

                            {dataInstances && dataInstances.getDatasheetsInstancesByCase.map((datasheet) => (
                                <DatosDatasheet key={datasheet._id} datasheet={datasheet} />
                            ))}
                        </Form.Group>
                    </Form>

                </div>
            </div>
        </>

    )
}

export default DatosDatasheetInstance;