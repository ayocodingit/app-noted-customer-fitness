'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Customer = use('App/Models/Customer')
const { paginate, store, show, update, destroy } = use('App/Controllers/Http/BaseController')

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
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const record = Customer.query().whereBy('name', request.input('name'))

    return response.json(await paginate(request, record))
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
    const payload = request.only([
      'name',
      'age',
      'height',
      'address',
      'phone_number',
      'user_id'
    ])

    await store(payload, Customer)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
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
    const payload = request.only([
      'name',
      'age',
      'height',
      'address',
      'phone_number',
      'user_id'
    ])

    await update(params.id, payload, Customer)

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
