import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_DOMAINS } from '../../Querys/Querys';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function DatosCaso({ actualizarCasoIngresado }) {
    const { loading: loadingDomains, error: errorDomains, data: dataDomains, refetch } = useQuery(GET_DOMAINS, {
        fetchPolicy: "network-only"
    });

    const [nombreCaso, setNombreCaso] = useState('');
    const [dominio, setDominio] = useState('0');
    const [descripcion, setDescripcion] = useState('');

    const handleNombreCasoChange = (event) => {
        setNombreCaso(event.target.value);
    };

    const handleSelectorDominio = (event) => {
        setDominio(event.target.value)
    }

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        //console.log('nombre: ', nombreCaso, ' dominio: ', dominio )
        if (nombreCaso !== '' && dominio !== '' && dominio !== 0) {
            actualizarCasoIngresado(nombreCaso, dominio, descripcion);
        }

    }

    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form onSubmit={handleSubmit}>
                        <h5 className='fw-bold card-header w-100' >Ingresar datos del caso</h5>
                        <div className='card-body'>
                            <Form.Group className="mb-2" controlId="nombreCaso">
                                <FloatingLabel
                                    controlId='floatingInput'
                                    label='Ingresar nombre del caso'
                                    className='mb-2'>
                                    <Form.Control placeholder="Ingresar nombre" value={nombreCaso}
                                        onChange={handleNombreCasoChange} required />

                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="dominioCaso">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar dominio'>
                                    <Form.Select aria-label='selector-dominio' onChange={handleSelectorDominio} >
                                        <option value='0'>Seleccionar dominio</option>
                                        {!loadingDomains && !errorDomains && dataDomains.getDomains && dataDomains.getDomains.map((dominio, index) => (
                                            <option key={index} value={dominio.name}>{dominio.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>
                            <Form.Group className="mb-2" controlId="Descripción">
                                <FloatingLabel
                                    controlId='floatingTextarea'
                                    label='Ingresar descripcón'
                                    className='mb-2'>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ingresar descripción"
                                        value={descripcion}
                                        onChange={handleDescripcion}
                                        required
                                        style={{ height: '20vh' }} />
                                </FloatingLabel>
                            </Form.Group>
                            <Button className='float-end mb-2' variant="primary" type="submit" disabled={dominio === '0' || nombreCaso === ''}>
                                Siguiente
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>

    )
}

export default DatosCaso;