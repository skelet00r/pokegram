'use strict'

const DataLoader = require('dataloader')
const Insta = require('./insta')

const insta = new Insta({
  username: process.env.INSTA_USER,
  password: process.env.INSTA_PASS,
})
const instaLoader = new DataLoader(keys => insta.getGrams(keys));

module.exports = {
  list: async (tag) => instaLoader.load(tag)
}
