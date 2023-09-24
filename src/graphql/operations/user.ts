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

export const getAllUsersQuery = gql`
  query getAllUsers {
    listUsers {
      id
      firstname
      lastname
      email
    }
  }
`;
