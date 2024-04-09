import express from 'express'
import { Options, graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import { RootQueryType } from './queries/RootQueryType'
import { RootMutationType } from './mutations/RootMutationType'

const app = express()

export const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

app.use(
  '/graphql',
  graphqlHTTP({ graphiql: true, schema: rootSchema } as Options),
)

app.listen(5000, () => console.log('Listening on port 5000'))
