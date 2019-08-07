const { gql } = require('apollo-server')

module.exports = gql`
type Pokemon {
  id: String
  name: String
  number: String
  captureRate: Int
  class: String
  type: [String]
  favourite: Boolean
  images: [Gram]
}

type Status {
  status: String
}

input listPokemonInput {
  name: String
  type: String
  favourite: Boolean
}

type Query {
  pokemon(number: Int!): Pokemon
  listPokemon(filter: listPokemonInput,limit: Int, skip: Int): [Pokemon]
}

type Mutation {
  seed: Status
  clean: Status
  favourite(number: Int!, set: Boolean!): Pokemon
}
`
