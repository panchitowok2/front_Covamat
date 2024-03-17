import React, { useEffect, useState } from 'react';
import { GET_DOMAINS, GET_VARIETY_TYPES, GET_VARIATIONS_POINTS } from '../../Querys/Querys.jsx'
import { useQuery } from '@apollo/client';


//este va a ser el datasheet al cual se le van a agregar las variaciones,
let datasheet = {};

//este va a ser el datasheet que se le envie al back
let InputDatasheetInstance = {}

//let domains = [];
//let varietyTypes = [];

/*
// este metodo devuelve en un arreglo los dominios de la base de datos
function GetDomains() {
    const { loading, error, data } = useQuery(GET_DOMAINS);
    if (loading) {
        throw new Error('Los datos aún se están cargando.');
      } else if (error) {
        throw error;
      } else if (data && data.getDomains.some(() => true)) {
        return data.getDomains;
      } else {
        return null;
      }

}


//llamar a la funcion que me recupera los tipos de variedad del back por dominio
 function GetVarietyTypes() {
    return new Promise((resolve, reject) => {
        const { loading, error, data } = useQuery(GET_VARIETY_TYPES);
        if (loading) {
            reject(new Error('Los datos aún se están cargando.'));
          } else if (error) {
            reject(error)
          } else if (data && data.getAllVarietyTypes.some(() => true)) {
            console.log('El valor de data es: ', data)
            resolve(data.getDomains)
          } else {
            resolve(null);
          }
    })  

}

*/
function DocumentarVariedad() {
    const [nombre, setNombre] = useState('');
    const [dominioEscrito, setDominioEscrito] = useState('');
    const [tipoVariacion, setTipoVariacion] = useState('');
    const [seleccionTipoVariacion, setSeleccionTipoVariacion] = useState(null);
    const [domains, setDomains] = useState([]);
    const [varietyTypes, setVarietyTypes] = useState([]);
    const [variationPoints, setVariationPoints] = useState([]);



    const { loading: loadingDomains, error: errorDomains, data: dataDomains } = useQuery(GET_DOMAINS);
    const { loading: loadingVT, error: errorVT, data: dataVT } = useQuery(GET_VARIETY_TYPES);
    const { loading: loadingVP, error: errorVP, data: dataVP } = useQuery(GET_VARIATIONS_POINTS, {
        varietyType: {
            name: seleccionTipoVariacion
        }
    });


    const handleSubmit = evt => {

    };


    useEffect(() => {
        // Aquí puedes poner el código que quieres que se ejecute cuando 'domains' o 'varietyTypes' cambien
        if (dataDomains && dataDomains.getDomains.some(() => true)) {
            setDomains(dataDomains.getDomains)
        }
        if (dataVT && dataVT.getAllVarietyTypes.some(() => true)) {
            setVarietyTypes(dataVT.getAllVarietyTypes)
        }
        if(dataVP && dataVP.getVariationPointsByVarietyTypes.some(() => true)) {
            console.log('Cargo puntos de variacion', dataVP.getVariationPointsByVarietyTypes)
            setVariationPoints(dataVP.getVariationPointsByVarietyTypes)
        }
    }, [dataDomains, dataVT, dataVP]);

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

    const buscarPuntosDeVariacion = (event) => {
        if (event.target.value != 0) { 
            console.log('El tipo de variacion elegida fue: ', event.target.options[event.target.selectedIndex].innerText)
            setSeleccionTipoVariacion(event.target.options[event.target.selectedIndex].innerText)
        }else{
            setSeleccionTipoVariacion(null)
        }
    }


/*
    //llamo al metodo que me recupera los dominios
    GetDomains().then(resul => {
        setDomains(resul)
        //domains = resul
    }
    ).catch(() => {
        console.log('Error al obtener los dominios')
    })
 
    GetVarietyTypes().then(result => {
        setVarietyTypes(result)
        //varietyTypes = result
    }).catch((err) => {
        console.log('Error al obtener los tipos de variedad', err)
    })
*/
return (
    <div className='row'>
        <div className='card col-md-4'>
            <div className='card-header'>
                Mediante esta funcionalidad el usuario puede cargar en la base de datos una variacion de un tipo.
            </div>
            <form className="card-body" onSubmit={evt => handleSubmit(evt)}>
                <div>
                    <label>Seleccione dominio: </label>
                    <select className="form-control" disabled={dominioEscrito !== ''}>
                        <option value='0'>Seleccionar dominio</option>
                        {domains && domains.map((dominio, index) => (
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
                        {varietyTypes && varietyTypes.map((varietyType, index) => (
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
                    <label>Seleccione punto de variacion: </label>
                    <select className="form-control">
                        <option value="0">Seleccionar punto de variación</option>
                        <option value="1">DataSet Estructurado</option>
                        <option value="2">DataSet Semi Estructurado</option>
                        <option value="3">DataSet No Estructurado</option>
                    </select>
                </div>
                <div>
                    <label>Si no encuentra el punto de variación, escribalo a continuación: </label>
                    <input className="form-control" />
                </div>
                <div className="mt-2 d-flex justify-content-end">
                    <button type="button submit" className="btn btn-success">Siguiente</button>
                </div>
            </form>
        </div>
        <div className='col-md-4'>
            aca se tienen que ir viendo los datasheet
        </div>
    </div>
)

}

export default DocumentarVariedad;
