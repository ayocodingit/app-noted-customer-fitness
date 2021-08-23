'use strict'

const { test, trait } = use('Test/Suite')('Customer')
const Customer = use('App/Models/Customer')
const Factory = use('Factory')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('get list of customers', async ({ client }) => {
  const user = await User.find(1)

  const response = await client.get('api/customers').loginVia(user).end()

  response.assertStatus(200)
})
