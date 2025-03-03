import React from "react";
//className=" ml-2 mb-2 p-3 col-md-6 rounded bg-white"
const DatosDatasheet = ({ datasheet }) => {

    return (
        datasheet &&
        <div >
            {/* Datos del datasheet*/}
            <strong>Dominio: </strong> {datasheet.domain.name} <br />
            {/* <strong>Nombre: </strong> {datasheet.name} <br />*/}
            <strong>Tipo de variación: </strong> {datasheet.varietyType.name} <br />

            <div className="triangle-container">
                <div className="triangle"></div>
                <span className="triangle-text">
                    <strong>VP:</strong>
                    <br />
                    {datasheet.variationPoint.name}
                </span>
            </div>
            {/* Acá voy a mostrar las variaciones de ese punto de variacion*/}
            {datasheet && datasheet.variations && datasheet.variations.map((variation, index) => (
                <div className="rectangle ml-3 mt-1" key={index}>
                    <strong>V</strong>
                    <span className="rectangle-text"> {variation.name} </span><br />
                    
                    {variation.variables && variation.variables.map( (variable, index) => (
                        <div key={index}>
                            <span>--------------</span> <br />
                            <span><strong>Variable:</strong> {variable.var}</span><br />
                            {variable.valueArray && variable.valueArray.map((value, index) => (
                                <div key={index}>
                                    <span><strong>Variable:</strong> {value.var} <strong>Value:</strong> {value.value}</span><br />
                                </div>
                            ))}
                        </div> 
                    ))}
                </div>
            ))}

        </div>

    )

};

export default DatosDatasheet;