import React, { useEffect, useState } from 'react';
import { GetVarietyTypes, GetDomains } from '../../Querys/Querys.jsx'


//este va a ser el datasheet al cual se le van a agregar las variaciones,
let datasheet = {};

//este va a ser el datasheet que se le envie al back
let InputDatasheetInstance = {}

let domains = [];
let varietyTypes = [];

function DocumentarVariedad() {
    const [nombre, setNombre] = useState('');

    const handleSubmit = evt => {

    };
    //llamo al metodo que me recupera los dominios
    GetDomains().then(resul => {
        domains = resul
    }
    ).catch(() => {
        console.log('Error al obtener los dominios')
    })

    GetVarietyTypes().then(result => {
        varietyTypes = result
    }).catch((err) => {
        console.log('Error al obtener los tipos de variedad', err)
    })

    return (
        <div className='row'>
            <div className='card col-md-4'>
                <div className='card-header'>
                    Mediante esta funcionalidad el usuario puede cargar en la base de datos una variacion de un tipo.
                </div>
                <form className="card-body" onSubmit={evt => handleSubmit(evt)}>
                    <div>
                        <label>Seleccione dominio: </label>
                        <select className="form-control">
                            <option value='0'>Seleccionar dominio</option>
                            {domains && domains.map((dominio, index) => (
                                <option key={index} value={index + 1}>{dominio.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Si no encuentra el dominio, escribalo a continuación: </label>
                        <input className="form-control" />
                    </div>
                    <div>
                        <label>Seleccione el tipo de Variedad: </label>
                        <select className="form-control">
                            <option value='0'>Seleccionar tipo de variedad</option>
                            {varietyTypes && varietyTypes.map((varietyType, index) => (
                                <option key={index} value={index + 1}>{varietyType.name}</option>
                            )
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Si no encuentra el tipo de variedad, escribala a continuación: </label>
                        <input className="form-control" />
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
