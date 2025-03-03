import SeleccionContexto from './SeleccionContexto';
import { useState, useEffect, useRef } from 'react';
import ActivosDeDominio from './ActivosDeDominio';
//import Alert from 'react-bootstrap/Alert';

function ConsultarActivosDeDominio() {

    const [domain, setDomain] = useState('');
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
                                        name: con.variationName
                                    }
                                ]
                            }
                        ]
                    }
                });

                //console.log("If si dominio esta vacio: " + JSON.stringify(contexto))
            } else {
                setContexto(prevContexto => {
                    let updatedContext = [...prevContexto.reuseCase.context];
                    let existingVariationPoint = updatedContext.find(
                        item => item.variationPoint.name === con.variationPointName
                    );

                    if (existingVariationPoint) {
                        // Verifica si la variación ya existe
                        let existingVariation = existingVariationPoint.variations.find(
                            variation => variation.name === con.variationNames
                        );

                        if (!existingVariation) {
                            // Agregar nueva variación al punto de variación existente
                            existingVariationPoint.variations.push({ name: con.variationNames });
                        } else {
                            console.log("La variación ya existe en el punto de variación.");
                        }
                    } else {
                        // Agregar nuevo punto de variación junto con la variación
                        updatedContext.push({
                            variationPoint: { name: con.variationPointName },
                            variations: [{ name: con.variationNames }]
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
                //console.log("If si ya habia un dominio: " + JSON.stringify(contexto))
            }
            //console.log("REuse case: " + JSON.stringify(contexto))
        }else{
            //console.log("alguna entrada vino vacia" )
        }
    };

    const mostrarActivos = () => {
        setEligioContexto(true)
    }

    return (
        <>
            <h2>Consultar Activos de Dominio</h2>
            <p>Busqueda de casos que compartan contextos similares</p>
            {!eligioContexto
                ? <SeleccionContexto contexto={contexto} agregarContexto={agregarContexto} mostrarActivos={mostrarActivos} />
                : <ActivosDeDominio contexto={contexto} dominio={domain} />
            }
        </>

    )
}

export default ConsultarActivosDeDominio;