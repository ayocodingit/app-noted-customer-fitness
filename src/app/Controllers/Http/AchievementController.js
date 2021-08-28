'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Achievement = use('App/Models/Achievement')
const { paginate, store, show, update } = use('utils/Models')

/**
 * Resourceful controller for interacting with achievements
 */
class AchievementController {
  /**
   * Show a list of all achievements.
   * GET achievements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const record = Achievement
      .query()
      .whereBy('customer_id', request.input('customer_id'))
    return await paginate(request, record)
  }

  /**
   * Create/save a new achievement.
   * POST achievements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const payload = request.only(Achievement.fillable())

    await store(payload, Achievement)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }

  /**
   * Display a single achievement.
   * GET achievements/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async show ({ params }) {
    return await show(params.id, Achievement)
  }

  /**
   * Update achievement details.
   * PUT or PATCH achievements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const payload = request.only(Achievement.fillable())

    await update(params.id, payload, Achievement)

    return response.json({ message: 'Updated' })
  }
}

module.exports = AchievementController
