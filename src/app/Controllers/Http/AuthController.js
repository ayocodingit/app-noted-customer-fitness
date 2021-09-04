'use strict'

const User = use('App/Models/User')
const { responseToken } = use('utils/Jwt')
const CustomException = use('App/Exceptions/CustomException')
const { formatMessage } = use('Antl')
const { StatusCodes } = require('http-status-codes')
const { store, payload } = use('utils/Models')

class AuthController {
  async login ({ request, response, auth }) {
    try {
      const { username, password } = request.all()
      const token = await auth.withRefreshToken().attempt(username, password, true)
      const user = await User.findBy('username', username)
      return response.json(await responseToken(user, token))
    } catch (error) {
      throw new CustomException(formatMessage('auth.failed'), StatusCodes.UNAUTHORIZED)
    }
  }

  async register ({ request, response }) {
    return await store(await payload(request, User), User, response)
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(token)
  }

  async logout ({ request, auth }) {
    const refreshToken = request.input('refresh_token')

    return await auth
      .authenticator('jwt')
      .revokeTokens([refreshToken], true)
  }

  async user ({ response, auth }) {
    return response.json(await auth.getUser())
  }

  async updatePassword ({ request, response, auth }) {
    const user = await auth.getUser()
    user.password = request.input('password')
    await user.save()
    return response.json({ message: 'password updated' })
  }
}

module.exports = AuthController
