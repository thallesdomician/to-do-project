import { CodegenConfig } from '@graphql-codegen/cli';
import  { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API,
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;