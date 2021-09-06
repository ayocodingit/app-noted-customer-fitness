'use strict'

const Validator = use('utils/Validator')

class LoginRequest extends Validator {
  get rules () {
    return {
      username: 'required|exists:users,username',
      password: 'required'
    }
  }
}

module.exports = LoginRequest
