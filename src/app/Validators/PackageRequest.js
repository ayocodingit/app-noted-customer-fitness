'use strict'

const { formatMessage } = use('Antl')
const { failResponse } = use('utils/Validators')
const validatorMessage = require('adonis-message-validation-generator')

class PackageRequest {
  get validateAll () {
    return true
  }

  get rules () {
    const id = this.ctx.params.id

    return {
      name: `required|string|max:10|unique:packages,name,id,${id}`,
      price: 'required|integer',
      number_of_drink: 'required|integer',
      description: 'max:255'
    }
  }

  get messages () {
    return Object.assign(validatorMessage(this.rules), {
      'name.max': formatMessage('validation.max_numeric', { attribute: 'name', max: 10 }),
      'description.max': formatMessage('validation.max_numeric', { attribute: 'description', max: 255 })
    })
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = PackageRequest
