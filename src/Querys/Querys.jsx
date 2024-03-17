import {gql} from '@apollo/client';

export const CREATE_VARIETY_MUTATION = gql`
mutation Mutation($datasheetInstance: InputDatasheetInstance) {
    createDatasheetInstance(datasheetInstance: $datasheetInstance)
  }
`;

export const GET_VARIATIONS_POINTS = gql`
query Query($varietyType: InputVarietyType) {
  getVariationPointsByVarietyTypes(varietyType: $varietyType) {
    name
  }
}
`;

export const GET_VARIETY_TYPES = gql`
query Query {
    getAllVarietyTypes {
      name
    }
  }
`;


export const GET_DOMAINS = gql`
query Query {
    getDomains {
      name
    }
  }
`;