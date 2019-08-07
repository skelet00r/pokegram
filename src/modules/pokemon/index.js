const { GraphQLModule } = require('@graphql-modules/core')

module.exports = new GraphQLModule({
  typeDefs: require('./typeDefs.js'),
  resolvers: require('./resolvers'),
  imports: [require('../instagram')]
})
