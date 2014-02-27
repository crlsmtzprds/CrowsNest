/**
 * app
 *
 * Main app file for CrowsNest.
 *
 * @author RWOverdijk
 * @license MIT
 * @uses ./index
 * @uses core/providers
 * @uses core/models
 *
 * @todo figure out how to compile views in templateCache with grunt.
 */
angular.module('crowsNest', [
  'ui.router',
  'cn.index',
  'core.providers',
  'core.models'
//  'ngRoute',
//  'ngResource',
//  'ui.bootstrap'
]);
