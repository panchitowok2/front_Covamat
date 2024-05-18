import React, { useEffect, useState, useRef } from 'react';
import { GET_DOMAINS, GET_VARIETY_TYPES, GET_VARIATIONS_POINTS, GET_DATASHEETS_BY_DOMAIN, GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, CREATE_DATASHEET } from '../../Querys/Querys.jsx'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import DatosDatasheet from './DatosDatasheet.jsx'
import { useForm } from 'react-hook-form';

//este va a ser el datasheet que se le envie al back
let InputDatasheetInstance = {}

function BusquedaDatasheet({ setIdDatasheet }) {

    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            dominio: '0', // Seteo el valor por defecto del selector
            selectorPuntoVariacion: '0',
        },
    });

    const [deshablitarSelector, setDeshabilitarSelector] = useState(false);
    const [deshablitarSelectorVP, setDeshabilitarSelectorVP] = useState(false);
    //const [valueSelectorDominio, setSelectorDominio] = useState(0);
    //const [puntoDeVariacion, setPuntoDeVariacion] = useState('');
    //const [seleccionTipoVariacion, setSeleccionTipoVariacion] = useState(null);

    const valueSelectorDominio = watch("dominio"); // Obtener el valor del selector de dominio
    const dominioEscrito = watch("inputDominio"); // Obtener el valor del input de dominio
    const seleccionTipoVariacion = watch("selectorTipoVariedad"); // Obtener el valor del selector de tipo de variedad
    const puntoDeVariacion = watch("inputPuntoVariacion"); // Obtener el valor del selector de punto de variacion
    const puntoDeVariacionSelector = watch("selectorPuntoVariacion"); // Obtener el valor del selector de punto de variacion

    const { loading: loadingDomains, error: errorDomains, data: dataDomains, refetch } = useQuery(GET_DOMAINS, {
        fetchPolicy: "network-only"
    });

    //const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETY_TYPES);

    const [obtenerVP, { loading: loadingVP, error: errorVP, data: dataVP }] = useLazyQuery(GET_VARIATIONS_POINTS, {
        variables: {
            varietyType: {
                name: seleccionTipoVariacion
            }
        },
        fetchPolicy: "network-only"
    });
    const [obtenerDatasheetsPorDom, { loading: loadingDatasheets, error: errorDatasheets, data: dataDatasheets }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN, {
        fetchPolicy: "network-only"
    });

    const [obtenerDatasheet, { loading: loadingDatasheet, error: errorDatasheet, data: dataDatasheet }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        fetchPolicy: "network-only"
    });

    const [createDatasheet, { loading: loadingCreateDatasheet, error: errorCreateDatasheet, data: dataCreateDatasheet }] = useMutation(CREATE_DATASHEET);

    const onSubmit = async (data) => {
        //evt.preventDefault();
        /*
        if(data.InputDominio.value != ""){
            //
        }else{
            //El usuario ingreso un dominio por texto, debo crear datasheet
        }
        */
        await obtenerDatasheet({
            variables: {
                domain: {
                    name: valueSelectorDominio
                },
                varietyType: {
                    name: seleccionTipoVariacion
                },
                variationPoint: {
                    name: puntoDeVariacionSelector
                }

            }
        })
        //console.log('Los datos del form son: ', evt.target.SelectorDominio.options[evt.target.SelectorDominio.selectedIndex].innerText)
    };

    // cuando intento buscar el datasheet por los valores de los selectores, si
    // devuelve alguno entonces paso a la siguiente pantalla. Si no encuentra nada
    // debo crear el datasheet con los valores que correspondan

    const crearDatasheet = () => {
        //crear datasheet
        let dom = "";
        let vp = "";
        //let name = "";
        if (dominioEscrito == "") { // si el valor del input de dominio esta vacio tomo el valor del selector
            if (puntoDeVariacion == "") {// si el valor del input de VP esta vacio tomo el valor del selector
                dom = valueSelectorDominio;
                vp = puntoDeVariacionSelector;
            } else {
                dom = valueSelectorDominio;
                vp = puntoDeVariacion;
            }
        } else {
            if (puntoDeVariacion == "") {// si el valor del input de VP esta vacio tomo el valor del selector
                dom = dominioEscrito;
                vp = puntoDeVariacionSelector;
            } else {
                dom = dominioEscrito;
                vp = puntoDeVariacion;
            }
        }

        console.log('antes de entrar a createDatasheet', dom, vp)
        // llamo al metodo
        createDatasheet({
            variables: {
                datasheet: {
                    domain: {
                        name: dom
                    },
                    name: "datasheetPrueba",
                    variationPoint: {
                        name: vp
                    },
                    varietyType: {
                        name: seleccionTipoVariacion
                    },
                    variations: [],
                }
            }
        })
    }

    function useDataChangeEffect(data, callback) {
        const dataRef = useRef(data);

        if (data !== dataRef.current) {
            callback();
            dataRef.current = data;
        }
    }

    // Luego puedes usar este hook en tu componente de la siguiente manera:

    useDataChangeEffect(dataDatasheet, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingDatasheet && dataDatasheet) {
            console.log('el largo del arreglo es: ', dataDatasheet.getDatasheetByDomainVTVP.length)
            if (dataDatasheet.getDatasheetByDomainVTVP.length > 0) { //encontro almenos un dataheet
                setIdDatasheet(dataDatasheet.getDatasheetByDomainVTVP[0]._id)
                //console.log('Accedo a los elementos del objeto: ', dataDatasheet.getDatasheetByDomainVTVP[0]._id)
            } else { //no encontro un datasheet con los selectores, crea uno.
                console.log('llamo a crear datasheet')
                crearDatasheet();
            }
        }
    });

    useDataChangeEffect(dataCreateDatasheet, () => {
        //console.log('dataCreateDatasheet ha cambiado', dataCreateDatasheet.createDatasheet);
        refetch();
        setIdDatasheet(dataCreateDatasheet.createDatasheet)
    });

    useDataChangeEffect(dataDatasheets, () => {
        //console.log('dataDatasheets ha cambiado', dataDatasheets);
        refetch();
    });

    useEffect(() => {
        // llamo a los metodos que obtienen datos nuevamente

    }, []);

    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un dominio nuevo mediante TECLADO, y deshabilita el selector de dominio
    const entradaDominio = (event) => {
        if (event.target.value !== '') {
            //seteo el formulario en 0 para borrar la busqueda
            //console.log('entro al if de entrada dominio')
            //pongo el selector en una opcion nula
            //setSelectorDominio(0);
            setValue("dominio", '0');
            //actualizo el arreglo de datasheets para que no muestre ninguno
            buscarDatasheetsPorDominio(0)
            setDeshabilitarSelector(true)
        } else {
            setDeshabilitarSelector(false)
        }
        setValue("inputDominio", event.target.value)
        //setDominioEscrito(event.target.value);
        //console.log('El valor del input de dominio es: ', event.target.value)
    };

    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un tipo de variacion nuevo mediante TECLADO, y deshabilita el selector de tipo de variacion
    /*const entradaPuntoDeVariacion = (event) => {        
        setPuntoDeVariacion(event.target.value);
    };*/


    const buscarPuntosDeVariacion = (event) => {
        //if (event.target.value != 0) {
        //setValue("selectorTipoVariedad", event.target.options[event.target.selectedIndex].innerText.toLowerCase())
        setValue("selectorTipoVariedad", event.target.value)
        //console.log('busco los vp con: ', seleccionTipoVariacion)
        obtenerVP();
        //} else {
        //    setSeleccionTipoVariacion(null)
        //}
    }


    const buscarDatasheetsPorDominio = (event) => {
        if (event !== 0) {
            //console.log('El valor numerico del selector es: ', event.target.value)
            //setSelectorDominio(event.target.value)
            obtenerDatasheetsPorDom({
                variables: {
                    domain: {
                        name: event.target.value
                    }
                }
            })
        } else {
            obtenerDatasheetsPorDom({
                variables: {
                    domain: {
                        name: ""
                    }
                }
            })
        }
    }

    const entradaPuntoVariacion = (event) => {
        if (event.target.value !== '') {
            //console.log('entro al if de entrada dominio')
            setValue("selectorPuntoVariacion", '0');
            setDeshabilitarSelectorVP(true)
        } else {
            setDeshabilitarSelectorVP(false)
        }
        //console.log('seteo el input de punto de variacion en: ', event.target.value)
        setValue("inputPuntoVariacion", event.target.value)
    }

    return (
        <>

            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3'>
                    <h5 className='card-header'>
                        Seleccione un datasheet para agregar variaciones:
                    </h5>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Seleccione dominio: </label>
                            <select className="form-control" {...register("dominio", { required: false })} disabled={deshablitarSelector} onChange={buscarDatasheetsPorDominio}>
                                <option value='0'>Seleccionar dominio</option>
                                {!loadingDomains && !errorDomains && dataDomains.getDomains && dataDomains.getDomains.map((dominio, index) => (
                                    <option key={index} value={dominio.name}>{dominio.name}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label>Si no encuentra el dominio, escribalo a continuación: </label>
                            <input className="form-control" {...register("inputDominio", { required: false, maxLength: 15 })} onChange={entradaDominio} />
                        </div>
                        <div>
                            <label>Seleccione el tipo de variedad: </label>
                            <select className="form-control" {...register("selectorTipoVariedad", { required: false })} onChange={buscarPuntosDeVariacion}>
                                <option value='0'>Seleccionar tipo de variedad</option>
                                <option value='fuente'>Fuente</option>
                                <option value='procesamiento'>Procesamiento</option>
                                <option value='contexto'>Contexto</option>
                                <option value='contenido'>Contenido</option>
                            </select>
                        </div>
                        <div>
                            <label>Seleccione punto de variación: </label>
                            <select className="form-control" {...register("selectorPuntoVariacion", { required: false })} disabled={deshablitarSelectorVP}>
                                <option value="0">Seleccionar punto de variación</option>
                                {!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypes.map((variationPoint, index) => (
                                    <option key={index} value={variationPoint.name}>{variationPoint.name}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label>Si no encuentra el punto de variación, escribalo a continuación: </label>
                            <input className="form-control" {...register("inputPuntoVariacion", { required: false })} onChange={entradaPuntoVariacion} />
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button type="button submit" className="btn btn-success" >Siguiente</button>
                        </div>
                    </form>
                    {/* */}
                </div >
                <div className='col'>
                    {!loadingDatasheets && !errorDatasheets && dataDatasheets && dataDatasheets.getDatasheetsByDomain.map((datasheet) => (
                        <DatosDatasheet datasheet={datasheet} />
                    ))}
                </div>
            </div >
        </>
    )

}

export default BusquedaDatasheet;
