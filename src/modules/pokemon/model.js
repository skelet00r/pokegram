'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  number: Number,
  name: String,
  class: String,
  type: [String],
  attack: Number,
  captureRate: Number,
  favourite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
