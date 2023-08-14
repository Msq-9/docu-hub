import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema/!(types).{ts,js,graphql}',
  documents: [
    'src/graphql/**/*.{ts,tsx,graphql}',
    '!src/graphql/operations/operations.ts',
    '!src/graphql/schema/types.ts'
  ],
  generates: {
    'src/graphql/schema/types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    'src/graphql/operations/operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node']
    }
  }
};

export default config;
