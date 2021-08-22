'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Program = use('App/Models/Program')

/**
 * Resourceful controller for interacting with programs
 */
class ProgramController {
  /**
   * Show a list of all programs.
   * GET programs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 50)

    const record = Program.query().with('customer')

    if (request.input('name')) {
      record.whereHas('customer', query => {
        query.where('name', request.input('name'))
      })
    }

    return response.json(await record.paginate(page, perPage))
  }

  /**
   * Create/save a new program.
   * POST programs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const payload = request.only([
      'customer_id',
      'package_id'
    ])

    await Program.create(payload)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }
}

module.exports = ProgramController
