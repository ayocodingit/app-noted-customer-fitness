'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Package = use('App/Models/Package')
class Program extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (program) => {
      const record = await Package.find(program.package_id)
      program.number_of_drink = record.number_of_drink
    })
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }
}

module.exports = Program
