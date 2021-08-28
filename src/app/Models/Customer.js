'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static fillable () {
    return [
      'name',
      'age',
      'height',
      'address',
      'phone_number',
      'user_id'
    ]
  }

  static boot () {
    super.boot()
    this.addTrait('WhereBy')
  }

  program () {
    return this.hasOne('App/Models/Program')
  }
}

module.exports = Customer
