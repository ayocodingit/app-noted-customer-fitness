'use strict'

const Validator = use('utils/Validator')

class ProgramRequest extends Validator{
  get rules () {
    return {
      customer_id: 'required|integer|unique:programs,customer_id|exists:customers,id',
      package_id: 'required|integer|exists:packages,id'
    }
  }
}

module.exports = ProgramRequest
