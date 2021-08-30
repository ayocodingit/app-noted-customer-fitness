'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')

class RegisterRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users,username',
      password: 'required|min:6',
      password_confirmation: 'required|min:6|same:password'
    }
  }

  get messages () {
    return {
      'username.required': formatMessage('validation.required', { attribute: 'username' }),
      'username.unique': formatMessage('validation.unique', { attribute: 'username' }),
      'password.required': formatMessage('validation.required', { attribute: 'password' }),
      'password.min': formatMessage('validation.min_numeric', { attribute: 'password', min: 6 }),
      'password_confirmation.required': formatMessage('validation.required', { attribute: 'password_confirmation' }),
      'password_confirmation.min': formatMessage('validation.min_numeric', { attribute: 'password_confirmation', min: 6 }),
      'password_confirmation.same': formatMessage('validation.same', { attribute: 'password_confirmation', other: 'password' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = RegisterRequest
