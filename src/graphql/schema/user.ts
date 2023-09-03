import { gql } from '@apollo/client';

export default gql`
  type Query {
    user(userId: ID!): User @auth(methods: [BEARER])
  }

  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String!
  }
`;
