'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static get fillable () {
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
    this.addTrait('WhereCustom')
  }

  program () {
    return this.hasOne('App/Models/Program')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Customer
