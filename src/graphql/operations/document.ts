import { gql } from '@apollo/client';

export const getDocumentList = gql`
  query getDocumentList {
    documentList {
      id
      title
      isPublic
      sharedTo
      createdBy
      createdAt
      updatedAt
      documentJSON
    }
  }
`;

export const getDocumentById = gql`
  query getDocumentById($documentId: ID!) {
    document(documentId: $documentId) {
      id
      title
      isPublic
      sharedTo
      createdBy
      createdAt
      updatedAt
      documentJSON
    }
  }
`;

export const createRichTextDocument = gql`
  mutation createDocument($documentInput: DocumentInput!) {
    createDocument(documentInput: $documentInput) {
      id
      title
      isPublic
      sharedTo
      createdBy
      createdAt
      updatedAt
      documentJSON
    }
  }
`;

export const updateRichTextDocument = gql`
  mutation updateDocument($documentInput: DocumentInput!) {
    updateDocument(documentInput: $documentInput) {
      id
      title
      isPublic
      sharedTo
      createdBy
      createdAt
      updatedAt
      documentJSON
    }
  }
`;

export const deleteRichTextDocument = gql`
  mutation deleteDocument($documentId: ID!) {
    deleteDocument(documentId: $documentId)
  }
`;
