'use strict'

const AchievementHook = exports = module.exports = {}
const Program = use('App/Models/Program')

AchievementHook.updateNumberOfDrinkProgram = async (modelInstance) => {
  const record = await Program.findBy('customer_id', modelInstance.customer_id)
  if (!record) {
    return
  }

  record.number_of_drink = record.number_of_drink - 1
  if (record.number_of_drink > 0) {
    await record.save()
  } else {
    await record.delete()
  }
}
