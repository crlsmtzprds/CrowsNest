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
   * Configure method for app.
   *
   * @param $routeProvider
   * @param $locationProvider
   */
  function configure($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/views/index.html',
      controller: 'IndexController'
    });

    $routeProvider.when('/name/:name', {
      templateUrl: '/views/name.html',
      controller: 'NameController'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }

  // Apply the configure method to the app.
  app.config(['$routeProvider', '$locationProvider', configure]);
})();
