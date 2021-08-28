'use strict'

const Antl = use('Antl')
const Exists = use('utils/Rules/Exists')
const { failResponse } = use('utils/Validators')

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
    return Object.assign({
      'weight.required': Antl.formatMessage('validation.required', { attribute: 'weight' }),
      'body_fat.required': Antl.formatMessage('validation.required', { attribute: 'body_fat' }),
      'body_water_range.required': Antl.formatMessage('validation.required', { attribute: 'body_water_range' }),
      'muscle_mass.required': Antl.formatMessage('validation.required', { attribute: 'muscle_mass' }),
      'physique_rating.required': Antl.formatMessage('validation.required', { attribute: 'physique_rating' }),
      'bmr.required': Antl.formatMessage('validation.required', { attribute: 'bmr' }),
      'body_age.required': Antl.formatMessage('validation.required', { attribute: 'body_age' }),
      'bone_mass.required': Antl.formatMessage('validation.required', { attribute: 'bone_mass' }),
      'stomach_fat.required': Antl.formatMessage('validation.required', { attribute: 'stomach_fat' }),
      'customer_id.required': Antl.formatMessage('validation.required', { attribute: 'customer_id' }),
      'weight.number': Antl.formatMessage('validation.number', { attribute: 'weight' }),
      'body_fat.number': Antl.formatMessage('validation.number', { attribute: 'body_fat' }),
      'body_water_range.number': Antl.formatMessage('validation.number', { attribute: 'body_water_range' }),
      'muscle_mass.number': Antl.formatMessage('validation.number', { attribute: 'muscle_mass' }),
      'physique_rating.number': Antl.formatMessage('validation.number', { attribute: 'physique_rating' }),
      'bmr.number': Antl.formatMessage('validation.number', { attribute: 'bmr' }),
      'body_age.number': Antl.formatMessage('validation.number', { attribute: 'body_age' }),
      'bone_mass.number': Antl.formatMessage('validation.number', { attribute: 'bone_mass' }),
      'stomach_fat.number': Antl.formatMessage('validation.number', { attribute: 'stomach_fat' }),
      'customer_id.exists': Antl.formatMessage('validation.exists', { attribute: 'customer_id' })
    }, this.bodyRules())
  }

  bodyRules () {
    return {
      'chest.number': Antl.formatMessage('validation.number', { attribute: 'chest' }),
      'waist.number': Antl.formatMessage('validation.number', { attribute: 'waist' }),
      'hip.number': Antl.formatMessage('validation.number', { attribute: 'hip' }),
      'thigh.number': Antl.formatMessage('validation.number', { attribute: 'thigh' }),
      'arm.number': Antl.formatMessage('validation.number', { attribute: 'arm' })
    }
  }

  async fails (errorMessages) {
    return failResponse(this.ctx, errorMessages)
  }
}

module.exports = AchievementRequest
