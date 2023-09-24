import { gql } from '@apollo/client';

export default gql`
  type Query {
    documentList: [Document] @auth(methods: [BEARER])
    document(documentId: ID!): Document @auth(methods: [BEARER])
  }

  type Mutation {
    createDocument(documentInput: CreateDocumentInput!): Document
      @auth(methods: [BEARER])
    deleteDocument(documentId: ID!): Boolean @auth(methods: [BEARER])
    updateDocument(documentInput: DocumentInput!): Document
      @auth(methods: [BEARER])
  }

  scalar EditorJSON

  type Document {
    id: ID!
    createdBy: String
    createdAt: Float!
    updatedAt: Float
    title: String
    sharedTo: [String]
    isPublic: Boolean
    documentJSON: EditorJSON
  }

  input CreateDocumentInput {
    title: String
  }

  input DocumentInput {
    id: ID!
    title: String
    sharedTo: [String]
  }
`;
