import React, { useEffect, useState } from 'react';
import { GET_DOMAINS, GET_VARIETY_TYPES, GET_VARIATIONS_POINTS, GET_DATASHEETS_BY_DOMAIN } from '../../Querys/Querys.jsx'
import { useQuery, useLazyQuery } from '@apollo/client';
import Prueba from '..//Prueba.jsx'
import { useForm } from 'react-hook-form';

//este va a ser el datasheet al cual se le van a agregar las variaciones,
let datasheet = {};

//este va a ser el datasheet que se le envie al back
let InputDatasheetInstance = {}

//let domains = [];
//let varietyTypes = [];

function DocumentarVariedad() {

    const { register, formState: { errors }, handleSubmit} = useForm();

    const [dominioEscrito, setDominioEscrito] = useState('');
    const [valueSelectorDominio, setSelectorDominio] = useState(0);
    const [puntoDeVariacion, setPuntoDeVariacion] = useState('');
    const [seleccionTipoVariacion, setSeleccionTipoVariacion] = useState(null);



    const { loading: loadingDomains, error: errorDomains, data: dataDomains } = useQuery(GET_DOMAINS);

    //const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETY_TYPES);

    const [obtenerVP, { loading: loadingVP, error: errorVP, data: dataVP }] = useLazyQuery(GET_VARIATIONS_POINTS, {
        variables: {
            varietyType: {
                name: seleccionTipoVariacion
            }
        }
    });
    const [obtenerDatasheetsPorDom, { loading: loadingDatasheets, error: errorDatasheets, data: dataDatasheets }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN);


    const onSubmit = evt => {
        evt.preventDefault();
        if(evt.target.InputDominio.value != ""){
            //
        }else{
            //El usuario ingreso un dominio por texto, debo crear datasheet
        }
        console.log('El valor del input es: ', evt.target.InputDominio.value)
        //console.log('Los datos del form son: ', evt.target.SelectorDominio.options[evt.target.SelectorDominio.selectedIndex].innerText)
    };

    /*
        useEffect(() => {
            if(dataVT){
                console.log('Se actualizo el valor de dataVT')
            }
        }, [dataDomains, dataVT, dataVP]);
    */
    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un dominio nuevo mediante TECLADO, y deshabilita el selector de dominio
    const entradaDominio = (event) => {
        if(event.target.value != ''){
        //seteo el formulario en 0 para borrar la busqueda
        //console.log('entro al if de entrada dominio')
        //pongo el selector en una opcion nula
        setSelectorDominio(0);
        //actualizo el arreglo de datasheets para que no muestre ninguno
        buscarDatasheetsPorDominio(0)
    }
        setDominioEscrito(event.target.value);
        //console.log('El valor del input de dominio es: ', event.target.value)
    };

    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un tipo de variacion nuevo mediante TECLADO, y deshabilita el selector de tipo de variacion
    const entradaPuntoDeVariacion = (event) => {        
        setPuntoDeVariacion(event.target.value);
    };

    const buscarPuntosDeVariacion = (event) => {
        if (event.target.value != 0) {
            setSeleccionTipoVariacion(event.target.options[event.target.selectedIndex].innerText.toLowerCase())
            obtenerVP();
        } else {
            setSeleccionTipoVariacion(null)
        }
    }

    const buscarDatasheetsPorDominio = (event) => {
        if (event != 0) {
        //console.log('El valor numerico del selector es: ', event.target.value)
        setSelectorDominio(event.target.value)
        obtenerDatasheetsPorDom({
            variables: {
                domain: {
                    name: event.target.options[event.target.selectedIndex].innerText
                }
            }
        })
        }else{
            obtenerDatasheetsPorDom({
                variables: {
                    domain: {
                        name: ""
                    }
                }
            })
        }
    }

    return (
        <>
            <h2>Documentar Variedad</h2>
            <p>Almacene variaciones en un datasheet segun su dominio, tipo de variación y punto de variación.
                Si no encuentra alguno de estos datos, ingresarlo en el campo de texto correspondiente y se creara una nueva datasheet.</p>
            {/* */}
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3'>
                    <h5 className='card-header'>
                        Seleccione un datasheet para agregar variaciones:
                    </h5>
                    <form className="card-body" onSubmit={evt => handleSubmit(evt)}>
                        <div>
                            <label>Seleccione dominio: </label>
                            <select className="form-control" name="SelectorDominio" {...register("dominio", { required: true, maxLength: 10 })} disabled={dominioEscrito !== ''} value={valueSelectorDominio} onChange={(event) => buscarDatasheetsPorDominio(event)}>
                                <option value='0'>Seleccionar dominio</option>
                                {!loadingDomains && !errorDomains && dataDomains.getDomains && dataDomains.getDomains.map((dominio, index) => (
                                    <option key={index} value={index + 1}>{dominio.name}</option>
                                )
                                )}
                            </select>
                            <p className={`text-danger ${errors.dominio?.type === "required" ? "" : "invisible"}`}>Dominio Requerido</p>
                        </div>
                        <div>
                            <label>Si no encuentra el dominio, escribalo a continuación: </label>
                            <input className="form-control" name="InputDominio" value={dominioEscrito} onChange={entradaDominio} />
                        </div>
                        <div>
                            <label>Seleccione el tipo de variedad: </label>
                            <select className="form-control" name="SelectorTipoVariedad" onChange={buscarPuntosDeVariacion}>
                                <option value='0'>Seleccionar tipo de variedad</option>
                                <option value='1'>Fuente</option>
                                <option value='2'>Procesamiento</option>
                                <option value='3'>Contexto</option>
                                <option value='4'>Contenido</option>
                            </select>
                        </div>
                        <div>
                            <label>Seleccione punto de variación: </label>
                            <select className="form-control" name="SelectorPuntoVariacion" disabled={puntoDeVariacion !== ''}>
                                <option value="0">Seleccionar punto de variación</option>
                                {!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypes.map((variationPoint, index) => (
                                    <option key={index} value={index + 1}>{variationPoint.name}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label>Si no encuentra el punto de variación, escribalo a continuación: </label>
                            <input className="form-control" name="InputPuntoVariacion" onChange={entradaPuntoDeVariacion} />
                        </div>
                        <div className="mt-2 d-flex justify-content-end">
                            <button type="button submit" className="btn btn-success" >Siguiente</button>
                        </div>
                    </form>
                    {/* */}
                </div >
                <div className='col'>
                    {!loadingDatasheets && !errorDatasheets && dataDatasheets && dataDatasheets.getDatasheetsByDomain.map((datasheet) => (
                        <Prueba datasheet={datasheet} />
                    ))}
                </div>
            </div >
        </>
    )

}

export default DocumentarVariedad;
