const { GraphQLModule } = require('@graphql-modules/core')

module.exports = new GraphQLModule({
  typeDefs: require('./typeDefs'),
  resolvers: require('./resolvers')
})
