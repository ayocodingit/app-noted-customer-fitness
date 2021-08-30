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
const { Resource } = use('utils/Routes')

Route.get('/', 'HomeController.index')

Route.post('login', 'AuthController.login').prefix('api').middleware('guest').validator('LoginRequest')
Route.post('register', 'AuthController.register').prefix('api').middleware('guest').validator('RegisterRequest')

Route.group(() => {
  Route.get('/', 'HomeController.index')
  Route.post('refresh-token', 'AuthController.refreshToken')
  Route.get('user', 'AuthController.user')
  Route.get('user-role', 'UserController.index')
  Route.post('update-password', 'AuthController.updatePassword')
  Route.get('dashboard-admin', 'DashboardController.admin').middleware('can:admin')
  Route.get('dashboard-customer', 'DashboardController.customer').middleware('can:customer')
  Resource('customers', 'CustomerController', [
    [['customers.store'], ['CustomerRequest']],
    [['customers.update'], ['CustomerRequest']]
  ])
  Resource('packages', 'PackageController', [
    [['packages.store'], ['PackageRequest']],
    [['packages.update'], ['PackageRequest']]
  ])
  Resource('achievements', 'AchievementController', [
    [['achievements.store'], ['AchievementRequest']],
    [['achievements.update'], ['AchievementRequest']]
  ])
  Resource('programs', 'ProgramController', [
    [['programs.store'], ['ProgramRequest']]
  ])
    .only(['index', 'store'])
}).prefix('api').middleware('auth')
