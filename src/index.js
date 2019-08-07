const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const { addMockFunctionsToSchema } = require('graphql-tools')
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const playgroundMiddleware = require('graphql-playground-middleware-express').default;
const mongoose = require('mongoose');

const schema = require('./modules')
const port = 4000
const app = express()

let mocks = false;
if (process.env.NODE_ENV === 'development') {
  mocks = require('./mocks')
}

const server = new ApolloServer({
  schema,
  mocks,
  tracing: true,
})

mongoose.connect(process.env.MONGO_URL, (err) => {
  if(err) {
    throw err;
  }
})

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
app.get('/playground', playgroundMiddleware({
  endpoint: '/graphql',
  shareEnabled: true
}));
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`🚀  Server ready on port: ${port}`)
})
