'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Program = use('App/Models/Program')
const { paginate, store, payload } = use('utils/Models')

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
   */
  async index ({ request }) {
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
    return await store(await payload(request, Program), Program, response)
  }
}

module.exports = ProgramController
