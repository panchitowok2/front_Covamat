import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import VariationPoint from './VariationPoint';

const CREATE_VARIETY_MUTATION = gql`
mutation Mutation($datasheetInstance: InputDatasheetInstance) {
    createDatasheetInstance(datasheetInstance: $datasheetInstance)
  }
`;

const GET_VARIATIONS_POINTS = gql`
query Query($varietyType: InputVarietyType) {
    getDatasheetsByVarietyType(varietyType: $varietyType) {
      variationPoint {
        name
      }
    }
  }
`;

function RecuperarPuntosDeVariacion() {
    const { loading, error, data } = useQuery(GET_VARIATIONS_POINTS);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return <div>
        <table className='table'>
            <thead className='thead-dark'>
                <tr>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {!loading && !error && data?.getCases.map(caso => <VariationPoint VariationPoint={VariationPoint} key={VariationPoint._id} />)}
            </tbody>
        </table>
    </div>;
}


export default function DocumentarVariedad() {
    const [nombre, setNombre] = useState('');
    const [createMutation] = useMutation(CREATE_VARIETY_MUTATION);

    const handleSubmit = evt => {
        evt.preventDefault();
        console.info('Traigo del server los variation point pertenecientes a: ', evt.target.value);

        <RecuperarPuntosDeVariacion />
        /*createMutation({
            variables: {
                inputCase: {
                    domain: {
                        name: dominio,
                    },
                    name: nombre,
                },
            }
        });
        setNombre('');
        setDominio('');
        */
    };

    return <div>
        <h2>
            Mediante esta funcionalidad el usuario puede cargar en la base de datos una variacion de un tipo.
        </h2>
        <form className="mt-5" onSubmit={evt => handleSubmit(evt)}>
            <label>Seleccione el tipo de Variedad: </label>
            <select className="form-control form-control-lg" onChange={evt => setNombre(evt.target.value)}>
                <option>Procesamiento</option>
                <option>Fuentes</option>
                <option>Contenido</option>
                <option>Contexto</option>
            </select>
            <div>
                <form className="mt-5">
                    <label>Seleccione punto de variacion: </label>
                    <select>
                        <option value="1">DataSet Estructurado</option>
                        <option value="2">DataSet Semi Estructurado</option>
                        <option value="3">DataSet No Estructurado</option>
                    </select>
                </form>
            </div>
            <div>
                <button type="submit" className="btn btn-success">Mostrar puntos de variacion</button>
            </div>
        </form>

    </div>

}