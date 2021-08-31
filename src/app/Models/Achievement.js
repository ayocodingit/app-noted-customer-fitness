'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
class Achievement extends Model {
  static fillable () {
    return [
      'weight',
      'body_fat',
      'body_water_range',
      'muscle_mass',
      'physique_rating',
      'bmr',
      'body_age',
      'bone_mass',
      'stomach_fat',
      'chest',
      'waist',
      'hip',
      'thigh',
      'arm',
      'date',
      'package_id',
      'customer_id'
    ]
  }

  static boot () {
    super.boot()
    this.addTrait('WhereCustom')
    this.addHook('afterCreate', 'AchievementHook.updateNumberOfDrinkProgram')
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }
}

module.exports = Achievement
