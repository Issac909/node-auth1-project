const knex = require('knex');

const knexConfig = require('../knexfile.js');

const knexEnvironment = process.env.DB_ENV || 'development'

module.exports = knex(knexConfig[knexEnvironment]);
