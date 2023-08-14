import { gql } from '@apollo/client';

export default gql`
  type Query {
    documents(userId: ID!): Document
  }

  type Document {
    id: ID!
    title: String
  }
`;
