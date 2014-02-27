/**
 * NameController
 *
 * @author RWOverdijk
 * @license MIT
 * @uses ../module
 */
;
(function setupNameController() {

  'use strict';

  // Index module
  var module = angular.module('cn.index');

  /**
   * The NameController
   *
   * @param $scope
   * @param $routeParams
   * @constructor
   */
  function NameController($scope, $stateParams) {
    var data = $scope.data = {};

    // @todo fix pubsub! reference not updating. Why? Only god knows, I guess.
    data.name = $stateParams.name;
  }

  // Add the NameController to the module.
  module.controller('NameController', ['$scope', '$stateParams', NameController]);
})();
