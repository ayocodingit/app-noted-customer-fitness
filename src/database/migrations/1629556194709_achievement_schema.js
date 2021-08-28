'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AchievementSchema extends Schema {
  up () {
    this.create('achievements', (table) => {
      table.bigIncrements()
      table.float('weight').notNullable()
      table.float('body_fat').notNullable()
      table.float('body_water_range').notNullable()
      table.float('muscle_mass').notNullable()
      table.float('physique_rating').notNullable()
      table.float('bmr').notNullable()
      table.float('body_age').notNullable()
      table.float('bone_mass').notNullable()
      table.float('stomach_fat').notNullable()
      table.float('chest')
      table.float('waist')
      table.float('hip')
      table.float('thigh')
      table.float('arm')
      table.bigInteger('customer_id').notNullable().index().unsigned().references('id').inTable('customers').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('achievements')
  }
}

module.exports = AchievementSchema
