/**
 * config
 *
 * @author RWOverdijk
 * @license MIT
 *
 * @uses ./app
 */
;
(function setupConfig() {
  // Configure angular here.
  var app = angular.module('crowsNest');

  app.config(['$sailsSocketProvider', function($sailsSocketProvider) {
    $sailsSocketProvider.setDebug(false);
  }]);
})();
