import DatosCaso from './DatosCaso';
import DatosDatasheetInstance from './DatosDatasheetInstance';
import { useState, useEffect, useRef } from 'react';
import ModalConfirmarAlmacenarCaso from './ModalConfirmarAlmacenarCaso';
import { useCreateCase, useAddVariationsToCase } from '../../Methods/Case'; 

function DocumentarCaso() {
    const [idCaso, setIdCaso] = useState('');
    const [nombreCaso, setNombreCaso] = useState('');
    const [dominio, setDominio] = useState('');
    const [desc, setDesc] = useState('');
    const [showConfirmar, setShowConfirmar] = useState(false);
    const { createCaseCall, loadingCreateCase, errorCreateCase, dataCreateCase } = useCreateCase();
    const { addVariationsCall, loadingAddVariations, errorAddVariations, dataAddVariations } = useAddVariationsToCase();
    // Defino el hook personalizado para cuando se cree el caso, redireccione al otro componente

    function useDataChangeEffect(data, callback) {
        const dataRef = useRef(data);

        if (data !== dataRef.current) {
            callback();
            dataRef.current = data;
        }
    }

    useDataChangeEffect(dataCreateCase, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingCreateCase && !errorCreateCase && dataCreateCase.createCase) {
            console.log('cambio el valor de data create case ', dataCreateCase.createCase)
            setIdCaso(dataCreateCase.createCase)
        }
    });

    const actualizarCasoIngresado = async (nombreCaso, dominio, descripcion) => {
        //console.log('se llamo al metodo actualizar caso ingresado')
        //setDatosCasoIngresados(true);
        setNombreCaso(nombreCaso)
        setDominio(dominio)
        setDesc(descripcion)
        console.log('Creo el caso con: ', nombreCaso, dominio, descripcion)
        createCaseCall( nombreCaso, dominio, descripcion)
    }

    const actualizarVariations = (arr) => {
        // Agrego las instancias de datasheet al caso
        console.log('Actualizo las variations del caso: ', arr)
        if(arr.length > 0){
            addVariationsCall(idCaso, arr)
        }
        //setShowConfirmar(true)
    }


    return (
        <>
            <h2>Documentar Caso</h2>
            <p>Almacene un caso de estudio.</p>
            {!idCaso ?
                <DatosCaso actualizarCasoIngresado={actualizarCasoIngresado} />
                :
                <>
                    <DatosDatasheetInstance dominio={dominio} nombreCaso={nombreCaso} actualizarVariations={actualizarVariations} />
                    <ModalConfirmarAlmacenarCaso showConfirmar={showConfirmar} setShowConfirmar={setShowConfirmar}  />
                </>
            }
        </>

    )
}

export default DocumentarCaso;