'use strict'

const User = use('App/Models/User')
const RoleEnum = use('App/Enums/RoleEnum')

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users role Customer.
   * GET users
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    const record = User.query()
      .whereBy('role', RoleEnum.enums.CUSTOMER.value)
      .whereBy('username', request.input('username'))

    return response.json(await record.fetch())
  }
}

module.exports = UserController
