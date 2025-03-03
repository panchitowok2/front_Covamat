import React from "react";
//className=" ml-2 mb-2 p-3 col-md-6 rounded bg-white"
const VariedadesSeleccionadas = ({ variedad }) => {

    return (
        variedad &&
        <>
            {/* Acá voy a mostrar las variaciones de ese punto de variacion*/}
            {variedad && variedad.map((variety, index) => (
                <div className="rectangle ml-3 mt-1 mb-1" key={index}>
                    <strong>V</strong>
                    <span className="rectangle-text"> {variety} </span><br />
                </div>
            ))}

        </>

    )

};

export default VariedadesSeleccionadas;