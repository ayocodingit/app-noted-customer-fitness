'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Customer = use('App/Models/Customer')

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
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 50)

    const customers = Customer.query()

    if (request.input('name')) {
      customers.where('name', request.input('name'))
    }

    return response.json(await customers.paginate(page, perPage))
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

    await Customer.create(payload)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.json(await Customer.findOrFail(params.id))
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

    const customers = await Customer.findOrFail(params.id)
    customers.merge(payload)
    await customers.save()

    return response.json({ message: 'Updated' })
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const customers = await Customer.findOrFail(params.id)
    await customers.delete()

    return response.json({ message: 'Deleted' })
  }
}

module.exports = CustomerController
