import { Resolvers, Document } from '@schema/types';

export const documentsResolver: Resolvers = {
  Query: {
    documentList: async (
      parent,
      args,
      contextValue,
      info
    ): Promise<Array<Document>> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      const docList = await docuHubApi.getDocumentsByUser(contextValue.user.id);
      return docList.map((doc: Document) => {
        return {
          ...doc,
          createdBy:
            contextValue.user.firstname + ' ' + contextValue.user.lastname
        };
      });
    },
    document: async (parent, args, contextValue, info): Promise<Document> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      const document = await docuHubApi.getRichTextDocById(args.documentId);
      return {
        ...document,
        createdBy:
          contextValue.user.firstname + ' ' + contextValue.user.lastname
      };
    }
  },
  Mutation: {
    createDocument: async (
      parent,
      args,
      contextValue,
      info
    ): Promise<Document> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      return await docuHubApi.createDocument(args.documentInput.title);
    },
    deleteDocument: async (
      parent,
      args,
      contextValue,
      info
    ): Promise<boolean> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      return await docuHubApi.deleteDocument(args.documentId);
    },
    updateDocument: async (
      parent,
      args,
      contextValue,
      info
    ): Promise<Document> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      const document = await docuHubApi.updateDocument(args.documentInput);
      return {
        ...document,
        createdBy:
          contextValue.user.firstname + ' ' + contextValue.user.lastname
      };
    }
  }
};
