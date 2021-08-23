'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Achievement extends Model {
  static boot () {
    super.boot()
    this.addTrait('WhereBy')
    this.addHook('afterCreate', 'AchievementHook.updateNumberOfDrinkProgram')
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }
}

module.exports = Achievement
