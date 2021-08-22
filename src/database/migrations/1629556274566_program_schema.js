'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProgramSchema extends Schema {
  up () {
    this.create('programs', (table) => {
      table.increments()
      table.bigInteger('customer_id').notNullable().unsigned().unique().references('id').inTable('customers').onDelete('CASCADE')
      table.bigInteger('package_id').notNullable().unsigned().references('id').inTable('packages').onDelete('CASCADE')
      table.integer('number_of_drink').notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('programs')
  }
}

module.exports = ProgramSchema
