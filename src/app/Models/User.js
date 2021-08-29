'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static fillable () {
    return [
      'role',
      'username',
      'password'
    ]
  }

  static boot () {
    super.boot()
    this.addTrait('WhereBy')
    this.addHook('beforeSave', 'UserHook.password')
    this.addHook('beforeCreate', 'UserHook.role')
  }

  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
