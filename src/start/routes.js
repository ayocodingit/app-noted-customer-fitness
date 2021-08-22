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
const ResourceRoute = require('./ResourceRoute')


Route.get('/', 'HomeController.index')

Route.post('login', 'AuthController.login').prefix('api').middleware('guest')

Route.group(() => {
  Route.get('/', 'HomeController.index')
  Route.post('refresh-token', 'AuthController.refreshToken')
  Route.post('update-password', 'AuthController.updatePassword')
  ResourceRoute('customers', 'CustomerController', [
    [['customers.store'], ['CustomerRequest']],
    [['customers.update'], ['CustomerRequest']]
  ])
  ResourceRoute('packages', 'PackageController', [
    [['packages.store'], ['PackageRequest']],
    [['packages.update'], ['PackageRequest']]
  ])
  ResourceRoute('achievements', 'AchievementController', [
    [['achievements.store'], ['AchievementRequest']],
    [['achievements.update'], ['AchievementRequest']]
  ])
  ResourceRoute('programs', 'ProgramController', [
    [['programs.store'], ['ProgramRequest']]
  ])
  .only(['index', 'store'])
}).prefix('api').middleware('auth')
