import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {CREATE_CASE_MUTATION, GET_CASES} from '../graphql.js';

export default function CrearCaso() {
    const [nombre, setNombre] = useState('');
    const [dominio, setDominio] = useState('');
    const [createMutation] = useMutation(CREATE_CASE_MUTATION, {refetchQueries: [
        {query: GET_CASES}
    ]});

    const handleSubmit = evt => {
        evt.preventDefault();
        console.info('Creando Caso...', nombre, dominio);
        createMutation({
            variables: {
                inputCase: {
                    domain: {
                        name: dominio,
                    },
                    name: nombre,
                },
            }
        });
        alert(`CASO ${nombre} (${dominio}) CREADO!`);
        setNombre('');
        setDominio('');
    };

    return <form onSubmit={evt => handleSubmit(evt)}>
        <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                name="nombre"
                className="form-control"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="dominio">Dominio:</label>
            <input
                type="text"
                name="dominio"
                className="form-control"
                value={dominio}
                onChange={e => setDominio(e.target.value)}
            />
        </div>
        <input type="submit" value="Create" className="btn btn-primary" />
    </form>;
}