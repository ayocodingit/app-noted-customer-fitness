'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.bigIncrements()
      table.string('name', 30).notNullable().index()
      table.integer('age').notNullable().index()
      table.integer('height').notNullable().index()
      table.string('address', 255)
      table.string('phone_number', 15)
      table.bigInteger('user_id').index()
      table.timestamps()
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
