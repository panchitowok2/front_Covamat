import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import { GET_DOMAINS, GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN, GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT } from '../../Querys/Querys.jsx'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

function SeleccionContexto() {

    const [dominio, setDominio] = useState('0');
    const [variationPoint, setVariationPoint] = useState(null);
    const [variation, setVariation] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState(null)
    const [msgAlertHeader, setMsgAlertHeader] = useState(null)
    const [msgAlert, setMsgAlert] = useState(null)
    
    const { loading: loadingDomains, error: errorDomains, data: dataDomains, refetch } = useQuery(GET_DOMAINS, {
        fetchPolicy: "network-only"
    });
    const { loading: loadingVP, error: errorVP, data: dataVP } = useQuery(GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN, {
        variables: { varietyType: { name: 'contexto' }, domain: { name: dominio } },
        fetchPolicy: "network-only"
    });

    const { loading: loadingV, error: errorV, data: dataV } = useQuery(GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT, {
        variables: { domain: { name: dominio }, varietyType: { name: 'contexto' }, variationPoint: { name: variationPoint } },
        fetchPolicy: "network-only"
    });

    // Evento para mostrar mensajes
    const showAlertMessage = (header, variant, message) => {
        setVariant(variant)
        setMsgAlertHeader(header)
        setMsgAlert(message)
        setShowAlert(true)
    }

    function useDataChangeEffect(data, callback) {
        const dataRef = useRef(data);

        if (data !== dataRef.current) {
            callback();
            dataRef.current = data;
        }
    }

    useDataChangeEffect(dataDomains, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingDomains && !errorDomains && dataDomains && dataDomains.getDomains ) {
            setDominio(dataDomains.getDomains[0].name)
        }
    });

    useDataChangeEffect(dataVP, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypeAndDomain[0] ) {
            setVariationPoint(dataVP.getVariationPointsByVarietyTypeAndDomain[0].name)
        }
    });

    useDataChangeEffect(dataV, () => {
        //console.log('dataDatasheet ha cambiado', dataDatasheet);
        // Aquí puedes llamar a tu método
        if (!loadingV && !errorV && dataVP && dataV.getVariationsByDomainVTVP) {
            setVariation(dataV.getVariationsByDomainVTVP[0].name)
        }
    });

    useEffect(() => {
        
    }, []);

    const handleSelectorDominio = (event) => {
        setDominio(event.target.value)
    }

    const handleSelectVP = (event) => {
        //console.log('actualizo variable estado: ', event.target.value)
        setVariationPoint(event.target.value);
    };
    const handleSelectV = (event) => {
        //console.log('actualizo variable estado: ', event.target.value)
        setVariation(event.target.value);
    };

    const handleSubmit = async (event) => {
        
    }
    
    return (
        <>
            <div className='row align-items-start'>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form onSubmit={handleSubmit}>
                        <h5 className='fw-bold card-header w-100' >Seleccionar el contexto</h5>
                        <div className='card-body'>

                            <Form.Group className="mb-2" controlId="dominio">
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

                            <Form.Group className="mb-2" controlId="puntoVariacion">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Punto de Variación' >
                                    <Form.Select aria-label='selector-punto-variacion' onChange={handleSelectVP}>
                                        {!loadingVP && !errorVP && dataVP && dataVP.getVariationPointsByVarietyTypeAndDomain.map((variationPoint, index) => (
                                            <option key={index} value={variationPoint.name}>{variationPoint.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>

                            <Form.Group className="mb-2" controlId="variedad">
                                <FloatingLabel controlId='floatingSelect' label='Seleccionar Variedad'>
                                    <Form.Select aria-label='selector-variedad' onChange={handleSelectV}>
                                        {!loadingV && !errorV && dataV && dataV.getVariationsByDomainVTVP.map((variation, index) => (
                                            <option key={index} value={variation.name}>{variation.name}</option>
                                        )
                                        )}
                                    </Form.Select>
                                </FloatingLabel>

                            </Form.Group>
                        
                            <Button className='float-end mb-2' variant="primary" type="submit">
                                Agregar
                            </Button>

                        </div>
                    </Form>
                </div>
                <div className='card col-md-4 ml-3 p-0'>
                    <Form>
                        <h5 className='fw-bold card-header w-100'>Contexto:</h5>
                        
                    </Form>
                </div>
            </div>
        </>

    )
}

export default SeleccionContexto;
