import { gql } from '@apollo/client';

export const getUserQuery = gql`
  query getUser($addAuth: Boolean) {
    user(addAuth: $addAuth) {
      id
      firstname
      lastname
      email
      token
    }
  }
`;
