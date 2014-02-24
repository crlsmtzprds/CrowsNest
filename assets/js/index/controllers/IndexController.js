/**
 * IndexController
 *
 * @author RWOverdijk
 * @license MIT
 * @uses ../module
 */
;
(function setupIndexController() {

  'use strict';

  // Index module
  var module = angular.module('cn.index');

  /**
   * The IndexController
   *
   * @param $scope
   * @constructor
   */
  function IndexController($scope, $sails) {


    $scope.data = $sails.getStuff()

  }

  // Add the IndexController to the module.
  module.controller('IndexController', ['$scope', 'sails', IndexController]);
})();
