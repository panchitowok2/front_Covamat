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

export const GET_VARIETYTYPES_BY_DOMAIN = gql`
query Query($domain: InputDomain) {
  getVarietyTypesByDomain(domain: $domain) {
      name
  }
}
`;

export const GET_DATASHEETS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT = gql`
query Query($domain: InputDomain, $varietyType: InputVarietyType, $variationPoint: InputVariationPoint) {
  getDatasheetByDomainVTVP(domain: $domain, varietyType: $varietyType, variationPoint: $variationPoint) {
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

export const CREATE_DATASHEET = gql`
mutation Mutation($datasheet: InputDatasheet) {
  createDatasheet(datasheet: $datasheet)
}`;


export const ADD_VARIATIONS = gql`
mutation Mutation($variations: [InputVariation], $idDatasheet: ID) {
  addVariations(variations: $variations, idDatasheet: $idDatasheet)
}
`;
