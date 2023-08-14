import { gql } from '@apollo/client';

export const getDocuments = gql`
  query getDocuments($userId: ID!) {
    documents(userId: $userId) {
      id
      title
    }
  }
`;
