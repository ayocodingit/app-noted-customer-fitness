'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Achievement = use('App/Models/Achievement')
const { paginate, store, show, update, payload } = use('utils/Models')

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
    return await store(await payload(request, Achievement), Achievement, response)
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
    await update(params.id, await payload(request, Achievement), Achievement)

    return response.json({ message: 'Updated' })
  }
}

module.exports = AchievementController
