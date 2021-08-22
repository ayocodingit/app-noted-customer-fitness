'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Package extends Model {
  static boot () {
    super.boot()
    this.addTrait('WhereBy')
  }
}

module.exports = Package
