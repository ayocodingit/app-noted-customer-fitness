'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Package = use('App/Models/Package')
const { paginate, store, show, update, destroy, payload } = use('utils/Models')

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
   */
  async index ({ request }) {
    const record = Package
      .query()
      .whereBy('name', request.input('name'))
    return await paginate(request, record)
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
    return await store(await payload(request, Package), Package, response)
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
    await update(params.id, await payload(request, Package), Package)

    return response.json({ message: 'Updated' })
  }

  /**
   * Delete a package with id.
   * DELETE packages/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async destroy ({ params }) {
    return await destroy(params.id, Package)
  }
}

module.exports = PackageController
