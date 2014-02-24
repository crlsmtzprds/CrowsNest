/**
 * Routes.
 *
 * The routes used in CrowsNest.
 *
 * @author RWOverdijk
 * @license MIT
 * @uses ./app
 */
;
(function setupRoutes() {
  var app = angular.module('crowsNest');

  /**
   * Configure routes.
   *
   * @param $stateProvider
   * @param $locationProvider
   * @param $urlRouterProvider
   */
  function configure($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
      url: '/',
      templateUrl: '/views/index.html',
      controller: 'IndexController'
    });

    $stateProvider.state('name', {
      url: '/name/{name}',
      templateUrl: '/views/name.html',
      controller: 'NameController'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  }

  // Apply the configure method to the app.
  app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', configure]);
})();
