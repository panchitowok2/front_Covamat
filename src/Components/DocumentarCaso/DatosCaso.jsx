import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';


function DatosCaso() {
    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3'>
                    <Form>
                        <Form.Label className='fw-bold' >Ingresar datos del caso</Form.Label>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId='floatingInput'
                                label='Ingresar nombre del caso'
                                className='mb-2'>
                                <Form.Control placeholder="Ingresar nombre" />

                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel controlId='floatingSelect' label='Seleccionar dominio'>
                                <Form.Select aria-label='selector-dominio'>
                                    <option value='1'> Hidrologico</option>
                                    <option value='2'> Geologico</option>
                                </Form.Select>
                            </FloatingLabel>

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Siguiente
                        </Button>
                    </Form>
                </div>
            </div>
        </>

    )
}

export default DatosCaso;