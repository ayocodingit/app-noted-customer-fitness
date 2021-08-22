'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Packages = use('App/Models/Package')

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
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 50)

    const package = Packages.query()

    if (request.input('name')) {
      package.where('name', request.input('name'))
    }

    return response.json(await package.paginate(page, perPage))
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

    await Packages.create(payload)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }

  /**
   * Display a single package.
   * GET packages/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.json(await Packages.findOrFail(params.id))
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

    const package = await Packages.findOrFail(params.id)
    package.merge(payload)
    await package.save()

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
    const package = await Packages.findOrFail(params.id)
    await package.delete()

    return response.json({ message: 'Deleted' })
  }
}

module.exports = PackageController
