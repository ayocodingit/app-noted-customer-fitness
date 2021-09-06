'use strict'

const { formatMessage } = use('Antl')
const validatorMessage = require('adonis-message-validation-generator')
const Validator = use('utils/Validator')

class PackageRequest extends Validator {
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
}

module.exports = PackageRequest
