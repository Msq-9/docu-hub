import { gql } from '@apollo/client';

export const getUser = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      id
      firstname
      lastname
      email
    }
  }
`;
