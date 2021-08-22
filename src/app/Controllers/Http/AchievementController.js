'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { StatusCodes } = require('http-status-codes')
const Achievement = use('App/Models/Achievement')

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
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 50)

    const achievements = Achievement.query()

    if (request.input('customer_id')) {
      achievements.where('customer_id', request.input('customer_id'))
    }

    return response.json(await achievements.paginate(page, perPage))
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
    const payload = request.only([
      'weight',
      'body_fat',
      'body_water_range',
      'muscle_mass',
      'physique_rating',
      'bmr',
      'body_age',
      'bone_mass',
      'stomach_fat',
      'customer_id'
    ])

    await Achievement.create(payload)

    return response.status(StatusCodes.CREATED).json({ message: 'Created' })
  }

  /**
   * Display a single achievement.
   * GET achievements/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.json(await Achievement.findOrFail(params.id))
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
    const payload = request.only([
      'weight',
      'body_fat',
      'body_water_range',
      'muscle_mass',
      'physique_rating',
      'bmr',
      'body_age',
      'bone_mass',
      'stomach_fat',
      'customer_id'
    ])

    const achievements = await Achievement.findOrFail(params.id)
    achievements.merge(payload)
    await achievements.save()

    return response.json({ message: 'Updated' })
  }
}

module.exports = AchievementController
