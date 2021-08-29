'use strict'

const User = use('App/Models/User')
const { responseToken } = use('utils/Jwt')
class AuthController {
  async login ({ request, response, auth }) {
    const { username, password } = request.all()
    const token = await auth.withRefreshToken().attempt(username, password, true)
    const user = await User.findBy('username', username)
    return response.json(await responseToken(user, token))
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(token)
  }

  async user ({ response, auth }) {
    return response.json(await auth.getUser())
  }

  async updatePassword ({ request, response, auth }) {
    const { id } = await auth.getUser()

    const user = await User.find(id)
    user.password = request.input('password')
    await user.save()

    return response.json({ message: 'password updated' })
  }
}

module.exports = AuthController
