import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_VARIETY_MUTATION = gql`
mutation Mutation($datasheetInstance: InputDatasheetInstance) {
    createDatasheetInstance(datasheetInstance: $datasheetInstance)
  }
`;
const GET_VARIATIONS_POINTS = gpl`
`;

function recuperarPuntosDeVariacion(){
    const { loading, error, data } = useQuery(GET_CASES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div>
    <table className='table'>
      <thead className='thead-dark'>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {!loading && !error && data?.getCases.map(caso => <Caso caso={caso} key={caso._id} />)}
      </tbody>
    </table>
  </div>;
}

export default function DocumentarVariedad() {
    const [nombre, setNombre] = useState('');
    const [dominio, setDominio] = useState('');
    const [createMutation] = useMutation(CREATE_VARIETY_MUTATION);

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

    return <div>
        <h2>
            Mediante esta funcionalidad el usuario puede cargar en la base de datos una variacion de un tipo.
        </h2>
        <form className="mt-5">
            <label for="tipoVariedad">Seleccione el tipo de Variedad: </label>
            <select id="tipoVariedad" class="form-control form-control-lg">
                <option value="1">Procesamiento</option>
                <option value="2">Fuente</option>
                <option value="3">Contenido</option>
                <option value="4">Contexto</option>
            </select>
        </form>
        <div>
            <form className="mt-5">
                <label for="puntoVariacion">Seleccione punto de variacion: </label>
                <select id="puntoVariacion">
                    <option value="1">DataSet Estructurado</option>
                    <option value="2">DataSet Semi Estructurado</option>
                    <option value="3">DataSet No Estructurado</option>
                </select>
            </form>
        </div>
        <div>
        <button type="button" class="btn btn-success">Enviar</button>
        </div>

    </div>

    //codigo viejo 
    /*<form onSubmit={evt => handleSubmit(evt)}>
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
    </form>;*/

}