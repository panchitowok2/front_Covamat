// Consulta basica
import { useQuery, gql } from '@apollo/client';
import Caso from './Caso';
import{GET_CASES} from '../graphql.js';

function MostrarCasosImplementacion() {
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

export default function MostrarCasos() {
  return (
    <div>
      <h2>Casos almacenados: </h2>
      <MostrarCasosImplementacion />
    </div>
  );
}