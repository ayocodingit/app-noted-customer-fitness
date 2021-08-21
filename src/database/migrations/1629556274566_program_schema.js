'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProgramSchema extends Schema {
  up () {
    this.create('programs', (table) => {
      table.increments()
      table.bigInteger('customer_id').notNullable().index().unique()
      table.bigInteger('package_id').notNullable().index()
      table.integer('count').notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('programs')
  }
}

module.exports = ProgramSchema
