import React, { useState, useEffect } from 'react';
import CasoDeReuso from './CasoDeReuso';
import { ClipLoader } from 'react-spinners';

const RenderComponentWithDelay = ({ dataCases, setDatasheetInstance, eliminarVariacion }) => {
    const [visibleComponents, setVisibleComponents] = useState([]); // Estado para controlar los componentes visibles
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar si se está cargando

    useEffect(() => {
        if (dataCases && dataCases.getCasesSimilarToReuseCase && dataCases.getCasesSimilarToReuseCase.length > 0) {
            let delay = 0; // Retraso inicial

            // Recorre cada caso y programa su renderizado con un retraso
            dataCases.getCasesSimilarToReuseCase.forEach((reuseCase, index) => {
                setTimeout(() => {
                    setVisibleComponents((prev) => [...prev, reuseCase]); // Agrega el caso a los componentes visibles

                    // Si es el último caso, marca que la carga ha terminado
                    if (index === dataCases.getCasesSimilarToReuseCase.length - 1) {
                        setIsLoading(false);
                    }
                }, delay);

                delay += 1000; // Aumenta el retraso en 1 segundo para el siguiente componente
            });
        }
    }, [dataCases]); // Ejecuta este efecto cuando cambia dataCases

    return (
        <>
            {/* Feedback visual mientras se cargan los componentes */}
            {isLoading && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <p>Cargando casos...</p>
                    {/* Puedes agregar un spinner aquí */}
                    <ClipLoader color="#09f" size={40} />
                </div>
            )}

            {/* Renderiza los componentes visibles */}
            {visibleComponents.map((reuseCase, index) => (
                <CasoDeReuso
                    key={index}
                    caso={reuseCase}
                    setDatasheetInstance={setDatasheetInstance}
                    eliminarVariacion={eliminarVariacion}
                />
            ))}
        </>
    );
};

export default RenderComponentWithDelay;