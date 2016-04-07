import knexConfig from './../../../knexfile.js'
import knex from'knex'
import bookshelf from 'bookshelf'
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const knexConnection = knexConfig[env]
export default bookshelf(knex(knexConnection))