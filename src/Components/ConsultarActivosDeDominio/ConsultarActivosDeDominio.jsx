import SeleccionContexto from './SeleccionContexto';
import { useState, useEffect, useRef } from 'react';
import ActivosDeDominio from './ActivosDeDominio';
import Alert from 'react-bootstrap/Alert';

function ConsultarActivosDeDominio() {

    const [domain, setDomain] = useState('');

    // Variables para los mensajes
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)

    // Variable utilizada para filtrar casos segun su contexto
    const [contexto, setContexto] = useState({
        reuseCase: {
            domain: {
                name: ""
            },
            context: [
                {
                    variationPoint: {
                        name: ""
                    },
                    variations: [
                        {
                            name: ""
                        }
                    ]
                }
            ]
        }
    });
    const [eligioContexto, setEligioContexto] = useState(false);

    useEffect(() => {
        if (contexto) {
            console.log("Contexto actualizado: " + JSON.stringify(contexto));
        }
    }, [contexto]);

    const agregarContexto = (con) => {
        console.log("entrada agregarContxto: " + JSON.stringify(con))
        if (con.domainName !== '' && con.variationPointName !== '' && con.variationName !== '') {
            setDomain(con.domainName)
            if (contexto.reuseCase.domain.name === "") {
                // Primer carga de datos
                setContexto({
                    reuseCase: {
                        domain: {
                            name: con.domainName
                        },
                        context: [
                            {
                                variationPoint: {
                                    name: con.variationPointName
                                },
                                variations: [
                                    {
                                        name: con.variationName // Aquí está correcto
                                    }
                                ]
                            }
                        ]
                    }
                });
            } else {
                setContexto(prevContexto => {
                    let updatedContext = [...prevContexto.reuseCase.context];
                    let existingVariationPoint = updatedContext.find(
                        item => item.variationPoint.name === con.variationPointName
                    );
    
                    if (existingVariationPoint) {
                        // Verifica si la variación ya existe - CORREGIDO: usar variationName
                        let existingVariation = existingVariationPoint.variations.find(
                            variation => variation.name === con.variationName // Aquí estaba el error
                        );
    
                        if (!existingVariation) {
                            // Agregar nueva variación al punto de variación existente
                            existingVariationPoint.variations.push({ name: con.variationName }); // Y aquí
                        } else {
                            console.log("La variación ya existe en el punto de variación.");
                            return prevContexto; // Retornar el estado anterior si ya existe
                        }
                    } else {
                        // Agregar nuevo punto de variación junto con la variación
                        updatedContext.push({
                            variationPoint: { name: con.variationPointName },
                            variations: [{ name: con.variationName }] // Y aquí
                        });
                    }
    
                    return {
                        ...prevContexto,
                        reuseCase: {
                            ...prevContexto.reuseCase,
                            domain: { name: con.domainName },
                            context: updatedContext
                        }
                    };
                });
            }
        } else {
            console.log("alguna entrada vino vacia")
        }
    };

    const mostrarActivos = () => {
        setEligioContexto(true)
    }

    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setShowAlert(true)
    }

    return (
        <>
            <h2>Crear Caso de Reuso</h2>
            <p>Búsqueda de casos que compartan contextos similares, y creación de caso reusando variedades instanciadas en otros casos.</p>
            <Alert show={showAlert} variant={variant} onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>{msgAlertHeader}</Alert.Heading>
                {msgAlert &&
                    <div>
                        {msgAlert}
                    </div>}
            </Alert>
            {!eligioContexto
                ? <SeleccionContexto contexto={contexto} agregarContexto={agregarContexto} mostrarActivos={mostrarActivos} />
                : <ActivosDeDominio contexto={contexto} dominio={domain} showAlertMessage={showAlertMessage}/>
            }
        </>

    )
}

export default ConsultarActivosDeDominio;