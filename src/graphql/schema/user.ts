import { gql } from '@apollo/client';

export default gql`
  type Query {
    user(addAuth: Boolean): User @auth(methods: [BEARER])
    listUsers: [User] @auth(methods: [BEARER])
  }

  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String!
    token: String
  }
`;
