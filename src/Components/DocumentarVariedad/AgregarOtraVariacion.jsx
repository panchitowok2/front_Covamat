import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AgregarOtraVariacion({show, setShow, setResetInputs, setFinalizarTransaccion}) {
    //const [show, setShow] = useState(false);

    const handleNo = () => {
        setShow(false);
        setFinalizarTransaccion(true);
    }
    
    const handleSi = () => {
        setShow(false);
        setResetInputs(true)
    }

    return (
        <>
            <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleNo} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Desea agregar más variaciones?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Detectamos que lleno todos los campos disponibles para agregar variaciones. Si desea agregar mas variaciones
                    al datasheet seleccionado, presione Agregar. Si desea volver al manú principal presione Finalizar.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNo}>Finalizar</Button>
                    <Button variant="primary" onClick={handleSi}>Agregar</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AgregarOtraVariacion;


