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
      return docList.map(async (doc: Document) => {
        const user = await docuHubApi.getUserById(doc.createdBy);
        return {
          ...doc,
          createdBy: user.firstname + ' ' + user.lastname
        };
      });
    },
    document: async (parent, args, contextValue, info): Promise<Document> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      const document = await docuHubApi.getRichTextDocById(args.documentId);
      const user = await docuHubApi.getUserById(document.createdBy);
      return {
        ...document,
        createdBy: user.firstname + ' ' + user.lastname
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
