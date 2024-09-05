import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState, useEffect, useRef } from 'react';
import { set, useForm } from 'react-hook-form';
import {
    GET_IS_DATASHEET_INSTANCE_IN_CASE, GET_VARIETYTYPES_BY_DOMAIN,
    GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN,
    GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT,
    CREATE_DATASHEET_INSTANCE,
    GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT
} from '../../Querys/Querys';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';

function DatosDatasheetInstance({ dominio, nombreCaso, mostrarConfirmar }) {
    const [variable, setVariable] = useState([]);
    const [varietyType, setVarietyType] = useState(null);
    const [variationPoint, setVariationPoint] = useState(null);
    const [variation, setVariation] = useState(null);
    const [idDatasheet, setIdDatasheet] = useState(null);
    const [idArr, setIdArr] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
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

    const [createDatasheetInstance, { loading: loadingCreateDatasheet, error: errorCreateDatasheet, data: dataCreateDatasheet }] = useMutation(CREATE_DATASHEET_INSTANCE);

    const [getDatasheetId, { loading: loadingId, error: errorId, data: dataId }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        fetchPolicy: "network-only"
    });

    const [isDatasheetInstanceInCase, { loading: loadingDInCase, error: errorDInCase, data: dataDInCase }] = useLazyQuery(GET_IS_DATASHEET_INSTANCE_IN_CASE, {
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
    useDataChangeEffect(dataCreateDatasheet, () => {
        //console.log('dataCreateDatasheet ha cambiado', dataCreateDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingCreateDatasheet && !errorCreateDatasheet && dataCreateDatasheet && dataCreateDatasheet.createDatasheetInstance) {
            //console.log("agrego al id del datasheet instance al arreglo del caso: ", dataCreateDatasheet.createDatasheetInstance)
            if (!idArr) {
                setIdArr(dataCreateDatasheet.createDatasheetInstance)
            } else {
                idArr.push(dataCreateDatasheet.createDatasheetInstance)
                //console.log("Agrego al array el nuevo id de datasheet", idArr)
            }
            showAlertMessage('Exito', 'success', 'Datasheet Instance añadida al caso')
            //console.log('el arreglo donde voy guardando los datasheet instance: ', variable)
        }
    });

    useDataChangeEffect(dataDInCase, () => {
        console.log('dataDInCase ha cambiado', dataDInCase);
        // Aquí puedes llamar a tu método
        if (!loadingDInCase && !errorDInCase && dataDInCase) {
            console.log("cambio el valor de DInCase: ", dataDInCase.getIsDatasheetInstanceInCase)
            if (dataDInCase.getIsDatasheetInstanceInCase) {
                console.log('La variacion ya esta en el caso', dataDInCase.getIsDatasheetInstanceInCase, ' ', idArr)
                showAlertMessage('Error', 'danger', 'La Datasheet Instance ingresada ya existe en el caso')
            } else {
                console.log('Llamo a create datasheet instance')
                auxVar = { name: variation, variables: null } // aca van tambien las variables
                variationArr = [auxVar];
                //createDatasheetInstance(dominio, varietyType, variationPoint, dataId.getDatasheetByDomainVTVP[0]._id, variationArr)
                createDatasheetInstance({
                    variables: {
                        datasheetInstance: {
                            domain: { name: dominio },
                            varietyType: { name: varietyType },
                            variationPoint: { name: variationPoint },
                            name: null,
                            id_datasheet: dataId.getDatasheetByDomainVTVP[0]._id,
                            variations: variationArr
                        }
                    }
                });
            }
        }
    });

    useEffect(() => {
        // llamo a los metodos que obtienen datos nuevamente
        //if (dataVT) {
        //console.log('valor dataVT: ', dataVT.getVarietyTypesByDomain[0].name)
        //    setVarietyType(dataVT.getVarietyTypesByDomain[0].name)
        //}

    }, [dataVT, errorVT, loadingVT]);

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
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        auxVar = { name: variation, variables: null } // aca van tambien las variables
        variationArr = [auxVar];
        //console.log('entro a handleSubmit', idDatasheet)
        if (!loadingDInCase && !errorDInCase && idDatasheet) {
            //console.log('evento handleSubmit, valor de dataid: ', dataId)
            //if (variable.length === 0) {
            // Si no cree ninguna instancia de datasheet creo la primera
            // Invocar metodo que crea datasheet. 
            const datash = {
                domain: { name: dominio },
                varietyType: { name: varietyType },
                variationPoint: { name: variationPoint },
                name: null,
                id_datasheet: null, //no lo uso en la verificacion
                variations: variationArr
            }
            //console.log('antes de la llamada a DInCaseCall', idCase, datash )
            await isDatasheetInstanceInCase({
                variables: {
                    idDatasheetInstanceArray: idArr,
                    inputDatasheetInstance: datash
                }
            });
            //await createDatasheetInstance(dominio, varietyType, variationPoint, dataId.getDatasheetByDomainVTVP[0]._id, variationArr)
            //} else {
            //    console.log('Ya hay una instancia de datasheet agregada: ', variable )
            //}

            //setIdDatasheetInstance(newIdDatasheetInstance)
            // Asignar Id de datasheet a el caso que estoy creando.

        }

    }
    const handleSubmitCase = async (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        console.log('hanldeSubmit de guardar caso: ')
        if (idArr.length > 0) {
            // si el usuario guardo al menos una instancia de datasheet
            // añadir arreglo de variaciones al caso y terminar el proceso
            mostrarConfirmar(idArr)
        }


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
                                                <th>Valor</th>
                                            </tr>
                                        </thead>
                                        {/*Recorro el arreglo que guarda las cariables almacenadas */}
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><input className='no-outline border-0 bg-transparent w-100' onChange={handleInputVar} /></td>
                                                <td><input className='no-outline border-0 bg-transparent w-100' /></td>
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
                                            <tr>
                                                <td>1</td>
                                                <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                                <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </>
                                : <></>}

                            <Button className='float-end mb-2' variant="primary" type="submit">
                                Agregar
                            </Button>

                        </div>
                    </Form>
                </div>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form onSubmit={handleSubmitCase}>
                        <h5 className='fw-bold card-header w-100'>Datos del Caso</h5>
                        <Form.Group className="mb-2 card-body position-relative" controlId="datosCaso">
                            <p>Nombre: {nombreCaso}</p>
                            <Button className='position-absolute top-0 end-0 m-2'
                                variant="primary"
                                type="submit"
                                disabled={idArr.length === 0} >
                                Guardar
                            </Button>
                            <p>Dominio: {dominio}</p>
                            <p>Variedades:</p>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>

    )
}

export default DatosDatasheetInstance;