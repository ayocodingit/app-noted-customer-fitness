'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Program = use('App/Models/Program')
const { paginate, store } = use('utils/Models')

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
    const record = Program.query().with('customer')

    if (request.input('name')) {
      record.whereHas('customer', query => {
        query.where('name', request.input('name'))
      })
    }

    return await paginate(request, record)
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

    await store(payload, Program)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }
}

module.exports = ProgramController
