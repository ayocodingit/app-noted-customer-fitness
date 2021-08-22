'use strict'

const User = use('App/Models/User')
class AuthController {
  async login ({ request, response, auth }) {
    const { username, password } = request.all()
    const token = await auth.withRefreshToken().attempt(username, password)
    return response.json(token)
  }

  async refreshToken ({ request, response, auth }) {
    const refreshToken = request.input('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.json(token)
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
