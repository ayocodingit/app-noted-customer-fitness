'use strict'

const Antl = use('Antl')
const { StatusCodes } = require('http-status-codes')

class CustomerRequest {
  get validateAll () {
    return true
  }

  get rules () {
    const id = this.ctx.params.id

    return {
      name: 'required|string|max:30',
      age: 'required|integer',
      height: 'required|integer',
      address: 'max:255',
      phone_number: 'max:15',
      user_id: `required|unique:customers,user_id,id,${id}`
    }
  }

  get messages () {
    return {
      'name.required': Antl.formatMessage('validation.required', { attribute: 'name' }),
      'name.string': Antl.formatMessage('validation.string', { attribute: 'name' }),
      'name.max': Antl.formatMessage('validation.max_numeric', { attribute: 'name', max: 30 }),
      'age.required':  Antl.formatMessage('validation.required', { attribute: 'age' }),
      'age.integer':  Antl.formatMessage('validation.integer', { attribute: 'age' }),
      'height.required':  Antl.formatMessage('validation.required', { attribute: 'height' }),
      'height.integer':  Antl.formatMessage('validation.integer', { attribute: 'height' }),
      'address.max':  Antl.formatMessage('validation.max_numeric', { attribute: 'address', max: 255 }),
      'phone_number.max':  Antl.formatMessage('validation.max_numeric', { attribute: 'phone number', max: 15 }),
      'user_id.required':  Antl.formatMessage('validation.required', { attribute: 'user' }),
      'user_id.unique':  Antl.formatMessage('validation.unique', { attribute: 'user' }),
    }
  }

  async fails (errorMessages) {
    return this.ctx.response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errorMessages })
  }
}

module.exports = CustomerRequest
