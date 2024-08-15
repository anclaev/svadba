/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
  inputs: {
    outputFilePath: './src/graphql/__generated__/inputs.ts',
    mapIdFieldsToGraphqlId: 'WhereUniqueInputs',
  },
  crud: {
    outputDir: './src/graphql/__generated__',
    inputsImporter: `import * as Inputs from '@graphql/__generated__/inputs';`,
    resolverImports: `import prisma from '@core/prisma';`,
    prismaCaller: 'prisma',
  },
  global: {
    builderLocation: './src/graphql/builder',
  },
}
