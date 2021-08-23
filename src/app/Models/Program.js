'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Program extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'ProgramHook.setNumberOfDrink')
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }
}

module.exports = Program
