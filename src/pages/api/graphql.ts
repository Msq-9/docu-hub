import { ApolloServer } from '@apollo/server';
import { Context } from '@apollo/client';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import userSchema from '@schema/user';
import documentSchema from '@schema/document';
import { userResolver } from '@resolvers/users';
import { documentsResolver } from '@resolvers/documents';
import authDirective from '@directives/authDirective';
import { NextApiRequest, NextApiResponse } from 'next';
import AuthClient from '@clients/auth';
import DocuHubApi from '@datasources/DocuHubApi';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface GraphQlContext extends Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

const authClient = new AuthClient();

const { authDirectiveTypeDefs, authDirectiveTransformer } =
  authDirective(authClient);

const schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, userSchema, documentSchema],
  resolvers: [userResolver, documentsResolver]
});

const apolloServer = new ApolloServer<GraphQlContext>({
  schema: authDirectiveTransformer(schema)
});

export default startServerAndCreateNextHandler(apolloServer, {
  // required to update req/res headers at graphql resolvers and clients
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    // Add auth token from cookies to request header
    const authCookie =
      req.cookies[publicRuntimeConfig.authTokenCookieName as string];
    req.headers = {
      ...req.headers,
      authorization: req.headers['authorization'] || authCookie
    };
    return {
      datasources: {
        docuHubApi: new DocuHubApi({
          token: req.headers.authorization || ''
        })
      },
      req,
      res
    };
  }
});
