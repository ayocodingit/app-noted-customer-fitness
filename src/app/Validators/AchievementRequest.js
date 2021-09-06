'use strict'

const Validator = use('utils/Validator')

class AchievementRequest extends Validator {
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
}

module.exports = AchievementRequest
