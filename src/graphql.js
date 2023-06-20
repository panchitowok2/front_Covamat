import { gql } from '@apollo/client';

export const CREATE_CASE_MUTATION = gql`
    mutation Mutation($inputCase: InputCase) {
        createCase(inputCase: $inputCase)
      }
`;

export const GET_CASES = gql`
query Query {
  getCases {
    _id
    name
  }
}
`;