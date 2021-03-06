'use strict'

const { formatMessage } = use('Antl')
const validatorMessage = require('adonis-message-validation-generator')
const Validator = use('utils/Validator')

class CustomerRequest extends Validator {
  get rules () {
    const id = this.ctx.params.id
    return {
      name: 'required|string|max:30',
      age: 'required|integer',
      height: 'required|integer',
      address: 'max:255',
      phone_number: 'max:15',
      user_id: `required|integer|unique:customers,user_id,id,${id}|exists:users,id`
    }
  }

  get messages () {
    return Object.assign(validatorMessage(this.rules), {
      'name.max': formatMessage('validation.max_numeric', { attribute: 'name', max: 30 }),
      'address.max': formatMessage('validation.max_numeric', { attribute: 'address', max: 255 }),
      'phone_number.max': formatMessage('validation.max_numeric', { attribute: 'phone number', max: 15 })
    })
  }
}

module.exports = CustomerRequest
