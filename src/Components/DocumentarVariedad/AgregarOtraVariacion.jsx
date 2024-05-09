import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AgregarOtraVariacion() {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Desea agregar más variaciones?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    asdasdasd
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">No</Button>
                    <Button variant="primary" onClick={handleClose}>Si</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}


export default AgregarOtraVariacion;


