import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Footer/footer.jsx';
import logo from '../logo COVAMATSinFondo.png'; // Asegúrate de ajustar la ruta al logo
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_VALID_USER } from '../Querys/Querys.jsx';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';


export default function LogIn({ setValidUser }) {

    // Datos del inicio de sesion del usuario
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // Variables para los mensajes
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)

    // Consulta a la BD para chequear si el usuario es valido
    const [getValidUser, { loading: loadingUser, error: errorUser, data: dataUser }] = useLazyQuery(GET_VALID_USER, {
        fetchPolicy: "network-only"
    });

    /*
    variables: {
                inputUser: {
                    userName: userName,
                    password: password
                }
            }
    */
    const handleSubmit = (event) => {
        event.preventDefault(); // evita que el submit refresque la pagina
        //console.log('nombre: ', nombreCaso, ' dominio: ', dominio )
        getValidUser({
            variables: {
                inputUser: {
                    userName: userName,
                    password: password
                }
            }
        })
    }


    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setShowAlert(true)
    }

    useEffect(() => {
        if (dataUser) {
            if (dataUser.getValidUser) {
                console.log("Usuario logueado con exito.");
                setValidUser(true)
            } else {
                showAlertMessage('Error', 'danger', 'Datos de usuario o contraseña incorrectos.');
                console.log('Usuario no logueado.')
            }
        }
    }, [dataUser]);

    return (
        <BrowserRouter>
            <nav className="navbar custom-navbar">
                <div className="container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="navbar-logo img-fluid" />
                    </Link>
                    <div className="navbar-nav ml-auto flex-row">

                    </div>
                </div>
            </nav>

            <Container fluid='md mt-3' >

                <Row className="justify-content-md-center">
                    <Col lg={6} md={8} xs={12}>
                        <Alert show={showAlert} variant={variant} onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>{msgAlertHeader}</Alert.Heading>
                            {msgAlert &&
                                <div>
                                    {msgAlert}
                                </div>}
                        </Alert>
                        <Form
                            className="border border-dark rounded"
                            onSubmit={handleSubmit}
                        >
                            <Card>
                                <Card.Header className="fw-bold fs-5">Ingresar datos de usuario</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3" controlId="userName">
                                        <FloatingLabel
                                            controlId='floatingInput'
                                            label='Ingresar nombre de usuario'
                                            className='mb-2'
                                        >
                                            <Form.Control
                                                placeholder="Ingresar nombre"
                                                value={userName}
                                                onChange={handleUserName}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <FloatingLabel
                                            controlId='floatingInput'
                                            label='Ingresar contraseña'
                                            className='mb-2'
                                        >
                                            <Form.Control
                                                type="password"
                                                placeholder="Ingresar contraseña"
                                                value={password}
                                                onChange={handlePassword}
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    {/* Botón ajustado */}
                                    <div className="d-flex justify-content-end mt-2"> {/* Contenedor flexible para alinear a la derecha */}
                                        <Button
                                            variant="success"
                                            type="submit"
                                            disabled={userName === '' || password === ''}
                                        >
                                            Iniciar Sesión
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </BrowserRouter>
    );
}
