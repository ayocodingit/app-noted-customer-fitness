'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Program = use('App/Models/Program')
class Achievement extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', async (achievement) => {
      const program = await Program.findBy('customer_id', achievement.customer_id)
      const numberOfDrink = program.number_of_drink - 1
      if (numberOfDrink > 0) {
        await Program
          .query()
          .where('customer_id', achievement.customer_id)
          .update({ number_of_drink: numberOfDrink })
      } else {
        await program.delete()
      }
    })
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }
}

module.exports = Achievement
