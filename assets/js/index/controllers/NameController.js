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
  function NameController($scope, $routeParams) {
    var data = $scope.data = {};

    data.name = $routeParams.name;
  }

  // Add the NameController to the module.
  module.controller('NameController', ['$scope', '$routeParams', NameController]);
})();
