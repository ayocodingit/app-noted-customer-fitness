'use strict'

const { failResponse } = use('utils/Validators')
const validatorMessage = require('adonis-message-validation-generator')

class ProgramRequest {
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
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx.response, errorMessages)
  }
}

module.exports = ProgramRequest
