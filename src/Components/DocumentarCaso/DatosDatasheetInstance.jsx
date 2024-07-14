import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

function DatosDatasheetInstance() {
    const [variable, setVariable] = useState([
        { nombre: '', valor: '' }
    ]);
    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form>
                        <Form.Label className='fw-bold card-header w-100' >Seleccione variedades para el caso</Form.Label>
                        <div className='card-body'>

                            <Form.Group className="mb-2" controlId="tipoVariacion">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Tipo de Variación'>
                                    <Form.Select aria-label='selector-tipo-variacion'>
                                        <option value='1'> Fuente</option>
                                        <option value='2'> Contexto</option>
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-2" controlId="puntoVariacion">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Punto de Variación'>
                                    <Form.Select aria-label='selector-punto-variacion'>
                                        <option value='1'> Dataset Estructurado</option>
                                        <option value='2'> Dataset Semiestructurado</option>
                                        <option value='2'> Dataset No Estructurado</option>
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-2" controlId="variedad">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Variedad'>
                                    <Form.Select aria-label='selector-variedad'>
                                        <option value='1'> Dataset Rio Limay</option>
                                        <option value='2'> Dataset Rio Neuquen</option>
                                        <option value='2'> Dataset Rio Colorado</option>
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Table striped bordered hover size='sm'>
                                <thead>

                                    <th colSpan={2}>Ingresar Variables</th>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                {/*Recorro el arreglo que guarda las cariables almacenadas */}
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                        <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Table striped bordered hover size='sm'>
                                <thead>

                                    <th colSpan={3}>Ingresar Conjunto de valores</th>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                {/*Recorro el arreglo que guarda las cariables almacenadas */}
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                        <td><input className='no-outline border-0 bg-transparent w-100' /></td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button className='float-end mb-2' variant="primary" type="submit">
                                Agregar
                            </Button>

                        </div>
                    </Form>
                </div>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form>
                        <Form.Label className='fw-bold card-header w-100'>Datos del Caso</Form.Label>
                        <Form.Group className="mb-2 card-body" controlId="datosCaso">
                            <p>Nombre:</p>
                            <p>Dominio:</p>
                            <p>Variedades:</p>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>

    )
}

export default DatosDatasheetInstance;