import DatosCaso from './DatosCaso';
import DatosDatasheetInstance from './DatosDatasheetInstance';
import { useState, useEffect, useRef } from 'react';
import ModalConfirmarAlmacenarCaso from './ModalConfirmarAlmacenarCaso';
import { ADD_VARIATIONS_TO_CASE, CREATE_CASE } from '../../Querys/Querys';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';

function DocumentarCaso() {
    const [idCaso, setIdCaso] = useState('')
    const [nombreCaso, setNombreCaso] = useState('');
    const [dominio, setDominio] = useState('');
    const [desc, setDesc] = useState('');
    const [showConfirmar, setShowConfirmar] = useState(false);
    const [arrayVariations, setArrayVariations] = useState([]);
    // Variables para los mensajes
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
    // Variables de las llamadas al back
    const [createCase, { loading: loadingCreateCase, error: errorCreateCase, data: dataCreateCase }] = useMutation(CREATE_CASE);
    const navigate = useNavigate();

    const reiniciarVariables = () => {
        setIdCaso('')
        setNombreCaso('')
        setDominio('')
        setDesc('')
        setArrayVariations([])
    }

    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setShowAlert(true)
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

    const actualizarCasoIngresado = async (nombreCaso, dominio, descripcion) => {
        //console.log('se llamo al metodo actualizar caso ingresado')
        //setDatosCasoIngresados(true);
        setNombreCaso(nombreCaso)
        setDominio(dominio)
        setDesc(descripcion)
        //console.log('Creo el caso con: ', nombreCaso, dominio, descripcion)
        createCase({
            variables: {
                inputCase: {
                    name: nombreCaso,
                    domain: { name: dominio },
                    description: descripcion,
                    variety: null
                }
            }
        })
    }

    const mostrarConfirmar = (val) => {
        // muestro el modal de confirmacion
        console.log('entro a mostrarConfirmar')
        setShowConfirmar(val)
    }

    return (
        <>
            <h2>Documentar Caso</h2>
            <p>Almacene un caso de estudio.</p>
            <Alert show={showAlert} variant={variant} onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>{msgAlertHeader}</Alert.Heading>
                {msgAlert &&
                    <div>
                        {msgAlert}
                    </div>}
            </Alert>
            {!idCaso ?
                <DatosCaso actualizarCasoIngresado={actualizarCasoIngresado} />
                :
                <>
                    <DatosDatasheetInstance dominio={dominio} nombreCaso={nombreCaso} mostrarConfirmar={mostrarConfirmar} idCaso={idCaso} />
                    <ModalConfirmarAlmacenarCaso showConfirmar={showConfirmar} setShowConfirmar={setShowConfirmar} />
                </>
            }
        </>

    )
}

export default DocumentarCaso;