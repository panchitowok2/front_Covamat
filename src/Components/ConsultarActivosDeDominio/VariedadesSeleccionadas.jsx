import React from "react";
//className=" ml-2 mb-2 p-3 col-md-6 rounded bg-white"
const VariedadesSeleccionadas = ({ variedad }) => {

    return (
        variedad && variedad.reuseCase &&
        variedad.reuseCase.domain.name !== '' &&
        <>
            {/* Acá voy a mostrar las variaciones de ese punto de variacion*/}
            <strong>Dominio:</strong> <span>{variedad.reuseCase.domain.name}</span><br />
            {variedad.reuseCase.context.map((element, index) => (
            <div key={index}>
                <div className="triangle-container">
                    <div className="triangle"></div>
                    <span className="triangle-text">
                        <strong>VP:</strong>
                        <br />
                        {element.variationPoint.name}
                    </span>
                </div>

                {element.variations && element.variations.map((variet, varIndex) => (
                    <div key={varIndex} className="rectangle d-flex justify-content-between align-items-center mt-2 ml-2">
                        <span><strong>Variación:</strong> {variet.name}</span><br />
                    </div>
                ))}
            </div>
        ))}
        </>
    )
};

export default VariedadesSeleccionadas;