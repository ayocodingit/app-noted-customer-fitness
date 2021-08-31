'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const UserHook = exports = module.exports = {}

UserHook.password = async (modelInstance) => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password)
  }
}
