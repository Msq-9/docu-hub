import { gql } from '@apollo/client';

export const getUserQuery = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      firstname
      lastname
      email
    }
  }
`;
