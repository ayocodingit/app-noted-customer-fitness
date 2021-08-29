'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const Exists = use('utils/Rules/Exists')

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
    return {
      'username.required': formatMessage('validation.required', { attribute: 'username' }),
      'username.exists': formatMessage('validation.exists', { attribute: 'username' }),
      'password.required': formatMessage('validation.required', { attribute: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = LoginRequest
