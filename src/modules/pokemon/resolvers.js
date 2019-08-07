const adapter = require('./adapter')
const instagramAdapter = require('./../instagram/adapter')

module.exports = {
  Pokemon: {
    id: ({ _id }) => _id.toString(),
    images: ({ name }) => instagramAdapter.list(name),
  },
  Query: {
    pokemon: (obj, { number = 1 }, context, info) => adapter.getByNumber(number),
    listPokemon: (obj, { filter, limit, skip }, context, info) => adapter.list(filter, limit, skip),
  },
  Mutation: {
    favourite: (obj, { number, set = true }, context, info) => adapter.favourite(number, set),
    seed: async (obj, req, context, info) => {
      try {
        await adapter.seed()
        return {
          status: 'success'
        }
      } catch(e) {
        return {
          status: e.message
        }
      }
    }
  }
}
