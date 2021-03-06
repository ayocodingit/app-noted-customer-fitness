'use strict'

const { formatMessage } = use('Antl')
const validatorMessage = require('adonis-message-validation-generator')
const Validator = use('utils/Validator')

class RegisterRequest extends Validator {
  get rules () {
    return {
      username: 'required|unique:users,username',
      password: 'required|min:6',
      password_confirmation: 'required|min:6|same:password'
    }
  }

  get messages () {
    return Object.assign(validatorMessage(this.rules), {
      'password.min': formatMessage('validation.min_numeric', { attribute: 'password', min: 6 }),
      'password_confirmation.min': formatMessage('validation.min_numeric', { attribute: 'password_confirmation', min: 6 }),
      'password_confirmation.same': formatMessage('validation.same', { attribute: 'password_confirmation', other: 'password' })
    })
  }
}

module.exports = RegisterRequest
