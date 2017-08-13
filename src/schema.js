import { makeExecutableSchema } from 'graphql-tools'
import Resolvers from './resolvers'
import { logger } from './config/logger'

const Schema = `
scalar JSON
type User {
  name: String!
  desc: String!
  repo: String!
}
input UserInput {
  name: String!
  desc: String!
  repo: String!
}
type Query {
  getUser: User
}
type Mutation {
  modifyUser(user: UserInput!): User
}
type Subscription {
  userModified: User
}
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

export default makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  logger: {
    log: (e) => logger.error('[----GraphQL----]: ', e)
  },
  allowUndefinedInResolve: false,
});
