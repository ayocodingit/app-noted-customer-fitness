'use strict'

const AchievementHook = exports = module.exports = {}
const Program = use('App/Models/Program')

AchievementHook.program = async (modelInstance) => {
  const program = await Program.findBy('customer_id', modelInstance.customer_id)
  const numberOfDrink = program.number_of_drink - 1
  if (numberOfDrink > 0) {
    await Program
      .query()
      .where('customer_id', modelInstance.customer_id)
      .update({ number_of_drink: numberOfDrink })
  } else {
    await program.delete()
  }
}
