'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const RoleEnum = use('App/Enums/RoleEnum')

const UserHook = exports = module.exports = {}

UserHook.password = async (modelInstance) => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password)
  }
}

UserHook.role = async (modelInstance) => {
  if (!modelInstance.dirty.role) {
    modelInstance.role = RoleEnum.enums.CUSTOMER.value
  }
}
