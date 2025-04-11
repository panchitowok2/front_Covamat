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

export const GET_VARIATIONPOINTS_BY_VARIETYTYPE_AND_DOMAIN = gql`
query Query($varietyType: InputVarietyType, $domain: InputDomain) {
  getVariationPointsByVarietyTypeAndDomain(varietyType: $varietyType, domain: $domain) {
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

export const GET_VARIATIONS_BY_DOMAIN_VARIETYTYPE_VARIATIONPOINT = gql`
query Query($domain: InputDomain, $varietyType: InputVarietyType, $variationPoint: InputVariationPoint) {
  getVariationsByDomainVTVP(domain: $domain, varietyType: $varietyType, variationPoint: $variationPoint) {
    name
  }
}
`;

export const GET_IS_DATASHEET_INSTANCE_IN_CASE = gql`
query Query($idDatasheetInstanceArray: [ID], $inputDatasheetInstance: InputDatasheetInstance) {
  getIsDatasheetInstanceInCase(idDatasheetInstanceArray: $idDatasheetInstanceArray, inputDatasheetInstance: $inputDatasheetInstance)
}
`;


export const CREATE_DATASHEET = gql`
mutation Mutation($datasheet: InputDatasheet) {
  createDatasheet(datasheet: $datasheet)
}`;

export const CREATE_DATASHEET_INSTANCE = gql`
mutation Mutation($datasheetInstance: InputDatasheetInstance) {
    createDatasheetInstance(datasheetInstance: $datasheetInstance)
}`;

export const CREATE_CASE = gql`
mutation Mutation($inputCase: InputCase) {
  createCase(inputCase: $inputCase)
}`;

export const ADD_VARIATIONS = gql`
mutation Mutation($variations: [InputVariation], $idDatasheet: ID) {
  addVariations(variations: $variations, idDatasheet: $idDatasheet)
}
`;

export const ADD_VARIATIONS_TO_CASE = gql`
mutation Mutation($idCase: ID, $variations: [ID]) {
  addDatasheetInstancesToCase(idCase: $idCase, variations: $variations)
}
`;

export const GET_IS_DATASHEET_INSTANCE_DATA_IN_CASE = gql`
query Query($idDatasheetInstanceArray: [ID], $inputDatasheetInstance: InputDatasheetInstance) {
  getIsDatasheetInstanceDataInCase(idDatasheetInstanceArray: $idDatasheetInstanceArray, inputDatasheetInstance: $inputDatasheetInstance)
}
`;
export const ADD_VARIATIONS_TO_INSTANCE = gql`
mutation Mutation($datasheetInstanceId: ID, $variations: [InputVariation]) {
  addVariationsToInstance(datasheetInstanceId: $datasheetInstanceId, variations: $variations)
}
`;
export const GET_DATASHEET_INSTANCES_BY_CASE = gql`
query Query($idCase: ID) {
  getDatasheetsInstancesByCase(idCase: $idCase) {
    _id
    domain {
      name
    }
    name
    variationPoint {
      name
    }
    id_datasheet
    variations {
      name
      variables {
        var
        valueArray {
          var
          value
        }
      }
    }
    varietyType {
      name
    }
  }
}`;

export const GET_CASES_SIMILAR_TO_REUSE_CASE = gql`
query Query($reuseCase: ReuseCase) {
  getCasesSimilarToReuseCase(reuseCase: $reuseCase) {
    _id
    description
    domain {
      name
    }
    name
    variety
  }
}`;

export const GET_DATASHEET_INSTANCES_BY_ID = gql`
query Query($ids: [ID]) {
  getDatasheetInstancesById(ids: $ids) {
    id_datasheet
    name
    variationPoint {
      name
    }
    domain {
      name
    }
    varietyType {
      name
    }
    variations {
      name
    }
    _id
  }
}`;


export const ADD_VARIATION_TO_CASE = gql`
mutation Mutation($idCase: ID, $datasheetInstance: InputDatasheetInstance) {
  addVariationToCase(idCase: $idCase, datasheetInstance: $datasheetInstance)
}
`;

export const CREATE_REUSE_CASE = gql`
mutation Mutation($inputCase: InputCase, $inputDatasheetInstance: [InputDatasheetInstance]) {
  createReuseCase(inputCase: $inputCase, inputDatasheetInstance: $inputDatasheetInstance)
}
`;
