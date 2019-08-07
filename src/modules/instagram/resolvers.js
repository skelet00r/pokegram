const adapter = require('./adapter')

module.exports = {
  Query: {
    searchTag: (obj, { tag }, context, info) => adapter.list(tag)
  },
  Gram: {
    url: ({ url }) => url,
  }
}