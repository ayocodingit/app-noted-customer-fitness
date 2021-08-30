'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const RoleEnum = use('App/Enums/RoleEnum')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.bigIncrements()
      table.string('username', 30).notNullable().unique()
      table.string('role', 30).notNullable().defaultTo(RoleEnum.CUSTOMER.value)
      table.string('password', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
