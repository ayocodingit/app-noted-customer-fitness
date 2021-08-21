'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackageSchema extends Schema {
  up () {
    this.create('packages', (table) => {
      table.bigIncrements()
      table.string('name', 10).notNullable().unique().index()
      table.string('description', 255)
      table.bigInteger('price').notNullable().index()
      table.integer('number_of_drink').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('packages')
  }
}

module.exports = PackageSchema
