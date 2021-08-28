'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Package extends Model {
  static fillable () {
    return [
      'name',
      'description',
      'price',
      'number_of_drink'
    ]
  }

  static boot () {
    super.boot()
    this.addTrait('WhereBy')
  }
}

module.exports = Package
