import React, { useEffect, useState } from 'react';
import { GET_DOMAINS, GET_VARIETY_TYPES, GET_VARIATIONS_POINTS, GET_DATASHEETS_BY_DOMAIN } from '../../Querys/Querys.jsx'
import { useQuery, useLazyQuery } from '@apollo/client';


//este va a ser el datasheet al cual se le van a agregar las variaciones,
let datasheet = {};

//este va a ser el datasheet que se le envie al back
let InputDatasheetInstance = {}

//let domains = [];
//let varietyTypes = [];

function DocumentarVariedad() {

    const [dominioEscrito, setDominioEscrito] = useState('');
    const [tipoVariacion, setTipoVariacion] = useState('');
    const [puntoDeVariacion, setPuntoDeVariacion] = useState('');
    const [seleccionTipoVariacion, setSeleccionTipoVariacion] = useState(null);



    const { loading: loadingDomains, error: errorDomains, data: dataDomains } = useQuery(GET_DOMAINS);
    const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETY_TYPES);
    const [obtenerVP, { loading: loadingVP, error: errorVP, data: dataVP }] = useLazyQuery(GET_VARIATIONS_POINTS, {
        variables: {
            varietyType: {
                name: seleccionTipoVariacion
            }
        }
    });
    const [obtenerDatasheetsPorDom, { loading: loadingDatasheets, error: errorDatasheets, data: dataDatasheets }] = useLazyQuery(GET_DATASHEETS_BY_DOMAIN);


    const handleSubmit = evt => {

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
        setDominioEscrito(event.target.value);
    };

    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un tipo de variacion nuevo mediante TECLADO, y deshabilita el selector de tipo de variacion
    const entradaTipoVariacion = (event) => {
        setTipoVariacion(event.target.value);
    };

    //este metodo se llama cuando el usuario ingresa un dato en el campo de 
    //ingresar un tipo de variacion nuevo mediante TECLADO, y deshabilita el selector de tipo de variacion
    const entradaPuntoDeVariacion = (event) => {
        setPuntoDeVariacion(event.target.value);
    };

    const buscarPuntosDeVariacion = (event) => {
        if (event.target.value != 0) {
            setSeleccionTipoVariacion(event.target.options[event.target.selectedIndex].innerText)
            obtenerVP();
        } else {
            setSeleccionTipoVariacion(null)
        }
    }

    const buscarDatasheetsPorDominio = (event) => {
        if (event.target.value != 0) {
            console.log('Hago la consulta con este valor: ', event.target.options[event.target.selectedIndex].innerText)
            obtenerDatasheetsPorDom({
                variables: {
                    domain: {
                        name: event.target.options[event.target.selectedIndex].innerText
                    }
                }
            })
        }
    }

    return (
        <div className='row'>
            <h2>Documentar Variedad</h2>
            <p>Almacene variaciones en un datasheet segun su dominio, tipo de variación y punto de variación.
                Si no encuentra alguno de estos datos, ingresarlo en el campo de texto correspondiente y se creara una nueva datasheet.</p>
            <div className='card col-md-4 ml-3'>
                <h5 className='card-header'>
                    Seleccione un datasheet para agregar variaciones:
                </h5>
                <form className="card-body" onSubmit={evt => handleSubmit(evt)}>
                    <div>
                        <label>Seleccione dominio: </label>
                        <select className="form-control" disabled={dominioEscrito !== ''} onChange={buscarDatasheetsPorDominio}>
                            <option value='0'>Seleccionar dominio</option>
                            {!loadingDomains && !errorDomains && dataDomains.getDomains && dataDomains.getDomains.map((dominio, index) => (
                                <option key={index} value={index + 1}>{dominio.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Si no encuentra el dominio, escribalo a continuación: </label>
                        <input className="form-control" value={dominioEscrito} onChange={entradaDominio} />
                    </div>
                    <div>
                        <label>Seleccione el tipo de variedad: </label>
                        <select className="form-control" disabled={tipoVariacion !== ''} onChange={buscarPuntosDeVariacion}>
                            <option value='0'>Seleccionar tipo de variedad</option>
                            {!loadingVT && !errorVT && dataVT && dataVT.getAllVarietyTypes.map((varietyType, index) => (
                                <option key={index} value={index + 1}>{varietyType.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Si no encuentra el tipo de variedad, escribala a continuación: </label>
                        <input className="form-control" value={tipoVariacion} onChange={entradaTipoVariacion} />
                    </div>
                    <div>
                        <label>Seleccione punto de variación: </label>
                        <select className="form-control" disabled={puntoDeVariacion !== ''}>
                            <option value="0">Seleccionar punto de variación</option>
                            {!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypes.map((variationPoint, index) => (
                                <option key={index} value={index + 1}>{variationPoint.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Si no encuentra el punto de variación, escribalo a continuación: </label>
                        <input className="form-control" onChange={entradaPuntoDeVariacion} />
                    </div>
                    <div className="mt-2 d-flex justify-content-end">
                        <button type="button submit" className="btn btn-success">Siguiente</button>
                    </div>
                </form>
            </div >
            <div className='col-md-4'>
                aca se tienen que ir viendo los datasheet
                {!loadingDatasheets && !errorDatasheets && dataDatasheets && dataDatasheets.getDatasheetsByDomain.map((datasheet, index) => (
                    <div key={index}>
                        <p>
                            <strong>Nombre:</strong> {datasheet.name}
                        </p>
                        <p>
                            <strong>Dominio:</strong> {datasheet.domain.name}
                        </p>
                        <p>
                            <strong>Tipo de variedad:</strong> {datasheet.varietyType.name}
                        </p>
                        <p>
                            <strong>Punto de Variación:</strong>{datasheet.variationPoint.name}
                        </p>
                        <p>
                            <strong>Variaciones:</strong> {datasheet.variations.name}
                        </p>
                    </div>
                ))}
            </div>
        </div >
    )

}

export default DocumentarVariedad;
