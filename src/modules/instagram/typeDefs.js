const { gql } = require('apollo-server')

module.exports = gql`
type Gram {
  url: String
}

type Query {
  searchTag(tag: String!): [Gram]
}
`
