import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  EditorJSON: { input: any; output: any; }
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  documentJSON?: Maybe<Scalars['EditorJSON']['output']>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  sharedTo?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
};

export type DocumentInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  sharedTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument?: Maybe<Document>;
  deleteDocument?: Maybe<Scalars['Boolean']['output']>;
  updateDocument?: Maybe<Document>;
};


export type MutationCreateDocumentArgs = {
  documentInput: DocumentInput;
};


export type MutationDeleteDocumentArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationUpdateDocumentArgs = {
  documentInput: DocumentInput;
};

export type Query = {
  __typename?: 'Query';
  document?: Maybe<Document>;
  documentList?: Maybe<Array<Maybe<Document>>>;
  user?: Maybe<User>;
};


export type QueryDocumentArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
};

export type GetDocumentListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocumentListQuery = { __typename?: 'Query', documentList?: Array<{ __typename?: 'Document', id: string, title?: string | null, isPublic?: boolean | null, sharedTo?: Array<string | null> | null, createdBy?: string | null, createdAt: number, updatedAt?: number | null, documentJSON?: any | null } | null> | null };

export type GetDocumentByIdQueryVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type GetDocumentByIdQuery = { __typename?: 'Query', document?: { __typename?: 'Document', id: string, title?: string | null, isPublic?: boolean | null, sharedTo?: Array<string | null> | null, createdBy?: string | null, createdAt: number, updatedAt?: number | null, documentJSON?: any | null } | null };

export type CreateDocumentMutationVariables = Exact<{
  documentInput: DocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument?: { __typename?: 'Document', id: string, title?: string | null, isPublic?: boolean | null, sharedTo?: Array<string | null> | null, createdBy?: string | null, createdAt: number, updatedAt?: number | null, documentJSON?: any | null } | null };

export type UpdateDocumentMutationVariables = Exact<{
  documentInput: DocumentInput;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument?: { __typename?: 'Document', id: string, title?: string | null, isPublic?: boolean | null, sharedTo?: Array<string | null> | null, createdBy?: string | null, createdAt: number, updatedAt?: number | null, documentJSON?: any | null } | null };

export type DeleteDocumentMutationVariables = Exact<{
  documentId: Scalars['ID']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument?: boolean | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string } | null };


export const GetDocumentListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDocumentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"sharedTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"documentJSON"}}]}}]}}]} as unknown as DocumentNode<GetDocumentListQuery, GetDocumentListQueryVariables>;
export const GetDocumentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDocumentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"sharedTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"documentJSON"}}]}}]}}]} as unknown as DocumentNode<GetDocumentByIdQuery, GetDocumentByIdQueryVariables>;
export const CreateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"sharedTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"documentJSON"}}]}}]}}]} as unknown as DocumentNode<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const UpdateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"sharedTo"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"documentJSON"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const DeleteDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}]}]}}]} as unknown as DocumentNode<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;