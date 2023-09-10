import { Resolvers, User } from '@schema//types';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const userResolver: Resolvers = {
  Query: {
    user: async (parent, args, contextValue, info): Promise<User> => {
      const docuHubApi = contextValue.datasources.docuHubApi;
      const authCookie =
        contextValue.req.cookies[
          publicRuntimeConfig.authTokenCookieName as string
        ];
      const user = await docuHubApi.getUserById(contextValue.user.id);
      return args.addAuth ? { ...user, token: authCookie } : user;
    }
  }
};
