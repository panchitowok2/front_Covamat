import DatosCaso from './DatosCaso';
import DatosDatasheetInstance from './DatosDatasheetInstance';
import { useState, useEffect, useRef } from 'react';
import ModalConfirmarAlmacenarCaso from './ModalConfirmarAlmacenarCaso';
import { useCreateCase, useAddVariationsToCase } from '../../Methods/Case';
import { useNavigate } from 'react-router-dom';

function DocumentarCaso() {
    const [idCaso, setIdCaso] = useState('')
    const [nombreCaso, setNombreCaso] = useState('');
    const [dominio, setDominio] = useState('');
    const [desc, setDesc] = useState('');
    const [showConfirmar, setShowConfirmar] = useState(false);
    const [arrayVariations, setArrayVariations] = useState([]);
    const { createCaseCall, loadingCreateCase, errorCreateCase, dataCreateCase } = useCreateCase();
    const { addVariationsCall, loadingAddVariations, errorAddVariations, dataAddVariations } = useAddVariationsToCase();
    const navigate = useNavigate();
    const reiniciarVariables = () => {
        setIdCaso('')
        setNombreCaso('')
        setDominio('')
        setDesc('')
        setArrayVariations([])
    } 
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
        // si se crea el caso, guardo el id que devuelve el metodo
        if (!loadingCreateCase && !errorCreateCase && dataCreateCase.createCase) {
            console.log('cambio el valor de data create case ', dataCreateCase.createCase)
            setIdCaso(dataCreateCase.createCase)
        }
    });

    useDataChangeEffect(dataAddVariations, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Si devuelve true y se añadieron las variaciones, termino el proceso de crear caso
        if (!loadingAddVariations && !errorAddVariations && dataAddVariations.addVariations) {
            console.log('cambio el valor de add variations ', dataAddVariations.addVariations)
            setShowConfirmar(false)
            //navigate('/DocumentarCaso')
        }
    });

    useEffect(() => {
        // si agrego las variaciones, vuelvo a llamar al componente
        if (dataAddVariations && dataAddVariations.addVariations) {
            //console.log('Valor dataId', dataId.getDatasheetByDomainVTVP[0]._id, ' valor de variation', variation)
            reiniciarVariables()
            navigate('/DocumentarCaso')
        }

    }, [dataAddVariations]);

    const actualizarCasoIngresado = async (nombreCaso, dominio, descripcion) => {
        //console.log('se llamo al metodo actualizar caso ingresado')
        //setDatosCasoIngresados(true);
        setNombreCaso(nombreCaso)
        setDominio(dominio)
        setDesc(descripcion)
        console.log('Creo el caso con: ', nombreCaso, dominio, descripcion)
        createCaseCall( nombreCaso, dominio, descripcion)
    }

    const actualizarVariations = () => {
        // Agrego las instancias de datasheet al caso
        console.log('Actualizo las variations del caso: ', arrayVariations)
        if(arrayVariations.length > 0){
            addVariationsCall(idCaso, arrayVariations)
        }
    }

    const mostrarConfirmar = (arr) => {
        // muestro el modal de confirmacion
        console.log('entro a mostrarConfirmar')
        if(arr.length > 0){
            setArrayVariations(arr)
            setShowConfirmar(true)
        }
    }

    return (
        <>
            <h2>Documentar Caso</h2>
            <p>Almacene un caso de estudio.</p>
            {!idCaso ?
                <DatosCaso actualizarCasoIngresado={actualizarCasoIngresado} />
                :
                <>
                    <DatosDatasheetInstance dominio={dominio} nombreCaso={nombreCaso} mostrarConfirmar={mostrarConfirmar} />
                    <ModalConfirmarAlmacenarCaso showConfirmar={showConfirmar} setShowConfirmar={setShowConfirmar} actualizarVariations={actualizarVariations} />
                </>
            }
        </>

    )
}

export default DocumentarCaso;