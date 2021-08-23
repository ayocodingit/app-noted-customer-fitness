'use strict'

const Antl = use('Antl')
const failResponse = use('App/Validators/FailResponse')

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
    return {
      'name.required': Antl.formatMessage('validation.required', { attribute: 'name' }),
      'name.string': Antl.formatMessage('validation.string', { attribute: 'name' }),
      'name.max': Antl.formatMessage('validation.max_numeric', { attribute: 'name', max: 10 }),
      'name.unique': Antl.formatMessage('validation.unique', { attribute: 'name' }),
      'price.required': Antl.formatMessage('validation.required', { attribute: 'price' }),
      'price.integer': Antl.formatMessage('validation.integer', { attribute: 'price' }),
      'number_of_drink.required': Antl.formatMessage('validation.required', { attribute: 'number_of_drink' }),
      'number_of_drink.integer': Antl.formatMessage('validation.integer', { attribute: 'number_of_drink' }),
      'description.max': Antl.formatMessage('validation.max_numeric', { attribute: 'description', max: 255 })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = PackageRequest
