'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Package = use('App/Models/Package')
const { paginate, store, show, update, destroy } = use('App/Controllers/Http/BaseController')


/**
 * Resourceful controller for interacting with packages
 */
class PackageController {
  /**
   * Show a list of all packages.
   * GET packages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const record = Package.query()

    if (request.input('name')) {
      record.where('name', request.input('name'))
    }

    return response.json(await paginate(request, record))
  }

  /**
   * Create/save a new package.
   * POST packages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const payload = request.only([
      'name',
      'description',
      'price',
      'number_of_drink'
    ])

    await store(payload, Package)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }

  /**
   * Display a single package.
   * GET packages/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async show ({ params }) {
    return await show(params.id, Package)
  }

  /**
   * Update package details.
   * PUT or PATCH packages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const payload = request.only([
      'name',
      'description',
      'price',
      'number_of_drink'
    ])

    await update(params.id, payload, Package)

    return response.json({ message: 'Updated' })
  }

  /**
   * Delete a package with id.
   * DELETE packages/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    await destroy(params.id, Package)

    return response.json({ message: 'Deleted' })
  }
}

module.exports = PackageController
