'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  program () {
    return this.hasOne('App/Models/Program')
  }
}

module.exports = Customer
