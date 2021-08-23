'use strict'

const Antl = use('Antl')
const Exists = use('App/Validators/Rules/Exists')
const failResponse = use('App/Validators/FailResponse')

class CustomerRequest {
  constructor () {
    Exists()
  }

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
      user_id: `required|integer|unique:customers,user_id,id,${id}|exists:users,id`
    }
  }

  get messages () {
    return {
      'name.required': Antl.formatMessage('validation.required', { attribute: 'name' }),
      'name.string': Antl.formatMessage('validation.string', { attribute: 'name' }),
      'name.max': Antl.formatMessage('validation.max_numeric', { attribute: 'name', max: 30 }),
      'age.required': Antl.formatMessage('validation.required', { attribute: 'age' }),
      'age.integer': Antl.formatMessage('validation.integer', { attribute: 'age' }),
      'height.required': Antl.formatMessage('validation.required', { attribute: 'height' }),
      'height.integer': Antl.formatMessage('validation.integer', { attribute: 'height' }),
      'address.max': Antl.formatMessage('validation.max_numeric', { attribute: 'address', max: 255 }),
      'phone_number.max': Antl.formatMessage('validation.max_numeric', { attribute: 'phone number', max: 15 }),
      'user_id.required': Antl.formatMessage('validation.required', { attribute: 'user_id' }),
      'user_id.unique': Antl.formatMessage('validation.unique', { attribute: 'user_id' }),
      'user_id.exists': Antl.formatMessage('validation.exists', { attribute: 'user_id' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = CustomerRequest
