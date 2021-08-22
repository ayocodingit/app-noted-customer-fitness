'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static boot () {
    super.boot()
    this.addTrait('WhereBy')
  }

  program () {
    return this.hasOne('App/Models/Program')
  }
}

module.exports = Customer
