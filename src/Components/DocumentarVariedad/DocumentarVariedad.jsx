import React, { useState, useRef } from 'react';
import BusquedaDatasheet from './BusquedaDatasheet.jsx';
import AgregarVariaciones from './AgregarVariaciones.jsx';
import AgregarOtraVariacion from './AgregarOtraVariacion.jsx';
import ModalConfirmarAgregarVariacion from './ModalConfirmarAgregarVariacion.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function DocumentarVariedad() {
    const [datasheet, setIdDatasheet] = useState(null);
    const [show, setShow] = useState(false);
    const [resetInputs, setResetInputs] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);
    const [agregarVariaciones, setAgregarVariaciones] = useState(false);
    const [mostrarAgregarMasVariaciones, setMostrarAgregarMasVariaciones] = useState(false);
    const [finalizarTransaccion, setFinalizarTransaccion] = useState(false);
    // Variables para los mensajes
    const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
    const navigate = useNavigate();

    const asignarId = (id) => {
        setIdDatasheet(id)
    }

    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setMostrarMensajeExito(true)
    }

    if(mostrarAgregarMasVariaciones){
        setShow(true)
        setMostrarAgregarMasVariaciones(false)
    }
    if(finalizarTransaccion){
        // termina la transaccion, renderizo el menu principal
        setFinalizarTransaccion(false)
        setIdDatasheet(null)
        setResetInputs(false)
        setAgregarVariaciones(false)
        navigate('/DocumentarVariedad')
    }
    return (
        <>
            <h2>Documentar Variedad</h2>
            <p>Almacene variaciones en un datasheet segun su dominio, tipo de variación y punto de variación.
                Si no encuentra algún datos, ingresarlo en el campo de texto correspondiente y se creara una nueva datasheet.</p>
            {/*mostrarMensajeExito ? <Alert variant="success" onClose={() => setMostrarMensajeExito(false)} dismissible/> : <></>*/}
            <Alert show={mostrarMensajeExito} variant={variant} onClose={() => setMostrarMensajeExito(false)} dismissible>
                <Alert.Heading>{msgAlertHeader}</Alert.Heading>
                {msgAlert &&
                    <div>
                        {msgAlert}
                    </div>}
            </Alert>
            {!datasheet ?
                <BusquedaDatasheet setIdDatasheet={asignarId} /> : <>
                <AgregarVariaciones datasheet={datasheet} setMostrarAgregarMasVariaciones={setMostrarAgregarMasVariaciones} setShowConfirmar={setShowConfirmar} resetInputs={resetInputs} setResetInputs={setResetInputs} agregarVariaciones={agregarVariaciones} setFinalizarTransaccion={setFinalizarTransaccion} setAgregarVariaciones={setAgregarVariaciones} showAlertMessage={showAlertMessage}/>
                <ModalConfirmarAgregarVariacion showConfirmar={showConfirmar} setShowConfirmar={setShowConfirmar} setAgregarVariaciones={setAgregarVariaciones} setFinalizarTransaccion={setFinalizarTransaccion}/>
                <AgregarOtraVariacion show={show} setShow={setShow} setResetInputs={setResetInputs} setFinalizarTransaccion={setFinalizarTransaccion}/>
                </>}
        </>
    )

}

export default DocumentarVariedad;
