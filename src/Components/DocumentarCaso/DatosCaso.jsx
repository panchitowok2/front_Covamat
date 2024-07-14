import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';


function DatosCaso({setDatosCasoIngresados}) {

    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form>
                        <Form.Label className='fw-bold card-header w-100' >Ingresar datos del caso</Form.Label>
                        <div className='card-body' onSubmit={setDatosCasoIngresados(true)}>
                        <Form.Group className="mb-2" controlId="nombreCaso">
                            <FloatingLabel
                                controlId='floatingInput'
                                label='Ingresar nombre del caso'
                                className='mb-2'>
                                <Form.Control placeholder="Ingresar nombre" />

                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="dominioCaso">
                            <FloatingLabel controlId='floatingSelect' label='Seleccionar dominio'>
                                <Form.Select aria-label='selector-dominio'>
                                    <option value='1'> Hidrologico</option>
                                    <option value='2'> Geologico</option>
                                </Form.Select>
                            </FloatingLabel>

                        </Form.Group>
                        <Button className='float-end mb-2' variant="primary" type="submit">
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