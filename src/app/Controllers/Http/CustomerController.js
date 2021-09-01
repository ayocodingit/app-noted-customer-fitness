'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Customer = use('App/Models/Customer')
const { paginate, store, show, update, destroy, payload } = use('utils/Models')

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const record = Customer
      .query()
      .with('user')
      .where(query => {
        query.whereHasBy('user', 'username', request.input('search'))
          .orWhereBy('name', request.input('search'))
      })
      .whereDate('created_at', '2021-08-28')
      console.log(record.toSQL());
    return await paginate(request, record)
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    return await store(await payload(request, Customer), Customer, response)
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async show ({ params }) {
    return await show(params.id, Customer)
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    await update(params.id, await await payload(request, Customer), Customer)

    return response.json({ message: 'Updated' })
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async destroy ({ params }) {
    return await destroy(params.id, Customer)
  }
}

module.exports = CustomerController
