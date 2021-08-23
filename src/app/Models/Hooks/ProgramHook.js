'use strict'

const ProgramHook = exports = module.exports = {}
const Package = use('App/Models/Package')

ProgramHook.setNumberOfDrink = async (modelInstance) => {
  const record = await Package.find(modelInstance.package_id)
  modelInstance.number_of_drink = record.number_of_drink
}
