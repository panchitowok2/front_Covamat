import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalConfirmarAlmacenarCaso({showConfirmar, setShowConfirmar, actualizarVariations}) {
    //const [show, setShow] = useState(false);

    const handleNo = () => {
        setShowConfirmar(false);
        //setNavigate(true);
    }
    
    const handleSi = () => {
        actualizarVariations();
        setShowConfirmar(false);
    }

    return (
        <>
            <Modal show={showConfirmar} aria-labelledby="contained-modal-title-vcenter" centered onHide={handleNo} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Confirmar operación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Estás a punto de agregar nuevos datos a la base de datos. ¿Deseas continuar?
                Si presionas "Sí", los datos se agregarán. Si presionas "No", no se realizará ninguna acción y volverás a la pantalla anterior.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNo}>No</Button>
                    <Button variant="primary" onClick={handleSi}>Si</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalConfirmarAlmacenarCaso;


