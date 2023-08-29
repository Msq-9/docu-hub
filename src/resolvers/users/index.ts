import { Resolvers, User } from '@schema//types';

export const userResolver: Resolvers = {
  Query: {
    user: async (parent, args, contextValue, info): Promise<User> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      return await docuHubApi.getUserById(args.userId);
    }
  }
};
