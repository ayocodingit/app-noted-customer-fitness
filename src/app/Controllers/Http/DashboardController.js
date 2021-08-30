'use strict'

const Customer = use('App/Models/Customer')
const Achievement = use('App/Models/Achievement')
const Package = use('App/Models/Package')
const Program = use('App/Models/Program')

class DashboardController {
  async admin ({ response }) {
    return response.json({
      customer: await Customer.getCount('id'),
      package: await Package.getCount('id'),
      achievement: await Achievement.getCount('id'),
      program: await Program.getCount('id')
    })
  }

  async customer ({ response, auth }) {
    const user = await auth.getUser()
    const customer = await user.customer().first()
    const achievement = await Achievement.query()
      .whereBy('customer_id', customer.id)
      .orderBy('created_at', 'desc')
      .first()
    return response.json(achievement)
  }
}

module.exports = DashboardController
