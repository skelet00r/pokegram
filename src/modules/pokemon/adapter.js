'use strict';

const path = require('path')
const util = require('util')
const fs = require('fs-extra')
const parse = require('csv-parse')

const model = require('./model')

const csvPath = path.resolve(__dirname, '../../data', 'pokemon-clean.csv');
const loadCsv = async () => {
  const rawcsv = await fs.readFile(csvPath, 'utf8')
  const data = await util.promisify(parse)(rawcsv, {
    from_line: 2,
  })
  console.log(data[0])
  return data.map(d => ({
    name: d[7],
    number: d[8],
    class: d[3],
    type: [d[12], d[13]].filter(Boolean),
    attack: d[1],
    captureRate: d[2],
  }))
}

module.exports = {
  list: async (filter = {}, limit = 10, skip = 0) => {
    const query = {};
    if (filter.name) {
      query.name = {
        '$regex': filter.name,
        '$options': 'i'
      }
    }
    if (filter.type) {
      query.type = {
        '$in': filter.type
      }
    }
    if (filter.favourite) {
      query.favourite = true
    }
    console.log(query)
    return model.find(query)
      .limit(limit)
      .skip(skip)
      .exec()
  },
  getByNumber: async (number) => model.findOne({
    number,
  }).exec(),
  favourite: async (number, favourite) => model.findOneAndUpdate({
    number,
  }, {
    $set: {
      favourite,
    }
  }, {
    new: true
  }).exec(),
  seed: async () => {
    const data = await loadCsv();
    const procList = data.map(d => model.findOneAndUpdate({
        number: d.number,
      }, d, {
        upsert: true
      })
      .exec()
    )
    return Promise.all(procList)
  },
  clean: () => {
    // model
  }
}