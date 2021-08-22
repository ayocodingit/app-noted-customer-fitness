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
    const perPage = request.input('perpage', 50)

    const customer = Customer.query()

    if (request.input('name')) {
      customer.where('name', request.input('name'))
    }

    return response.send(await customer.paginate(page, perPage))
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
    return response.send(await Customer.findOrFail(params.id))
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

    const customer = await Customer.findOrFail(params.id)
    customer.merge(payload)
    await customer.save()

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
    const customer = await Customer.findOrFail(params.id)
    await customer.delete()

    return response.json({ message: 'Deleted' })

  }
}

module.exports = CustomerController
