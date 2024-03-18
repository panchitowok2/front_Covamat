import { gql } from '@apollo/client';

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

export const GET_DATASHEETS_BY_DOMAIN = gql`
query Query($domain: InputDomain) {
  getDatasheetsByDomain(domain: $domain) {
    _id
    domain {
      name
    }
    name
    variationPoint {
      name
    }
    variations {
      name
    }
    varietyType {
      name
    }
  }
}
`;
