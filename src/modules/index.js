const {
  mergeSchemas
} = require('graphql-tools')
const {
  merge
} = require('lodash')

const pokemon = require('./pokemon')
const instagram = require('./instagram')

module.exports = mergeSchemas({
  schemas: [
    pokemon.schema,
    instagram.schema,
  ],
  resolvers: merge(
    pokemon.resolvers,
    instagram.resolvers,
  )
})
