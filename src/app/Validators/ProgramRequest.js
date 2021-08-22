'use strict'

const Antl = use('Antl')
const { StatusCodes } = require('http-status-codes')
const Exists = use('App/Validators/Rules/Exists')

class ProgramRequest {
  constructor () {
    Exists()
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      customer_id: 'required|integer|unique:packages,name|exists:customers,id',
      package_id: 'required|integer|exists:packages,id'
    }
  }

  get messages () {
    return {
      'customer_id.required': Antl.formatMessage('validation.required', { attribute: 'customer_id' }),
      'package_id.required': Antl.formatMessage('validation.required', { attribute: 'package_id' }),
      'customer_id.integer': Antl.formatMessage('validation.integer', { attribute: 'customer_id' }),
      'package_id.integer': Antl.formatMessage('validation.integer', { attribute: 'package_id' }),
      'customer_id.exists': Antl.formatMessage('validation.exists', { attribute: 'customer_id' }),
      'package_id.exists': Antl.formatMessage('validation.exists', { attribute: 'package_id' }),
      'customer_id.unique': Antl.formatMessage('validation.unique', { attribute: 'customer_id' })
    }
  }

  async fails (errorMessages) {
    return this.ctx.response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errorMessages })
  }
}

module.exports = ProgramRequest
