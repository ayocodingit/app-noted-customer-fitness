'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index')

Route.post('login', 'AuthController.login').prefix('api').middleware('guest')

Route.group(() => {
  Route.get('/', 'HomeController.index')
  Route.post('refresh-token', 'AuthController.refreshToken')
  Route.post('update-password', 'AuthController.updatePassword')
  Route.resource('customers', 'CustomerController')
    .apiOnly()
    .validator(new Map([
      [['customers.store'], ['CustomerRequest']],
      [['customers.update'], ['CustomerRequest']]
    ]))
  Route.resource('packages', 'PackageController')
    .apiOnly()
    .validator(new Map([
      [['packages.store'], ['PackageRequest']],
      [['packages.update'], ['PackageRequest']]
    ]))
  Route.resource('achievements', 'AchievementController')
    .apiOnly()
    .validator(new Map([
      [['achievements.store'], ['AchievementRequest']],
      [['achievements.update'], ['AchievementRequest']]
    ]))
  Route.resource('programs', 'ProgramController')
    .apiOnly()
    .only(['index', 'store'])
    .validator(new Map([
      [['programs.store'], ['ProgramRequest']]
    ]))
}).prefix('api').middleware('auth')
