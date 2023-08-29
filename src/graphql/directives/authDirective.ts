import { ConsoleSqlOutlined } from '@ant-design/icons';
import AuthClient from '@clients/auth';
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema, defaultFieldResolver } from 'graphql';

export default function authDirective(authClient: AuthClient) {
  const directiveName = 'auth';
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
        methods: [AuthMethod!] = [BEARER]
        validateCsrf: Boolean
        roles: [String!] = []
    ) on FIELD_DEFINITION
 
    enum AuthMethod {
      BEARER
      API_KEY
    }`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { methods } = authDirective;
            if (methods) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = async function (
                source,
                args,
                context,
                info
              ) {
                try {
                  context.user = await authClient.validateToken(
                    context.req.headers['authorization']
                  );
                } catch (err) {
                  if (err instanceof Error) throw new Error(err.message);
                  throw new Error('Unauthorized request');
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        }
      })
  };
}
