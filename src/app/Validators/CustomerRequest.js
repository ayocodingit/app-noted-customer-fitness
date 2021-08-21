'use strict'

const { formatters } = use('Validator')
const Antl = use('Antl')
const { StatusCodes } = require('http-status-codes')

class CustomerRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string|max:30',
      age: 'required|integer',
      height: 'required|integer',
      address: 'max:255',
      phone_number: 'max:15',
      user_id: 'required|unique:customers,user_id'
    }
  }

  get messages () {
    return {
      'name.required': Antl.formatMessage('validation.required', { attribute: 'name' }),
      'name.string': Antl.formatMessage('validation.string', { attribute: 'name' }),
      'name.max': Antl.formatMessage('validation.max_numeric', { attribute: 'name', max: 30 })
    }
  }

  get formatter () {
    return formatters.JsonApi
  }

  async fails (errorMessages) {
    return this.ctx.response.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorMessages)
  }
}

module.exports = CustomerRequest
