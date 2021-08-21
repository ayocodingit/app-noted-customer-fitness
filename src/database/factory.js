'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const RoleEnum = use('App/Enums/RoleEnum')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    role: RoleEnum.enum.ADMIN.value,
    password: 'admin123'
  }
})
