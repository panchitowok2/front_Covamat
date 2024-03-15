import { useQuery, gql, useMutation } from '@apollo/client';

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

const GET_VARIETY_TYPES = gql`
query Query {
    getAllVarietyTypes {
      name
    }
  }
`;


const GET_DOMAINS = gql`
query Query {
    getDomains {
      name
    }
  }
`;

// este metodo devuelve en un arreglo los dominios de la base de datos
export async function GetDomains() {
    const { loading, error, data } = await useQuery(GET_DOMAINS);
    if (loading) {
        throw new Error('Los datos aún se están cargando.');
      } else if (error) {
        throw error;
      } else if (data && data.getDomains.some(() => true)) {
        return data.getDomains;
      } else {
        return null;
      }

}

//llamar a la funcion que me recupera los tipos de variedad del back por dominio
export async function GetVarietyTypes() {
    const { loading, error, data } = await useQuery(GET_VARIETY_TYPES);
    if (loading) {
        throw new Error('Los datos aún se están cargando.');
      } else if (error) {
        throw error;
      } else if (data && data.getAllVarietyTypes.some(() => true)) {
        console.log('El valor de data es: ', data)
        return data.getAllVarietyTypes;
      } else {
        return null;
      }

}