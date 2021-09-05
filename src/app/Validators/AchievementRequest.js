'use strict'

const Exists = use('utils/Rules/Exists')
const { failResponse } = use('utils/Validators')
const validatorMessage = require('adonis-message-validation-generator')

class AchievementRequest {
  constructor () {
    Exists()
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      weight: 'required|number',
      body_fat: 'required|number',
      body_water_range: 'required|number',
      muscle_mass: 'required|number',
      physique_rating: 'required|number',
      bmr: 'required|number',
      body_age: 'required|number',
      bone_mass: 'required|number',
      stomach_fat: 'required|number',
      chest: 'number',
      waist: 'number',
      hip: 'number',
      thigh: 'number',
      arm: 'number',
      date: 'required|date',
      package_id: 'integer|exists:packages,id',
      customer_id: 'required|integer|exists:programs,customer_id'
    }
  }

  get messages () {
    return validatorMessage(this.rules)
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = AchievementRequest
