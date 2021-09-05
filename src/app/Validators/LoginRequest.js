'use strict'

const { failResponse } = use('utils/Validators')
const Exists = use('utils/Rules/Exists')
const validatorMessage = require('adonis-message-validation-generator')

class LoginRequest {
  constructor () {
    Exists()
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|exists:users,username',
      password: 'required'
    }
  }

  get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = LoginRequest
